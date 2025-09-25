import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    position: ${({$isDraggable}) => $isDraggable ? 'absolute' : 'relative'};
    height: ${({$ratio}) => $ratio * 80}px;
    max-height: ${({$ratio}) => $ratio * 80}px;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => $left}px;
    justify-self: center;
    transform-origin: center center;
    width: ${({$width}) => $width}px;
`;

const TextWrapper = styled.div`
    position: absolute;
    bottom: ${({$bottom}) => $bottom ?? 0}px;
    height: ${({$ratio}) => $ratio * 13.33}px;
    font-size: ${({$ratio}) => $ratio * 8.89}px;
    left: ${({$left}) => ($left ?? 50)}%;
    transform: translateX(-50%);
    font-weight: 700;
    line-height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;

    & p {
        text-align: center;
        width: max-content;
    }
`;

const SvgWrapper = styled.div`
    width: 100%;
    height: 100%;

    & > svg > path{
        fill: ${({$pathColor}) => $pathColor};
    }
`;

const PicWrapper = styled.div`
    position: relative;
    width: auto;
    height: 100%;
    overflow-y: visible;
`;

const ImageWrapper = styled.img`
    position: absolute;
    z-index: 2;
    width: ${({$width}) => $width}px;
    height: ${({$height}) => $height}px;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => ($left ?? 50)}%;
    transform: translateX(-50%);
`;

const Explode = styled(motion.div)`
    position: absolute;
    height: ${({$ratio}) => $ratio * 120}px;
    width: ${({$ratio}) => $ratio * 120}px;
    left: 50%;
    top: 50%;
    background: #B8ED95;
    background: radial-gradient(circle,rgba(184, 237, 149, 1) 0%, rgba(184, 237, 149, 0) 100%);
    filter: blur(5px);
    border-radius: 50%;
    z-index: 30;
`;

export const Element = ({isDraggable, element, className, pathColor = '#0C3615',}) => {
    const ratio = useSizeRatio();

    const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
        id: element.extId,
        disabled: !isDraggable,
       data: {
         extId: element.extId,
         id: element.id,
       }
    });

    const { setNodeRef: setDroppableRef } = useDroppable({
        id: element.extId,
        disabled: !isDraggable,
        data: {
         extId: element.extId,
         id: element.id,
         position: element.position
       }
    });

    const style = transform && isDraggable ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
    } : {};

    const setRefs = (node) => {
        setDraggableRef(node);
        setDroppableRef(node);
    };


    return (
        <Wrapper 
            $ratio={ratio} 
            className={className} 
            exit={isDraggable && {scale: 0, opacity: 0}}
            ref={setRefs}
            $isDraggable={isDraggable}
            $left={element.position?.x ?? 0}
            $top={element.position?.y ?? 0}
            $width={(element.fullWidth ?? 84) * ratio}
            style={style}
            {...listeners}
            {...attributes}
        >
            {element.isCreated && (
                <Explode 
                    $ratio={ratio} 
                    initial={{x: '-50%', y: '-50%', opacity: 1}}
                    animate={{opacity: 0, scale: 0}}
                    transition={{
                        duration: 1.5
                    }}
                />
            )}
            <PicWrapper>
                <SvgWrapper $pathColor={pathColor} $width={element.width * ratio} $height={element.height * ratio}>
                    {typeof element.svgElement === 'function' ? element.svgElement() : null}
                </SvgWrapper>
                <ImageWrapper 
                    src={element.picture} 
                    alt={element.name.toLowerCase()} 
                    $width={element.width * ratio} 
                    $height={element.height * ratio}
                    $top={element.top * ratio}
                    $left={element.left}
                    $right={element.right * ratio}
                />
            </PicWrapper>
            <TextWrapper 
                $ratio={ratio} 
                $bgText={pathColor} 
                $left={element.textLeft} 
                $bottom={element.textBottom ? element.textBottom * ratio : undefined}
            >
                <p><b>{element.name}</b></p>
            </TextWrapper>
        </Wrapper>
    )
}