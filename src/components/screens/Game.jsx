import { useRef, useState } from "react"
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
import { AnimatePresence } from "framer-motion";
import { CheckModal } from "../shared/HelpModal";
import { ElementModal } from "../shared/ElementModal";
import { FormModal } from "../shared/FormModal";

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

export const Game = () => {
    const ratio = useSizeRatio();
    const [page, setPage] = useState(1);
    const [fieldElemets, setFieldElements] = useState([]);
    const [unitsAmount, setUnitsAmount] = useState(0);
    const [availableElements, setAvailableElements] = useState(elements);
    const [discoveredElements, setDiscoveredElements] = useState([]);
    const [isInfo, setIsInfo] = useState(false);
    const [isForm, setIsForm] = useState(true);
    const [isDiscoveredModal, setIsDiscoveredModal] = useState({ shown: false, element: null });
    const mergeField = useRef();
    const trashBtn = useRef();

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
    
    const combineElements = (element1, element2) => {
        const sortedElements = [element1.data.current.id, element2.data.current.id].sort((a) => -1 * +!!['work', 'flexibility'].includes(a));

        const combinationKey = `${sortedElements[0]}+${sortedElements[1]}`;

        if (combinations[combinationKey]) {
            const newElement = combinations[combinationKey];
            const element = elements.find(({ id }) => id === newElement);

            if (!discoveredElements.includes(newElement)) {
                setDiscoveredElements(prev => [...prev, newElement]);
                setAvailableElements(prev => prev.map((el) => el.id === newElement ? ({...el, isOpened: true}) : el))
                setTimeout(() => setIsDiscoveredModal({ shown: true, element: newElement }), 300);

                if (element.page === 3) {
                    setUnitsAmount(prev => prev + 1);
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
            </AnimatePresence>
        </>
    )
}