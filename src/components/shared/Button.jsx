import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { ArrowRight } from "./svgs/ArrowRight";

const Wrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background: #C879F7;
    color: #FFFFFF;
    font-size: var(--font_lg); 
    padding: var(--spacing_x4) var(--spacing_x2);
    border-radius: var(--border-radius-lg);
    cursor: pointer;
    ${({ $isBottom }) => $isBottom ? 'margin-top: auto' : ''};
    transition: opacity 0.3s;
    box-shadow: inset -1.6px 1.6px 3.2px rgba(255, 255, 255, 0.25), inset 1.6px -1.6px 3.2px rgba(0, 0, 0, 0.25);

    &:disabled {
        opacity: 0.5;
    }
`;

const IconWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $ratio }) => $ratio * 48}px;
    height: ${({ $ratio }) => $ratio * 48}px;
    padding: 0;
    border-radius: var(--border-radius-icon);

    & svg:first-of-type {
        width: ${({ $ratio, $svgWidth }) => $ratio * $svgWidth}px;
        height: ${({ $ratio, $svgHeight }) => $ratio * $svgHeight}px;
    }
`;

export const Button = ({ isBottom = true, ...props }) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $ratio={ratio} $isBottom={isBottom} />
}

export const IconButton = ({ icon = {}, ...props }) => {
    const ratio = useSizeRatio();
    const { width = 30, height = 30 } = icon;

    return <IconWrapper {...props} $svgWidth={width} $svgHeight={height} $ratio={ratio} />
}

export const ArrowButton = (props) => (
    <IconButton icon={{ width: 34 }} {...props}>
        <ArrowRight />
    </IconButton>
);
