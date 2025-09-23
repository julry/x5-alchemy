import styled from 'styled-components';
import { useProgress } from "../contexts/ProgressContext";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100%;
    height: 100%;
`;

export function ScreenContent() {
    const { shownScreen: Screen } = useProgress();

    return Screen && (
        <Wrapper>
            <Screen />
        </Wrapper>
    )
}