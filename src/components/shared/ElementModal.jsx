import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { motion } from "framer-motion";
import { wrapperElements } from "../../constants/wrapperElements";
import { elements } from "../../constants/elements";
import { Button } from "./Button";
import { Element } from "./Element";

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    padding: var(--spacing_x4);
`;

const ContentPlace = styled.div`
    position: relative;
    width: 100%;
    margin: ${({$ratio}) => $ratio * 136}px auto 0;
    
    @media screen and (max-height: 700px) {
        max-height: ${({$ratio}) => $ratio * 554}px;
        max-width: 90%;
    }
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    left: 0;
    bottom: -2px;
    width: ${({$ratio}) => $ratio * 212}px;
`;

const Text = styled.p`
    width: 100%;
    margin-bottom: ${({$ratio}) => $ratio * 36}px;
    font-size: ${({$ratio}) => $ratio * 20}px;
    text-align: center;
    font-weight: 700;
    opacity: 0.55;
`;

const ContentWrapper = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 107}px;
    left: ${({$ratio}) => $ratio * 24}px;
`;

const Pic = styled.div`
    position: relative;
    width: ${({$width}) => $width}px;
    height: ${({$ratio}) => $ratio * 160}px;

    & > div {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        transform: scale(${({$scale}) => $scale});
        transform-origin: 0% 0%;
        align-items: flex-start;

        & div:last-child {
            left: 0%;
            transform: none;
            padding-left: ${({$pl}) => $pl}px;
        }
    }
`
const TextWrapper = styled.div`
    padding-right: var(--spacing_x3);
    margin-top: ${({$ratio}) => $ratio * 24}px;
    width: 100%;
`;

export const ElementModal = ({onClose, elementId}) => {
    const ratio = useSizeRatio();

    const mainInfo = wrapperElements.find((el) => el.id === elementId);
    const secondInfo = elements.find((el) => el.id === elementId);

    const isUnit = secondInfo?.page === 3;

    return (
        <Wrapper
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <ContentPlace $ratio={ratio}>
                <Text $ratio={ratio}>{isUnit ? 'Ты открыл элемент-юнит\nиз списка задач!' : 'Отлично, ты получил\nновый элемент!'}</Text>
                {mainInfo.wrapperElement()}
                <ContentWrapper $ratio={ratio}>
                <Pic 
                    $ratio={ratio} $scale={mainInfo.scale ?? 1.95} 
                    $height={mainInfo.cardHeight * ratio} 
                    $width={mainInfo.cardWidth * ratio}
                    $pl={(mainInfo.pl ?? 5) * ratio}
                >
                    <Element element={secondInfo} pathColor="#347322" />
                </Pic>
                <TextWrapper $ratio={ratio}>
                    {mainInfo.text()}
                </TextWrapper>
                </ContentWrapper>
                <ButtonStyled $ratio={ratio} onClick={onClose}>Супер!</ButtonStyled>
            </ContentPlace>
        </Wrapper>

    )
}