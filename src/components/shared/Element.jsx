import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useDraggable, useDroppable } from '@dnd-kit/core';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;
    height: ${({$ratio}) => $ratio * 80}px;
    max-height: ${({$ratio}) => $ratio * 80}px;
`;

const TextWrapper = styled.div`
    position: absolute;
    bottom: ${({$ratio, $bottom}) => $bottom ?? $ratio * -1}px;
    height: ${({$ratio}) => $ratio * 13.33}px;
    font-size: ${({$ratio}) => $ratio * 8.89}px;
    max-width: ${({$ratio}) => $ratio * 84}px;
    padding: 0 ${({$ratio}) => $ratio * 4}px;
    left: ${({$left}) => ($left ?? 50)}%;
    transform: translateX(-50%);

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
    width: 100%;
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

export const Element = ({isDraggable, element, className, pathColor = '#0C3615',}) => {
    const ratio = useSizeRatio();

    const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
        id: element.id,
        disabled: !isDraggable,
    });

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: element.id,
        disabled: !isDraggable,
    });

    const style = transform ? {
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
            ref={setRefs}
            style={style}
            {...listeners}
            {...attributes}
        >
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