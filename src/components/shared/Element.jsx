import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;
    height: ${({$ratio}) => $ratio * 80}px;
    max-height: ${({$ratio}) => $ratio * 80}px;
    max-width: ${({$ratio}) => $ratio * 84}px;
`;

const TextWrapper = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * -1}px;
    height: ${({$ratio}) => $ratio * 13.33}px;
    font-size: ${({$ratio}) => $ratio * 8.89}px;
    max-width: ${({$ratio}) => $ratio * 84}px;
    padding: 0 ${({$ratio}) => $ratio * 4}px;
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

    return (
        <Wrapper $ratio={ratio} className={className}>
            <PicWrapper>
                <SvgWrapper $pathColor={pathColor} $width={element.width * ratio} $height={element.height * ratio}>
                    {element.svgElement()}
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
            <TextWrapper $ratio={ratio} $bgText={pathColor}>
                <p><b>{element.name.toLowerCase()}</b></p>
            </TextWrapper>
        </Wrapper>
    )
}