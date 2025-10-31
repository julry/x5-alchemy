import styled from "styled-components";
import { motion } from "framer-motion";
import logo from '../../assets/images/formLogo.png';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "./Button";

const Wrapper = styled(motion.div)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    padding: var(--spacing_x4);
    backdrop-filter: blur(5px);
    line-height: 115%;

    @media screen and (max-height: 700px){
        line-height: 110%;
    }
`;

const ContentPlace = styled.div`
    position: relative;
    width: 100%;
    max-width: ${({$ratio}) => $ratio * 380}px;

    @media screen and (max-height: 700px) {
        width: 90%;
    }
`;

const Content = styled.div`
    clip-path:url(#bgblur_0_857_134_clip_path);
    height:100%;
    width:100%;
`;

const ContentWrapper = styled.div`
    position: absolute;
    top: ${({ $ratio }) => $ratio * 28}px;
    left: ${({ $ratio }) => $ratio * 24}px;
    padding-right: ${({ $ratio }) => $ratio * 44}px;
`;

const Logo = styled.div`
    width: ${({ $ratio }) => $ratio * 130}px;
    height: ${({ $ratio }) => $ratio * 100}px;
    background: url(${logo}) no-repeat center center;
    background-size: contain;
    margin-bottom:  ${({ $ratio }) => $ratio * 24}px;
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $ratio }) => $ratio * 212}px;
`;

export const FormModal = () => {
    const ratio = useSizeRatio();

    const handleClick = () => {
        window?.open('https://fut.ru/s/x5-insider', "_blank");
    }

    return (
        <Wrapper>
            <ContentPlace $ratio={ratio}>
                <svg width="100%" height="100%" viewBox="0 0 380 401" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <foreignObject x="-10" y="-10" width="400" height="421"><Content xmlns="http://www.w3.org/1999/xhtml" /></foreignObject><g data-figma-bg-blur-radius="10">
                    <path d="M276.8 401C268.367 401 260.552 396.574 256.216 389.341L224.931 337.159C220.595 329.926 212.78 325.5 204.347 325.5L24 325.5C10.7452 325.5 7.53979e-06 314.755 8.69857e-06 301.5L2.44081e-06 24C3.59958e-06 10.7452 10.7452 -1.76371e-06 24 -6.04933e-07L147.642 1.02042e-05C156.39 1.09689e-05 164.445 4.75962 168.665 12.4223L192.982 56.5778C197.202 64.2404 205.257 69 214.005 69L356 69C369.255 69 380 79.7452 380 93L380 377C380 390.255 369.255 401 356 401L276.8 401Z" fill="#083617"/>
                    <path d="M356 400.5L276.8 400.5C268.542 400.5 260.891 396.166 256.645 389.084L225.36 336.902C220.934 329.519 212.956 325 204.347 325L24 325C11.0213 325 0.500028 314.479 0.500009 301.5L0.500033 24C0.500034 11.0213 11.0214 0.499998 24 0.499999L147.642 0.50001C156.207 0.500011 164.094 5.16031 168.227 12.6631L192.544 56.8194C196.852 64.6415 205.075 69.5 214.005 69.5L356 69.5C368.979 69.5001 379.5 80.0213 379.5 93L379.5 377C379.5 389.979 368.979 400.5 356 400.5Z" stroke="#60AF2C" stroke-opacity="0.25"/>
                    </g>
                    <defs>
                    <clipPath id="bgblur_0_857_134_clip_path" transform="translate(10 10)"><path d="M276.8 401C268.367 401 260.552 396.574 256.216 389.341L224.931 337.159C220.595 329.926 212.78 325.5 204.347 325.5L24 325.5C10.7452 325.5 7.53979e-06 314.755 8.69857e-06 301.5L2.44081e-06 24C3.59958e-06 10.7452 10.7452 -1.76371e-06 24 -6.04933e-07L147.642 1.02042e-05C156.39 1.09689e-05 164.445 4.75962 168.665 12.4223L192.982 56.5778C197.202 64.2404 205.257 69 214.005 69L356 69C369.255 69 380 79.7452 380 93L380 377C380 390.255 369.255 401 356 401L276.8 401Z"/>
                    </clipPath></defs>
                    </svg>
                <ContentWrapper $ratio={ratio}>
                    <Logo $ratio={ratio} />
                    <p>
                        Найти идеальный <b>карьерный трек «X5»</b> было нелегко — но ты справился. Так ещё и узнал, из чего состоит работа во всех юнитах X5.
                    </p>
                    <br />
                    <p>
                        Также можешь начать поиск своего <a href="https://fut.ru/s/x5-insider" target="_blank">собственного идеального карьерного трека в X5.</a>
                    </p>
                </ContentWrapper>
                <ButtonStyled $ratio={ratio} onClick={handleClick}>Отлично</ButtonStyled>
            </ContentPlace>
        </Wrapper>
    )
}