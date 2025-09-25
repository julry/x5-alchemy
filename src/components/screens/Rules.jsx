import { useState } from "react"
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ElementsField } from "../shared/ElementsField";
import { FlexWrapper } from "../shared/ContentWrapper";
import { MergeField } from "../shared/MergeField";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BotDialog } from "../shared/BotDialog";
import { UserDialog } from "../shared/UserDialog";
import { Element } from "../shared/Element";
import {elements} from '../../constants/elements';
import { Trash } from "../shared/svgs/Trash";
import { GameHeader } from "../shared/GameHeader";
import { useProgress } from "../../contexts/ProgressContext";

const Content = styled(FlexWrapper)`
    position: absolute;
    top: ${({$ratio}) => $ratio * 332}px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: unset;
    z-index: 5;
    height: auto;
`;

const AnimationField = styled(motion.div)`
    position: absolute;
    top: ${({$ratio}) => $ratio * 162}px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: var(--spacing_x10);
    z-index: 8;

    & > div {
        flex-shrink: 0;
    }
`;

const Darken = styled.div`
    position: absolute;
    inset: 0;
    top:${({$top}) => $top}px;
    background: linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 6;
`;

const AnimatedButton = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 48}px;
    height:  ${({$ratio}) => $ratio * 48}px;
    right:  ${({$ratio}) => $ratio * -70}px;
    bottom:  ${({$ratio}) => $ratio * -120}px;
    background: #C879F7;
    box-shadow: inset -1.6px 1.6px 3.2px rgba(255, 255, 255, 0.25), inset 1.6px -1.6px 3.2px rgba(0, 0, 0, 0.25), 0 0 28px ${({$ratio}) => $ratio * 3}px #B8ED95;
    border-radius: ${({$ratio}) => $ratio * 12.8}px;
    transform-origin: center center;

    & svg {
        width: ${({$ratio}) => $ratio * 27}px;
        height:  ${({$ratio}) => $ratio * 30}px;
    }
`;

const AnimatedButtonStatic = styled(AnimatedButton)`
    bottom: auto;
    top: ${({$ratio}) => $ratio * 315}px;
    right: ${({$ratio}) => $ratio * 40}px;
    box-shadow: inset -1.6px 1.6px 3.2px rgba(255, 255, 255, 0.25), inset 1.6px -1.6px 3.2px rgba(0, 0, 0, 0.25);
    transform: none;

`;

const GameHeaderStyled = styled(GameHeader)`
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;

    & > button { 
        cursor: auto;
        box-shadow: inset -1.6px 1.6px 3.2px rgba(255, 255, 255, 0.25), inset 1.6px -1.6px 3.2px rgba(0, 0, 0, 0.25), 0 0 28px ${({$ratio}) => $ratio * 3}px #B8ED95;
    }
`;

const elementsRules = elements.filter((elem) => !['creativity', 'effectivity'].includes(elem.id));

export const Rules = () => {
    const ratio = useSizeRatio();
    const {next} = useProgress();
    const [part, setPart] = useState(0);

    const handleNext = () => {
        const newPart = part + 1;
        setPart();
        setTimeout(() =>  setPart(newPart), 300);
    }

    const exampleElement1 = elements.find(({id}) => id === 'creativity');
    const exampleElement2 = elements.find(({id}) => id === 'effectivity');

    return (
       <>
            <MergeField />
            <Darken $top={(part > 2 ? -150 : 332) * ratio}/>
            <Content $ratio={ratio}>
                <ElementsField shownElements={(![0,3].includes(part)) ? elementsRules : elements}/>
            </Content>
            <AnimatePresence>
                    {
                        part === 0 && (
                            <motion.div 
                                exit={{opacity: 0, height: 0}}
                            >
                                <BotDialog key={`${part}_bot`} part={part} />
                                <UserDialog key={`${part}_dialog`} isCenter bottom={40} text="Так что мне делать?" onNext={handleNext}/>
                            </motion.div>
                        )
                    }
                    {
                        part === 1 && (
                            <>
                                <AnimationField $ratio={ratio} initial={{opacity: 0}} animate={{opacity: 1}} >
                                    <Element element={exampleElement1} />
                                    <motion.div 
                                        initial={{zIndex: 4}}
                                        animate={{x: -95 * ratio}}
                                        transition={{
                                            delay: 0.5,
                                            repeat: Infinity,
                                            repeatType: 'mirror',
                                            duration: 1.5,
                                        }}
                                    >
                                        <Element element={exampleElement2} />
                                    </motion.div>
                                </AnimationField>

                                <motion.div 
                                    exit={{opacity: 0, height: 0}}
                                >
                                    <BotDialog key={`${part}_bot`} part={part} />

                                    <UserDialog key={`${part}_dialog`} bottom={40} text="Что делать, если в Соединителе закончится место?" onNext={handleNext}/>
                                </motion.div>
                            </>
                        )
                    }
                    {
                        part === 2 && (
                            <>
                                <AnimationField $ratio={ratio} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                         <motion.div 
                                            animate={{opacity: 0, scale: 0}}
                                            initial={{zIndex: 4}}
                                            transition={{
                                                delay: 1.5,
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                                repeatDelay: 1,
                                                duration: 0.4,
                                            }}
                                        >
                                            <Element element={exampleElement1} />
                                        </motion.div>
                                        <motion.div 
                                            animate={{opacity: 0, scale: 0}}
                                            initial={{zIndex: 4, scale: 1}}
                                            transition={{
                                                delay: 1.5,
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                                repeatDelay: 1,
                                                duration: 0.4,
                                            }}
                                        >
                                            <Element element={exampleElement2} />
                                        </motion.div>
                                        <AnimatedButton
                                            animate={{scale: 0.9}}
                                            $ratio={ratio}
                                            transition={{
                                                delay: 1.5,
                                                repeat: Infinity,
                                                repeatType: 'mirror',
                                                repeatDelay: 1.2,
                                                duration: 0.2,
                                            }}
                                        >
                                            <Trash />
                                        </AnimatedButton>
                                    </AnimationField>
                                    <motion.div 
                                        exit={{opacity: 0, height: 0}}
                                    >
                                        <BotDialog key={`${part}_bot`} part={part} />

                                        <UserDialog key={`${part}_dialog`} bottom={40} text="А как мне найти идеальный карьерный трек «X5»?" onNext={handleNext}/>
                                    </motion.div>
                            </>
                            
                        )
                    }
                    {
                        part === 3 && (
                            <>
                                <GameHeaderStyled  $ratio={ratio}/>
                                <AnimatedButtonStatic
                                    $ratio={ratio}
                                >
                                    <Trash />
                                </AnimatedButtonStatic>
                                <motion.div 
                                    exit={{opacity: 0, height: 0}}
                                >
                                    <BotDialog key={`${part}_bot`} part={part} />
                                    <UserDialog key={`${part}_dialog`} isCenter bottom={40} text="Спасибо!" onNext={() => next()}/>
                                </motion.div>
                            </>
                        )
                    }
                </AnimatePresence>
       </>
    )
}