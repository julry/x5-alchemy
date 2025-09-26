import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { motion } from "framer-motion";
import { Button } from "./Button";
import prize from '../../assets/images/prize.png';

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    padding: var(--spacing_x4);
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding-right: var(--spacing_x7);
    margin-top: ${({ $ratio }) => $ratio * 24}px;
    width: 100%;

    & h3, p {
        font-size: ${({ $ratio }) => $ratio * 16}px;
    }

    & h3 {
        margin-bottom: var(--spacing_x1);
    }
`;


const Foreigh = styled.div`
    width: 100%;
    height: 100%;
    clip-path:url(#bgblur_0_485_776_clip_path);
`;

export const StartPrizeModal = ({onClose}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ContentPlace $ratio={ratio}>
                <svg width="100%" height="100%" viewBox="0 0 380 393" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-10" y="-9.99997" width="400" height="413"><Foreigh xmlns="http://www.w3.org/1999/xhtml"></Foreigh></foreignObject><g data-figma-bg-blur-radius="10">
                <path d="M276.8 393C268.367 393 260.552 388.574 256.216 381.341L224.931 329.159C220.595 321.926 212.78 317.5 204.347 317.5L24 317.5C10.7452 317.5 7.53979e-06 306.755 8.69857e-06 293.5L1.74143e-06 24C2.9002e-06 10.7452 10.7452 2.87539e-05 24 2.99126e-05L147.642 4.07218e-05C156.39 4.14865e-05 164.445 4.75966 168.665 12.4223L192.982 56.5778C197.202 64.2404 205.257 69 214.005 69L356 69.0001C369.255 69.0001 380 79.7452 380 93.0001L380 369C380 382.255 369.255 393 356 393L276.8 393Z" fill="#083617"/>
                <path d="M356 392.5L276.8 392.5C268.542 392.5 260.891 388.166 256.645 381.084L225.36 328.902C220.934 321.519 212.956 317 204.347 317L24 317C11.0213 317 0.500028 306.479 0.500009 293.5L0.500032 24C0.500033 11.0213 11.0214 0.500029 24 0.50003L147.642 0.500041C156.207 0.500041 164.094 5.16034 168.227 12.6631L192.544 56.8194C196.852 64.6415 205.075 69.5 214.005 69.5L356 69.5001C368.979 69.5001 379.5 80.0214 379.5 93.0001L379.5 369C379.5 381.979 368.979 392.5 356 392.5Z" stroke="#60AF2C" strokeOpacity="0.25"/>
                </g>
                <defs>
                <clipPath id="bgblur_0_485_776_clip_path" transform="translate(10 9.99997)"><path d="M276.8 393C268.367 393 260.552 388.574 256.216 381.341L224.931 329.159C220.595 321.926 212.78 317.5 204.347 317.5L24 317.5C10.7452 317.5 7.53979e-06 306.755 8.69857e-06 293.5L1.74143e-06 24C2.9002e-06 10.7452 10.7452 2.87539e-05 24 2.99126e-05L147.642 4.07218e-05C156.39 4.14865e-05 164.445 4.75966 168.665 12.4223L192.982 56.5778C197.202 64.2404 205.257 69 214.005 69L356 69.0001C369.255 69.0001 380 79.7452 380 93.0001L380 369C380 382.255 369.255 393 356 393L276.8 393Z"/>
                </clipPath></defs>
                </svg>

                <ContentWrapper $ratio={ratio}>
                    <Pic
                        $ratio={ratio}
                        src={prize}
                    >
                    </Pic>
                    <TextWrapper $ratio={ratio}>
                        <p>Отлично, карточка с твоим именем нашла своё место на доске почёта Центра Инноваций X5. Результаты розыгрыша больших призов будут после <b>29 октября</b>. А пока ты можешь получить небольшой <b>подарок</b> от нашей команды.</p>
                    </TextWrapper>
                </ContentWrapper>
                <ButtonStyled $ratio={ratio} onClick={onClose}>Отлично</ButtonStyled>
            </ContentPlace>
        </Wrapper>

    )
}