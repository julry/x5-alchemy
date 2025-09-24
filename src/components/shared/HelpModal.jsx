import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { motion } from "framer-motion";
import { DoneSign } from "./svgs/DoneSign";

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing_x4);
`;

const ContentPlace = styled.div`
    position: relative;
    width: 100%;
`;

const Content = styled.div`
    backdrop-filter:blur(5px);
    clip-path:url(#bgblur_0_419_5001_clip_path);
    height: 100%; 
    width: 100%;
`;

const CloseBtn = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    width: ${({$ratio}) => $ratio * 30}px;
    height: ${({$ratio}) => $ratio * 30}px;
`;

const GreenText = styled.span`
    color: #60AF2C;
`;

const TextWrapper = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 28}px;
    left: ${({$ratio}) => $ratio * 24}px;

    & h3 {
        font-size: ${({$ratio}) => $ratio * 20}px;
    }
`;

const TextRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${({$ratio}) => $ratio * 12}px;
    font-size:  ${({$ratio}) => $ratio * 16}px;
    margin-top: ${({$ratio}) => $ratio * 28}px;

    & + & {
       margin-top: ${({$ratio}) => $ratio * 14}px;
    }
`;

const CheckSign = styled.div`
    position: relative;
    width: var(--spacing_x4);
    height: var(--spacing_x4);
    background-color: #44664F;
    border-radius: var(--border-radius-sm);
`;

const DoneMark = styled(DoneSign)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({$ratio}) => $ratio * 16}px;
    height: ${({$ratio}) => $ratio * 12}px;
`;

export const CheckModal = ({onClose, discoveredElements = []}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <ContentPlace>
                <svg width="100%"viewBox="0 0 380 492" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-10" y="-9.99985" width="400" height="512"><Content xmlns="http://www.w3.org/1999/xhtml" /></foreignObject><g data-figma-bg-blur-radius="10">
                <path d="M254.969 492C247.549 492 240.546 488.568 236 482.702L215.147 455.798C210.602 449.933 203.598 446.5 196.178 446.5L24 446.5C10.7452 446.5 4.91711e-06 435.755 6.07589e-06 422.5L1.03963e-05 24.0001C1.1555e-05 10.7453 10.7452 0.000150824 24 0.000151983L142.286 0.000162324C150.784 0.000163067 158.648 4.49388 162.963 11.8149L180.861 42.1854C185.175 49.5064 193.04 54.0001 201.537 54.0001L356 54.0001C369.255 54.0001 380 64.7453 380 78.0001L380 468C380 481.255 369.255 492 356 492L254.969 492Z" fill="#083617"/>
                <path d="M356 491.5L254.97 491.5C247.704 491.5 240.846 488.139 236.395 482.396L215.543 455.491C210.902 449.504 203.753 446 196.178 446L24 446C11.0213 446 0.500026 435.479 0.500006 422.5L0.500041 24.0001C0.500075 11.0214 11.0214 0.50009 24 0.500091L142.286 0.500101C150.607 0.500102 158.308 4.90001 162.532 12.0685L180.43 42.4396C184.834 49.913 192.862 54.5 201.537 54.5001L356 54.5001C368.979 54.5002 379.5 65.0215 379.5 78.0001L379.5 468C379.5 480.979 368.979 491.5 356 491.5Z" stroke="#60AF2C" strokeOpacity="0.25"/>
                </g>
                <defs>
                <clipPath id="bgblur_0_419_5001_clip_path" transform="translate(10 9.99985)"><path d="M254.969 492C247.549 492 240.546 488.568 236 482.702L215.147 455.798C210.602 449.933 203.598 446.5 196.178 446.5L24 446.5C10.7452 446.5 4.91711e-06 435.755 6.07589e-06 422.5L1.03963e-05 24.0001C1.1555e-05 10.7453 10.7452 0.000150824 24 0.000151983L142.286 0.000162324C150.784 0.000163067 158.648 4.49388 162.963 11.8149L180.861 42.1854C185.175 49.5064 193.04 54.0001 201.537 54.0001L356 54.0001C369.255 54.0001 380 64.7453 380 78.0001L380 468C380 481.255 369.255 492 356 492L254.969 492Z"/>
                </clipPath></defs>
                </svg>
                <CloseBtn $ratio={ratio} onClick={onClose}>
                    <svg width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_420_6)">
                    <path d="M1.56491 1.56497C2.58835 0.541593 4.24759 0.542244 5.27101 1.56566L14.9992 11.2939L24.7282 1.56497C25.7516 0.541549 27.4115 0.541539 28.435 1.56497C29.4581 2.58843 29.4576 4.24773 28.4343 5.27107L18.7053 15L28.4343 24.7289C29.4577 25.7524 29.4583 27.4116 28.435 28.435C27.4115 29.4585 25.7516 29.4585 24.7282 28.435L14.9992 18.7061L5.27032 28.435C4.24696 29.4581 2.58829 29.4581 1.56491 28.435C0.541552 27.4117 0.541018 25.7524 1.56422 24.7289L11.2932 15L1.56491 5.27176C0.541474 4.24832 0.541474 2.58841 1.56491 1.56497Z" fill="#F7F7F7" fill-opacity="0.2"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_420_6">
                    <rect width="30" height="30" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </CloseBtn>
                <TextWrapper $ratio={ratio}>
                    <h3>Чек-лист </h3>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Tech') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Agile-подход <GreenText>{'→'}</GreenText> <b>X5 Tech</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Media') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Творческая свобода <GreenText>{'→'}</GreenText>{'\n'}<b>X5 Media</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Stores') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Видимый результат <GreenText>{'→'}</GreenText>{'\n'}<b>Магазины X5</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Digital') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Динамичная среда <GreenText>{'→'}</GreenText>{'\n'}<b>X5 Digital</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Transport') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Автоматизация <GreenText>{'→'}</GreenText>{'\n'}<b>X5 Transport</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Business') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Комплексный подход <GreenText>{'→'}</GreenText>{'\n'}<b>X5 Поддержка бизнеса</b></p>
                    </TextRow>
                    <TextRow $ratio={ratio}>
                        <CheckSign>
                            {discoveredElements.includes('X5Import') && <DoneMark  $ratio={ratio} />}
                        </CheckSign>
                        <p>Работа <GreenText>+</GreenText> Нестандартные решения <GreenText>{'→'}</GreenText>{'\n'}<b>X5 Import</b></p>
                    </TextRow>
                </TextWrapper>
            </ContentPlace>
        </Wrapper>

    )
}