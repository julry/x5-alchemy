import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import bg from '../../assets/images/prizesBg.png';
import { Logo } from '../shared/svgs/Logo';
import { ContentWrapper } from '../shared/ContentWrapper';
import { useSizeRatio } from '../../hooks/useSizeRatio';
import { Button } from '../shared/Button';
import salmon from '../../assets/images/logoSalmon.svg';
import logo5ka from '../../assets/images/logo5.svg';
import logoPaket from '../../assets/images/logoPaket.svg';
import logoPost from '../../assets/images/logoPost.svg';
import { PrizeModal } from '../shared/PrizeModal';
import { StartPrizeModal } from '../shared/StartPrizeModal';

const Wrapper = styled(ContentWrapper)`
    background: url(${bg}) no-repeat 0 100%;
    background-size: cover;
`;

const SlotMachine = styled.div`
  position: relative;
  height: ${({ $ratio }) => $ratio * 637}px;
  overflow: hidden;
  margin-top: ${({ $ratio }) => $ratio * 61}px;
`;

const ItemWrapper = styled.div`
    height: ${({ $ratio }) => $ratio * 129}px;
    width: ${({ $ratio }) => $ratio * 380}px;
    padding: ${({ $ratio }) => $ratio * 2}px 0;
`;

const ItemsTrack = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
align-items: center;
`;

const INDEX_TO_SCALE = {
    0: 1,
    1: 0.912,
    2: 0.752,
    3: 0.592,
    4: 0.592,
}
const INDEX_TO_OPACITY = {
    0: 1,
    1: 0.7,
    2: 0.5,
    3: 0.3,
    4: 0.2,
}
const Item = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    width: 100%;
    height: 100%;
    transform: scale(${({ $index }) => INDEX_TO_SCALE[$index]});
    transition: opacity 0.3s, 0.3s;
    opacity:${({ $index }) => INDEX_TO_OPACITY[$index]} ;
    background: ${({ $isWinner }) => $isWinner ? 'red' : 'rgba(255, 255, 255, 0.25);'};
    border: 1.42184px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(9.26829px);
    border-radius: 28.4368px;
    padding: ${({ $ratio }) => $ratio * 28}px;
`;

const MiniLogo = styled.img`
    height: ${({ $ratio }) => $ratio * 68}px;
    width: ${({ $ratio }) => $ratio * 68}px;
    min-width: ${({ $ratio }) => $ratio * 68}px;
    min-height: ${({ $ratio }) => $ratio * 68}px;
    margin-right: ${({ $ratio }) => $ratio * 28}px;
    object-fit: contain;
`;

const Title = styled.h4`
    font-size: ${({ $ratio }) => $ratio * 28}px;
    margin-bottom: var(--spacing_x1);
`;

const Text = styled.p`
    font-size: ${({ $ratio }) => $ratio * 22}px;
`;

const SelectionLine = styled.div`
  position: absolute;
  top: 50%;
  right: -45px;
  height: 170px;
  width: 160px;
  transform: translateY(-50%);
  z-index: 35;
`;

const SpinButton = styled(Button)`
  width: 100%;
  margin-top: var(--spacing_x8);
`;

const GiftScroll = () => {
    const ratio = useSizeRatio();
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentPrize, setCurrentPrize] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [isStart, setIsStart] = useState(true);
    const wrapper = useRef();
    const itemRef = useRef();

    const prizes = [
        { id: 1, name: "Пакет", logo: logoPaket, text: 'подписка за 1 рубль', ext: '5paket' },
        { id: 2, name: "Пятёрочка", logo: logo5ka,  text: '500 руб.', ext: '5ka' },
        { id: 3, name: "Много лосося", logo: salmon, text: '10%', ext: 'salmon' },
        { id: 4, name: "5Post", logo: logoPost, text: '15%', ext: '5post' },
    ];

    const itemHeight = 129 * ratio;

    const infiniteItems = [];
    for (let i = 0; i < 43; i++) {
        infiniteItems.push(...prizes.map(prize => ({
            ...prize,
            uniqueId: `${i}-${prize.id}`
        })));
    }


    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setCurrentPrize(null);

        const targetIndex = Math.floor(Math.random() * prizes.length);
        const selectedPrize = prizes[targetIndex];

        const centerPosition = wrapper?.current?.getBoundingClientRect().height / 2;
        const currentCenterIndex = Math.floor((scrollY + centerPosition) / itemHeight) % prizes.length;

        let itemsToTarget = targetIndex - currentCenterIndex;
        if (itemsToTarget < 0) itemsToTarget += prizes.length;

        const fullCycles = 5;
        const totalItemsToScroll = (fullCycles * prizes.length) + itemsToTarget;

        const targetScrollY = scrollY + (totalItemsToScroll * itemHeight);

        const animationDuration = 4.5;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (animationDuration * 1000), 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentY = scrollY + (targetScrollY - scrollY) * easeOut;
            setScrollY(currentY);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCurrentPrize(selectedPrize);
                setIsSpinning(false);
            }
        };

        requestAnimationFrame(animate);
    };


    return (
        <Wrapper>
            <Logo />
            <SlotMachine $ratio={ratio} ref={wrapper}>
                <ItemsTrack
                    style={{ y: -scrollY }}
                    transition={{ type: "tween", duration: 0 }}
                >
                    {infiniteItems.map((item, index) => {

                        return (
                            <ItemWrapper
                                ref={itemRef}
                                key={item.uniqueId}
                                $ratio={ratio}
                            >
                                <Item
                                    $index={!isSpinning ? Math.abs(index - 2) : 0}
                                    $ratio={ratio}
                                >
                                    <MiniLogo $ratio={ratio} src={item.logo}/>
                                    <div>
                                        <Title $ratio={ratio}>{item.name}</Title>
                                        <Text $ratio={ratio}>{item.text}</Text>
                                    </div>
                                </Item>
                            </ItemWrapper>
                        );
                    })}
                </ItemsTrack>
            </SlotMachine>
            <SelectionLine>
                <svg width="116" height="170" viewBox="0 0 116 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_dii_471_58)">
                        <path d="M54.9181 88.9229C51.5047 87.4214 51.5047 82.5786 54.9181 81.0771L120.989 52.0136C123.821 50.7676 127 52.8422 127 55.9365L127 114.063C127 117.158 123.821 119.232 120.989 117.986L54.9181 88.9229Z" fill="#60AF2C" />
                    </g>
                    <defs>
                        <filter id="filter0_dii_471_58" x="0.929825" y="0.217453" width="177.499" height="169.565" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="25.7143" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_471_58" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_471_58" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="2.57143" dy="-2.57143" />
                            <feGaussianBlur stdDeviation="2.57143" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_471_58" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-2.57143" dy="2.57143" />
                            <feGaussianBlur stdDeviation="4.28571" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.998329 0 0 0 0 0.998329 0 0 0 0 0.998329 0 0 0 0.38 0" />
                            <feBlend mode="normal" in2="effect2_innerShadow_471_58" result="effect3_innerShadow_471_58" />
                        </filter>
                    </defs>
                </svg>

            </SelectionLine>
            <SpinButton
                onClick={spin}
                disabled={isSpinning || currentPrize}
            >
                Пуск!
            </SpinButton>

            <AnimatePresence>
                {currentPrize && (<PrizeModal prizeId={currentPrize.ext} />)}
                {isStart && (<StartPrizeModal onClose={() => setIsStart(false)}/>)}
            </AnimatePresence>
        </Wrapper>
    );
};

export default GiftScroll;