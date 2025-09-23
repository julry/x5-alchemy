import styled from "styled-components"
import { useSizeRatio } from "../../hooks/useSizeRatio";
import field from '../../assets/images/mergeField.png';

const Wrapper = styled.div`
    width: 100%;
    height: ${({$ratio}) => $ratio * 440}px;
    background: url(${field}) no-repeat center center;
    background-size: cover;
`;

const Blur = styled.div`
    position: absolute;
    left: 0px;
    right: 0;
    top: ${({$ratio}) => $ratio * 332}px;
    bottom: 0;
    background: linear-gradient(0deg, #083617 83.74%, rgba(8, 54, 23, 0) 100%);
    z-index: 2;
`

export const MergeField = (props) => {
    const ratio = useSizeRatio();

    return (
        <>
            <Wrapper $ratio={ratio} {...props} />
            <Blur  $ratio={ratio} />
        </>
    )
}