import { useState } from "react";
import styled from 'styled-components';
import { FlexWrapper } from "../shared/ContentWrapper";
import block from '../../assets/images/introBlock.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { ArrowButton } from "../shared/Button";
import { Logo } from "../shared/svgs/Logo";
import { useProgress } from "../../contexts/ProgressContext";
import pic from '../../assets/images/intro.png';

const Wrapper = styled(FlexWrapper)`
    position: relative;
    align-items: flex-start;
`;

const Picture = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: ${({$ratio}) => $ratio * 510}px;
    object-fit: cover;
    object-position: 0 0;
`;

const InfoBlock = styled.div`
    position: absolute;
    top: var(--spacing_x8);
    left: 50%;
    transform: translateX(-50%);
    background: url(${block}) no-repeat center center;
    background-size: contain;
    width: ${({$ratio}) => $ratio * 380}px;
    height: ${({$ratio}) => $ratio * 426}px;
    z-index: 1;

    & p {
        padding: ${({$ratio}) => $ratio * 100}px var(--spacing_x5);
    }
`;

const ArrowButtonStyled = styled(ArrowButton)`
    position: absolute;
    z-index: 4;
    margin-top: auto;
    margin-left: auto;
    width: ${({$ratio}) => $ratio * 212}px;
    top: ${({$ratio}) => $ratio * 426}px;
    right: calc((100% -  ${({$ratio}) => $ratio * 380}px) / 2);
    border-radius: var(--border-radius-lg);
`;

export const Intro = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();
    const [part, setPart] = useState(0);

    const handleClick = () => {
        if (part === 0) {
            setPart(prev => prev + 1);

            return;
        }

        next();
    }

    return (
        <Wrapper $ratio={ratio}>
            <Logo />
            <InfoBlock $ratio={ratio}>
                {
                    part === 0 ? (
                        <p>
                            Добро пожаловать в <b>Центр Инноваций X5</b> — место, где создают будущее ритейла и строят карьеру мечты. Здесь мы ломаем стереотипы о работе, собирая уникальные профессиональные треки как конструктор. Команда Центра Инноваций X5 срочно улетает на нетворкинг с роботами-кладовщиками, и мы оставляем тебя за главного.</p>
                    ) : (
                        <p><b>Твоя миссия</b> — не найти, а изобрести идеальный карьерный трек под кодовым названием «X5». Используй наши наработки, цифровые прототипы и свою интуицию. Если справишься, то получишь <b>подарок от нашей команды:</b> сертификат на 10 000 рублей в Пятёрочку и два сертификата на 5 000 рублей в Перекрёсток.</p>
                    )
                }
            </InfoBlock>
            <ArrowButtonStyled $ratio={ratio} onClick={handleClick} />
            <Picture $ratio={ratio} src={pic} alt="" />
        </Wrapper>
    )
}