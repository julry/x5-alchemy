import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ElementsField } from "../shared/ElementsField";
import { FlexWrapper } from "../shared/ContentWrapper";
import { MergeField } from "../shared/MergeField";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { combinations, elements } from '../../constants/elements';
import { ArrowButton, IconButton } from "../shared/Button";
import { Trash } from "../shared/svgs/Trash";
import { GameHeader } from "../shared/GameHeader";
import { Element } from "../shared/Element";
import { uid } from "uid";
import { AnimatePresence, motion } from "framer-motion";
import { CheckModal } from "../shared/HelpModal";
import { ElementModal } from "../shared/ElementModal";
import { FormModal } from "../shared/FormModal";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

const Content = styled(FlexWrapper)`
    position: absolute;
    top: ${({ $ratio }) => $ratio * 332}px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: unset;
    z-index: 5;
    height: auto;
    padding-bottom: var(--spacing_x5);

    @media screen and (max-height: 700px) {
        top: ${({ $ratio }) => $ratio * 292}px;
    }
`;

const GameHeaderStyled = styled(GameHeader)`
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
`;

const Pagination = styled.div`
    display: flex;
    position: relative;
    z-index: 10;
    width: ${({ $ratio }) => $ratio * 136}px;
    margin-top: auto;
    justify-content: space-between;
    align-items: center;

    & button {
        background-color: #FEB503;

        &:first-child svg {
            transform: scale(-1);
        }
    }

    @media screen and (max-height: 800px) {
        margin-top: ${({ $ratio }) => $ratio * 12}px;
    }
`;

const ElementsWrapper = styled.div`
    position: absolute;
    z-index: 55;
    left: 0;
    top: ${({ $ratio }) => $ratio * 90}px;
    width: 100%;
    height: ${({ $ratio }) => $ratio * 280}px;

    @media screen and (max-height: 700px) {
        height: ${({ $ratio }) => $ratio * 248}px;
    }
`;

const RemoveButton = styled(IconButton)`
    position: absolute;
    bottom: var(--spacing_x2);
    right: var(--spacing_x8);
    z-index: 65;
`;

const Tip = styled(motion.div)`
    position: absolute;
    top: var(--spacing_x6);
    left: 50%;
    transform: translateX(-50%);
    background: #4A4F4A;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing_x3);
    z-index: 32;

    & p {
        width: max-content;
    }
`;


const TIP_TIMEOUT = 60 * 1000;
const TIP_UNSUCCESS_TIMES = 5;

export const Game = () => {
    const ratio = useSizeRatio();
    const [page, setPage] = useState(1);
    const [fieldElemets, setFieldElements] = useState([]);
    const [unitsAmount, setUnitsAmount] = useState(0);
    const [availableElements, setAvailableElements] = useState(elements);
    const [discoveredElements, setDiscoveredElements] = useState([]);
    const [isInfo, setIsInfo] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [isTip, setIsTip] = useState(false);
    const [isDiscoveredModal, setIsDiscoveredModal] = useState({ shown: false, element: null });
    const mergeField = useRef();
    const trashBtn = useRef();
    const openedElements = useRef(0);
    const unsucessTimes = useRef(0);
    const timerRef = useRef();

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const getRandomPosition = () => {
        let x = Math.random() * (mergeField?.current?.getBoundingClientRect().width - 80 * ratio);
        let y = Math.random() * (mergeField?.current?.getBoundingClientRect().height - 80 * ratio);
        let startTrashX = trashBtn?.current?.getBoundingClientRect().x - mergeField?.current?.getBoundingClientRect().x;
        let startTrashY = trashBtn?.current?.getBoundingClientRect().y - mergeField?.current?.getBoundingClientRect().y;

        if (((x + 80 * ratio) > startTrashX)  && (y + 80 * ratio) > startTrashY) {
            x = x - trashBtn?.current?.getBoundingClientRect().width;
            y = y - trashBtn?.current?.getBoundingClientRect().height;
        }

        return ({x, y});
    }
    
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setIsTip(true);
        }, TIP_TIMEOUT);
    }, []);


    const combineElements = (element1, element2) => {
        const sortedElements = [element1.data.current.id, element2.data.current.id].sort((a) => -1 * +!!['work', 'flexibility'].includes(a));

        const combinationKey = `${sortedElements[0]}+${sortedElements[1]}`;

        if (combinations[combinationKey]) {
            unsucessTimes.current = 0;
            const newElement = combinations[combinationKey];
            const element = elements.find(({ id }) => id === newElement);

            if (!discoveredElements.includes(newElement)) {
                setDiscoveredElements(prev => [...prev, newElement]);
                setAvailableElements(prev => prev.map((el) => el.id === newElement ? ({...el, isOpened: true}) : el))
                setTimeout(() => setIsDiscoveredModal({ shown: true, element: newElement }), 300);

                if (element.page === 3) {
                    if (element.metrikaName) {
                        reachMetrikaGoal(`unit_${element.metrikaName}`);
                    }
                    setUnitsAmount(prev => prev + 1);
                }

                if (element.page === 2) {
                    if (isTip) setIsTip(false);

                    openedElements.current += 1;
                    clearTimeout(timerRef.current);

                    if (openedElements.current < 11) {
                        timerRef.current = setTimeout(() => {
                            setIsTip(true);
                        }, TIP_TIMEOUT);
                    }
                }
            }

            setFieldElements(prev => [...prev.filter(el => el.extId !== element1.id && el.extId !== element2.id), {
                ...element,
                extId: uid(),
                position: element2.data.current.position ?? getRandomPosition(),
                isCreated: true,
            }])

            return true;
        }

        unsucessTimes.current += 1;

        if (unsucessTimes.current >= TIP_UNSUCCESS_TIMES && openedElements.current < 11) {
            clearTimeout(timerRef.current);
            setIsTip(true);
        }
    };


    const remove = () => {
        setFieldElements([]);
    };
    
    const handleClose = () => {
        setIsDiscoveredModal({shown: false, element: null});

        if (unitsAmount === 11) {
            setIsForm(true);
        }
    }


    const getElementPosition = (positionX, positionY) => {
        let x = Math.min(mergeField?.current?.getBoundingClientRect().width, positionX);
        let y = Math.min(mergeField?.current?.getBoundingClientRect().height, positionY);
        let startTrashX = trashBtn?.current?.getBoundingClientRect().x - mergeField?.current?.getBoundingClientRect().x;
        let startTrashY = trashBtn?.current?.getBoundingClientRect().y - mergeField?.current?.getBoundingClientRect().y;

        if (((x + 100 * ratio) > startTrashX) && (y + 80 * ratio) > startTrashY) {
            x = startTrashX - 100 * ratio;
            y = startTrashY - 80 * ratio;
        }

        return {x, y}
    }
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && over.id !== active.id) {
            const isCombined = combineElements(active, over);

            if (isCombined) {
                return
            }
        } 
        
        if (active.data.current.extId) {
            const { delta } = event;
            if (delta) {
                setFieldElements(prev => prev.map(element =>
                    element.extId === active.data.current.extId
                        ? {
                            ...element,
                            position: {
                                x: Math.max(0, getElementPosition(element.position.x + delta.x, element.position.y + delta.y).x),
                                y: Math.max(0, getElementPosition(element.position.x + delta.x, element.position.y + delta.y).y)
                            }
                        }
                        : element
                ));
            }
        }

    };

    const addElement = (element) => {
        setFieldElements(prev => [...prev, {...element, position: getRandomPosition(), extId: uid()}]);
    }

    return (
        <>
            <MergeField />
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
            >
                <ElementsWrapper ref={mergeField} 
                    $ratio={ratio}
                >
                    <AnimatePresence>
                        {fieldElemets.map((element) => (
                            <Element key={element.extId} element={element} isDraggable/>
                        ))}
                    </AnimatePresence>
                    <RemoveButton $ratio={ratio} onClick={remove} ref={trashBtn}>
                        <Trash />
                    </RemoveButton>
                </ElementsWrapper>
            </DndContext>

            <GameHeaderStyled $ratio={ratio} unitAmount={unitsAmount} onRulesClick={() => setIsInfo(true)}/>
            <Content $ratio={ratio}>
                <ElementsField
                    elements={availableElements}
                    openedElements={discoveredElements}
                    onElementClick={addElement}
                    page={page}
                />
                <Pagination $ratio={ratio}>
                    <ArrowButton disabled={page < 2} onClick={() => setPage(prev => prev - 1)} />
                    <ArrowButton disabled={page > 2} onClick={() => setPage(prev => prev + 1)} />
                </Pagination>
            </Content>
            <AnimatePresence>
                {isInfo && (<CheckModal onClose={() => setIsInfo(false)} discoveredElements={discoveredElements}/>)}
                {isForm && (<FormModal/>)}
                {isDiscoveredModal.shown && (<ElementModal elementId={isDiscoveredModal.element} onClose={handleClose}/>)}
                {isTip && (
                    <Tip initial={{opacity: 0, scale: 0, x: '-50%'}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}}> 
                        <p>Попробуй добавить гибкость</p>
                    </Tip>
                )}
            </AnimatePresence>
        </>
    )
}