import styled from "styled-components";
import { elements } from "../../constants/elements";
import { Element } from "./Element";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    position: relative;
    z-index: 4;
    width: 100%;
`;

const ContentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    clip-path:url(#bgblur_0_2017_105_clip_path);
`;

const SvgWrapper = styled.svg`
    position: relative;
    z-index: 4;
`;

const ElementsTable = styled.div`
    position: absolute;
    z-index: 5;
    inset: 0;
    width: 100%;
    padding: ${({$ratio}) => $ratio * 19}px  ${({$ratio}) => $ratio * 10}px 0;
    display: grid;
    column-gap: ${({$ratio}) => $ratio * 36}px;
    row-gap: ${({$ratio}) => $ratio * 8}px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, ${({$ratio}) => $ratio * 80}px);
`;

const ElementsRow = styled.div`
    position: absolute;
    bottom: var(--spacing_x4);
    left: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 5;
    display: flex;
    gap: ${({$ratio}) => $ratio * 36}px;
`;

const ElementCell = styled.div`
    grid-area: ${({$grid}) => $grid};
`;

const EmptyElement = styled.div`
    width: ${({$ratio}) => $ratio * 80}px;
    height: ${({$ratio}) => $ratio * 80}px;

    background: rgba(0, 0, 0, 0.15);
    border-radius: ${({$ratio}) => $ratio * 16}px;
    align-self: center;
    justify-self: center;
`;

export const ElementsField = ({shownElements = elements, page = 1}) => {
    const ratio = useSizeRatio();
    const {gridElements,  bottomElements} = shownElements.reduce((res, element) => {
        if (element.page !== page) return res;

        if (element.isBottom) {
            res.bottomElements.push(element);
        } else if (element.grid){
            res.gridElements.push(element)
        }

        return res;
    }, {gridElements: [], bottomElements: []});

    const getIsOpen = (element) => page === 1 || element.isOpened;
    
    return (
        <Wrapper>
            <SvgWrapper width="100%" viewBox="0 0 380 471" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-10" y="-10.0001" width="400" height="491">
                    <ContentWrapper xmlns="http://www.w3.org/1999/xhtml"/>
                </foreignObject><g data-figma-bg-blur-radius="10">
                <path d="M24 5.24547e-06C10.7452 7.08877e-06 2.88767e-05 10.7452 3.10096e-05 24L9.90783e-05 447C0.000101211 460.255 10.7453 471 24.0001 471L356 471C369.255 471 380 460.255 380 447L380 23.9999C380 10.7451 369.255 -7.28919e-05 356 -7.0947e-05L278.787 -5.96174e-05C267.985 -5.80324e-05 258.514 7.21661 255.647 17.6316L244.161 59.3683C241.295 69.7833 231.824 77 221.021 77L162.227 77C151.802 77 142.57 70.2709 139.379 60.3471L125.328 16.6529C122.137 6.72907 112.905 -7.11822e-06 102.481 -5.66855e-06L24 5.24547e-06Z" fill="#60AF2C" fill-opacity="0.1"/>
            <path d="M0.500005 24L0.500098 447C0.5001 459.979 11.0214 470.5 24.0001 470.5L356 470.5C368.979 470.5 379.5 459.979 379.5 447L379.5 23.9999C379.5 11.0213 368.979 0.499968 356 0.499922L278.787 0.499939C268.21 0.49995 258.937 7.5666 256.13 17.7646L244.643 59.5009C241.717 70.1328 232.049 77.4999 221.022 77.5L162.227 77.5C151.585 77.4999 142.161 70.6305 138.903 60.5L124.853 16.8056C121.728 7.0887 112.687 0.499976 102.48 0.499978L24 0.499995C11.0213 0.500005 0.500007 11.0213 0.500005 24Z" stroke="#60AF2C" stroke-opacity="0.25"/>
            </g>
            <defs>
            <clipPath id="bgblur_0_2017_105_clip_path" transform="translate(10 10.0001)"><path d="M24 5.24547e-06C10.7452 7.08877e-06 2.88767e-05 10.7452 3.10096e-05 24L9.90783e-05 447C0.000101211 460.255 10.7453 471 24.0001 471L356 471C369.255 471 380 460.255 380 447L380 23.9999C380 10.7451 369.255 -7.28919e-05 356 -7.0947e-05L278.787 -5.96174e-05C267.985 -5.80324e-05 258.514 7.21661 255.647 17.6316L244.161 59.3683C241.295 69.7833 231.824 77 221.021 77L162.227 77C151.802 77 142.57 70.2709 139.379 60.3471L125.328 16.6529C122.137 6.72907 112.905 -7.11822e-06 102.481 -5.66855e-06L24 5.24547e-06Z"/>
            </clipPath></defs>
            </SvgWrapper>
            <ElementsTable $ratio={ratio}>
                {gridElements.map((element) => (
                    <ElementCell key={element.id} $grid={element.grid}>
                        {getIsOpen(element) ? (
                            <Element element={element} />
                        ) : <EmptyElement $ratio={ratio}/>
                        }
                    </ElementCell>
                ) )}
            </ElementsTable>
            <ElementsRow $ratio={ratio}>
                {bottomElements.map((element) => (
                    <ElementCell key={element.id} $grid={element.grid}>
                       {getIsOpen(element) ? (
                            <Element element={element} />
                        ) : <EmptyElement $ratio={ratio}/>
                        }
                    </ElementCell>
                ))}
            </ElementsRow>
        </Wrapper>
    )
}