import styled from "styled-components"
import { Button } from "./Button";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const BlockStyled = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: var(--spacing_x8);
    left: 50%;
    z-index: 10000;
    transform: translateX(-50%);
    gap: var(--spacing_x2);
    padding: var(--spacing_x3);
    background: rgba(247, 247, 247, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    max-width: 78vw;

    @media screen and (min-width: 450px){
        max-width: ${({$ratio}) => $ratio * 339}px;
    }
`;

const ButtonStyled = styled(Button)`
    margin-left: auto;
    min-height: ${({$ratio}) => $ratio * 56}px;
    height: ${({$ratio}) => $ratio * 56}px;
    width: ${({$ratio}) => $ratio * 56}px;
    min-width: ${({$ratio}) => $ratio * 56}px;
`;

export const CookieInfo = ({onClose}) => {
    const ratio = useSizeRatio();

    return (
        <BlockStyled $ratio={ratio}>
            <p><a href="https://fut.ru/cookie" target="_blank" rel="noreferrer">Мы используем куки.</a> Играя, ты соглашаешься с этим.</p>
            <ButtonStyled $ratio={ratio} onClick={onClose}>ОК</ButtonStyled>
        </BlockStyled>
    )
}