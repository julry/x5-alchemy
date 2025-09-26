import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { emailRegExp } from "../../constants/regexp";
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
    line-height: 110%;

    @media screen and (max-height: 700px){
        line-height: 105%;
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
    clip-path:url(#bgblur_0_426_1813_clip_path);
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

const Input = styled.input`
    color: #ffffff;
    outline: none;/* Frame 2131327987 */
    padding: ${({ $ratio }) => $ratio * 12}px;
    width: 100%;
    height: ${({ $ratio }) => $ratio * 48}px;
    background: ${({ $isError }) => $isError ? 'rgba(254, 107, 75, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
    border: 1px solid ${({ $isError }) => $isError ? '#FE6B4B' : 'rgba(255, 255, 255, 0.25)'};
    border-radius: ${({ $ratio }) => $ratio * 16}px;
     margin-top: ${({ $ratio }) => $ratio * 24}px;
     transition: border 0.3s, background 0.3s;

    & + & {
        margin-top: ${({ $ratio }) => $ratio * 8}px;
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.5)
    }
`;

const WrongText = styled.p`
    margin-top: var(--spacing_x2);
    color:rgba(254, 107, 75, 0.8);
    font-size: var(--font_xs);
`;

const InputRadioButton = styled.input`
    display: none;
`;

const RadioIconStyled = styled.div`
    position: relative;
    flex-shrink: 0;
    margin-right: ${({ $ratio }) => $ratio * 9}px;
    width: ${({ $ratio }) => $ratio * 16}px;
    height: ${({ $ratio }) => $ratio * 16}px;
    background: #60AF2C;
    box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.25), inset 1px -1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const RadioButtonLabel = styled.label`
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    font-size: var(--font_xxs);
    margin-top: var(--spacing_x3);
    width: 100%;
    color: rgba(255,255,255, 0.7);
    text-align: left;
    max-width: 300px;
    line-height: 110%;

    & + & {
        margin-top: calc(var(--spacing_x3) / 2);
    }
    & ${InputRadioButton}:checked + ${RadioIconStyled} {
       &::after {
            content: '';
            position: absolute;
            top: ${({ $ratio }) => $ratio * 8}px;
            left: ${({ $ratio }) => $ratio * 2}px;
            width: ${({ $ratio }) => $ratio * 6}px;
            height: ${({ $ratio }) => $ratio * 1.5}px;
            border-radius: 20px;
            transform: rotate(45deg);
            background-color: white;
       }

       &::before {
            content: '';
            position: absolute;
            top: ${({ $ratio }) => $ratio * 7.5}px;
            right: ${({ $ratio }) => $ratio * 1.5}px;
            width: ${({ $ratio }) => $ratio * 9.5}px;
            height: ${({ $ratio }) => $ratio * 1.5}px;
            border-radius: 20px;
            transform: rotate(-45deg);
            background-color: white;
       }
    }
`;

const Link = styled.a`
    font-weight: 500;
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $ratio }) => $ratio * 212}px;
`;

export const FormModal = () => {
    const ratio = useSizeRatio();
    const { next, registrateEmail } = useProgress();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isAgreed, setIsAgreed] = useState(true);
    const [isAdsAgreed, setIsAdsAgreed] = useState(true);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAlreadyHas, setIsAlreadyHas] = useState(false);

    const handleClick = async () => {
        setIsNetworkError(false);

        if (isSending) return;
        setIsSending(true);

        const result = await registrateEmail({email, isAdsAgreed});

        console.log(result);
        if (result?.hasUser) {
            setIsAlreadyHas(true);
            setIsSending(false);

            return;
        }

        if (result?.isError) {
            setIsNetworkError(true);
            setIsSending(false);

            return;
        }

        setIsSending(false);
        next();
    }


    const handleBlur = () => {
        setIsCorrect(!!email.match(emailRegExp));

        if (email.match(emailRegExp) || !email) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleChange = (e) => {
        if (isSending) return;
        setIsCorrect(true);
        setIsAlreadyHas(false);
        setEmail(e.target.value);
    };

    const btnDisabled = !name || !email || !isAgreed;

    return (
        <Wrapper>
            <ContentPlace $ratio={ratio}>
                <svg width="100%" height="100%" viewBox="0 0 380 713" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <foreignObject x="-10" y="-9.99997" width="400" height="733"><Content xmlns="http://www.w3.org/1999/xhtml" /></foreignObject><g data-figma-bg-blur-radius="10">
                        <path d="M276.8 713C268.367 713 260.552 708.574 256.216 701.341L224.931 649.159C220.595 641.926 212.78 637.5 204.347 637.5L24 637.5C10.7452 637.5 7.53979e-06 626.755 8.69857e-06 613.5L2.97167e-05 24C3.08755e-05 10.7452 10.7452 2.87539e-05 24 2.99126e-05L147.642 4.07218e-05C156.39 4.14865e-05 164.445 4.75969 168.665 12.4223L192.982 56.5778C197.202 64.2405 205.257 69 214.005 69L356 69.0001C369.255 69.0001 380 79.7452 380 93.0001L380 689C380 702.255 369.255 713 356 713L276.8 713Z" fill="#083617" />
                        <path d="M356 712.5L276.8 712.5C268.542 712.5 260.891 708.166 256.645 701.084L225.36 648.902C220.934 641.519 212.956 637 204.347 637L24 637C11.0213 637 0.500028 626.479 0.500009 613.5L0.50006 24C0.500061 11.0213 11.0214 0.500029 24.0001 0.50003L147.642 0.500041C156.207 0.500041 164.094 5.16037 168.227 12.6631L192.544 56.8194C196.852 64.6416 205.075 69.5 214.005 69.5L356 69.5001C368.979 69.5001 379.5 80.0214 379.5 93.0001L379.5 689C379.5 701.979 368.979 712.5 356 712.5Z" stroke="#60AF2C" stroke-opacity="0.25" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_426_1813_clip_path" transform="translate(10 9.99997)"><path d="M276.8 713C268.367 713 260.552 708.574 256.216 701.341L224.931 649.159C220.595 641.926 212.78 637.5 204.347 637.5L24 637.5C10.7452 637.5 7.53979e-06 626.755 8.69857e-06 613.5L2.97167e-05 24C3.08755e-05 10.7452 10.7452 2.87539e-05 24 2.99126e-05L147.642 4.07218e-05C156.39 4.14865e-05 164.445 4.75969 168.665 12.4223L192.982 56.5778C197.202 64.2405 205.257 69 214.005 69L356 69.0001C369.255 69.0001 380 79.7452 380 93.0001L380 689C380 702.255 369.255 713 356 713L276.8 713Z" />
                        </clipPath></defs>
                </svg>
                <ContentWrapper $ratio={ratio}>
                    <Logo $ratio={ratio} />
                    <p>
                        Найти идеальный <b>карьерный трек «X5»</b> было нелегко — но ты справился. Так ещё и узнал, из чего состоит работа во всех юнитах X5.
                    </p>
                    <br />
                    <p>
                        Чтобы поучаствовать в <b>розыгрыше крутых призов</b>, оставь свои данные ниже, и мы повесим карточку с твоим именем на доску почёта Центра Инноваций X5. Или можешь начать поиск своего <Link href="https://fut.ru/s/x5-insider">
                            собственного идеального карьерного трека в X5.
                        </Link>
                    </p>
                    <Input
                        $ratio={ratio}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя"
                    />
                    <Input
                        $ratio={ratio}
                        $isError={!isCorrect || isAlreadyHas}
                        type="email"
                        id="email"
                        placeholder="example@mail.ru"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {isAlreadyHas && (
                        <WrongText>Эта почта уже зарегистрирована. Попробуй ввести снова.</WrongText>
                    )}
                    <RadioButtonLabel $ratio={ratio}>
                        <InputRadioButton
                            $ratio={ratio}
                            type="checkbox"
                            value={isAgreed}
                            checked={isAgreed}
                            onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                        />
                        <RadioIconStyled $ratio={ratio}/>
                        <span>
                            Я даю согласие на{"\u00A0"}
                            <Link
                                href={"https://fut.ru/personal_data_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                обработку
                            </Link>{" "}
                            и{"\u00A0"}
                            <Link
                                href={"https://fut.ru/personal_data_transfer_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                передачу
                            </Link>{" "}
                            моих персональных данных и соглашаюсь с {"\u00A0"}
                            <Link
                                href={'https://fut.ru/personal-data'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Политикой обработки персональных данных
                            </Link>, а также с {"\u00A0"}
                            <Link
                                href={'https://worklifealfa.fut.ru/agreement.pdf'}
                                target="_blank"
                                rel="noreferrer"
                            >правилами проведения акции</Link>.
                        </span>
                    </RadioButtonLabel>
                    <RadioButtonLabel $ratio={ratio}>
                        <InputRadioButton
                            $ratio={ratio}
                            type="checkbox"
                            value={isAdsAgreed}
                            checked={isAdsAgreed}
                            onChange={() => setIsAdsAgreed((prevAgreed) => !prevAgreed)}
                        />
                        <RadioIconStyled $ratio={ratio}/>
                        <span>
                            Хочу ловить{"\u00A0"}
                            <Link
                                href={"https://fut.ru/adv_messages_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                персональные стажировки от топ‑компаний в рекламной рассылке
                            </Link>.
                        </span>
                    </RadioButtonLabel>
                    {isNetworkError && (
                        <WrongText>Что-то пошло не так, попробуй позже.</WrongText>
                    )}
                </ContentWrapper>
                <ButtonStyled disabled={btnDisabled} $ratio={ratio} onClick={handleClick}>Отправить</ButtonStyled>
            </ContentPlace>
        </Wrapper>
    )
}