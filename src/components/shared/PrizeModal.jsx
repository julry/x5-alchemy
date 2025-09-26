import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { motion } from "framer-motion";
import { Button } from "./Button";
import { prizes } from "../../constants/prizes";
import { useState } from "react";

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    padding: var(--spacing_x4);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 110%;

    @media screen and (max-height: 700px){
        line-height: 105%;
    }
`;

const ContentPlace = styled.div`
    position: relative;
    width: 100%;
    max-height: 100%;
    max-width: ${({$ratio}) => $ratio * 380}px;
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    left: 0;
    bottom: -2px;
    width: ${({ $ratio }) => $ratio * 212}px;
`;

const ContentWrapper = styled.div`
    position: absolute;
    top: ${({ $ratio }) => $ratio * 28}px;
    left: ${({ $ratio }) => $ratio * 24}px;
`;

const Pic = styled.img`
    position: relative;
    height: ${({ $ratio }) => $ratio * 100}px;
    width: ${({ $ratio }) => $ratio * 100}px;
    object-fit: contain;
`
const TextWrapper = styled.div`
    padding-right: var(--spacing_x3);
    margin-top: ${({ $ratio }) => $ratio * 24}px;
    width: 100%;

    & h3, p {
        font-size: ${({ $ratio }) => $ratio * 16}px;
    }

    & h3 {
        margin-bottom: var(--spacing_x1);
    }
`;

const SmallPart = styled.div`
    & h4, p, li {
        font-size: ${({ $ratio }) => $ratio * 12}px;
    }

    li {
        margin-left:  ${({ $ratio }) => $ratio * 12}px;
        margin-top:  ${({ $ratio }) => $ratio * 5}px;
    }

    margin-top: ${({ $ratio }) => $ratio * 16}px;
`;

const ExpireText = styled.p`
    font-weight: 700;
    font-size: ${({ $ratio }) => $ratio * 12}px !important;
`;

const CodeField = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ $ratio }) => $ratio * 12}px;
    height:${({ $ratio }) => $ratio * 48}px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: ${({ $ratio }) => $ratio * 16}px;
    margin: ${({ $ratio }) => $ratio * 8}px 0 ${({ $ratio }) => $ratio * 4}px;
`;

const Info = styled.div`
    margin-top: var(--spacing_x3);

    p + p {
        margin-top: var(--spacing_x2);
    }
`;

const CopyButton = styled.button`
    outline: none;
    border: none;
    background: none;

    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        width: var(--spacing_x4);
        height: var(--spacing_x4);
    }
`;

const CopyInfo = styled(CodeField)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.6);
    color: #083617;
`;

export const PrizeModal = ({ prizeId }) => {
    const ratio = useSizeRatio();
    const [isSuccessCopy, setIsSuccessCopy] = useState(false);

    const mainInfo = prizes.find((el) => el.id === prizeId);

    const handleClick = () => {
        window?.open('https://fut.ru/s/x5-insider', "_blank");
    };

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(mainInfo.promo.toString()).then(() => {
                setIsSuccessCopy(true);

                setTimeout(() => setIsSuccessCopy(false), 3000);
            });
        }
    }


    return (
        <Wrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ContentPlace $ratio={ratio}>
                {mainInfo.wrapper()}
                <ContentWrapper $ratio={ratio}>
                    <Pic
                        $ratio={ratio}
                        src={mainInfo.logo}
                    >
                    </Pic>
                    <TextWrapper $ratio={ratio}>
                        <h3>{mainInfo.title}</h3>
                        {mainInfo.text()}
                        <CodeField $ratio={ratio}>
                            <p>{mainInfo.promo}</p>
                            <CopyButton onClick={handleCopy}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 13H4V3.99997H13V5.49997" stroke="white" />
                                    <rect x="8" y="6.99997" width="9" height="9" stroke="white" />
                                </svg>
                            </CopyButton>
                            {isSuccessCopy && (
                                <CopyInfo $ratio={ratio}>Скопировано</CopyInfo>
                            )}
                        </CodeField>
                        {mainInfo.expire && (
                            <ExpireText $ratio={ratio}>
                                Промокод действует до {mainInfo.expire}
                            </ExpireText>
                        )}
                        {mainInfo.rules && (
                            <SmallPart $ratio={ratio}>
                                <h4>Правила использования</h4>
                                <ul>
                                    {mainInfo.rules.map((rule) => (
                                        <li key={rule}>{rule}</li>
                                    ))}
                                </ul>
                            </SmallPart>
                        )}
                        {mainInfo.restrictions && (
                            <SmallPart $ratio={ratio}>
                                <h4>Ограничения</h4>
                                <ul>
                                    {mainInfo.restrictions.map((rest) => (
                                        <li key={rest}>{rest}</li>
                                    ))}
                                </ul>
                            </SmallPart>
                        )}
                        {mainInfo.attention && (
                            <SmallPart $ratio={ratio}>
                                <p>{mainInfo.attention}</p>
                            </SmallPart>
                        )}
                        <Info>
                            <p>
                                Не забудь сделать скриншот{'\n'}или сохрани промокод, чтобы{'\n'}не потерять его.
                            </p>
                            <p>
                                Также переходи <b>на карьерный{'\n'}портал X5</b>, чтобы начать поиск{'\n'}своего собственного идеального карьерного трека.
                            </p>
                        </Info>

                    </TextWrapper>
                </ContentWrapper>
                <ButtonStyled $ratio={ratio} onClick={handleClick}>Карьера в X5</ButtonStyled>
            </ContentPlace>
        </Wrapper>

    )
}