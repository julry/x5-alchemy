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
import { ArrowButton, IconButton } from "../shared/Button";
import { Trash } from "../shared/svgs/Trash";
import { GameHeader } from "../shared/GameHeader";

const Content = styled(FlexWrapper)`
    position: absolute;
    top: ${({$ratio}) => $ratio * 332}px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: unset;
    z-index: 5;
    height: auto;
    padding-bottom: var(--spacing_x5);
`;

const GameHeaderStyled = styled(GameHeader)`
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
`;

const Pagination = styled.div`
    display: flex;
    width: ${({$ratio}) => $ratio * 136}px;
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
        margin-top: ${({$ratio}) => $ratio * 12}px;
    }
`;

export const Game = () => {
    const ratio = useSizeRatio();
    const [page, setPage] = useState(1);

    const handleNext = () => {
        setPage(prev => prev + 1);
    }

    return (
       <>
            <MergeField />
            <GameHeaderStyled $ratio={ratio}/>
            <Content $ratio={ratio}>
                <ElementsField page={page}/>
                <Pagination $ratio={ratio}>
                    <ArrowButton disabled={page < 2} onClick={() => setPage(prev => prev - 1)}/>
                    <ArrowButton disabled={page > 2} onClick={() => setPage(prev => prev + 1)}/>
                </Pagination>
            </Content>
       </>
    )
}