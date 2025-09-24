import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { IconButton } from "./Button";

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: var(--spacing_x8);

    & > button {
        background-color: #FEB503;
    }
`;

const ProgressBar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: #AF6AD8;
    border-radius: 10px;
    height: ${({ $ratio }) => $ratio * 11}px;
    width: ${({ $width }) => $width};
`;

const Progress = styled.div`
    position: relative;
    display: flex;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(2px);
    border-radius: var(--border-radius-lg);
    height: ${({ $ratio }) => $ratio * 11}px;
    width: ${({ $ratio }) => $ratio * 142}px;
`;

const InfoBar = styled.div`
    display: flex;
    width: ${({ $ratio }) => $ratio * 142}px;
    justify-content: space-between;
    align-items: center;
    margin-top:  ${({ $ratio }) => $ratio * 12}px;
`;

const Naming = styled.p`
    opacity: 0.5;
`;

export const GameHeader = ({ unitAmount, onRulesClick, ...props }) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props}>
            <div>
                <Progress $ratio={ratio}>
                    <ProgressBar $ratio={ratio} $width={unitAmount > 0 ? `${unitAmount / 11 * 100}%` : `${11 * ratio}px`} />
                </Progress>
                <InfoBar $ratio={ratio}>
                    <Naming>ЮНИТЫ</Naming>
                    <p><b>{unitAmount ?? 0}</b> / 11</p>
                </InfoBar>
            </div>
            <IconButton onClick={onRulesClick}>
                <svg width="25" height="36" viewBox="0 0 25 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_ddi_418_4825)">
                        <path d="M15.875 29L9.125 29C8.82663 29 8.54048 29.2634 8.3295 29.7322C8.11853 30.2011 8 30.837 8 31.5C8 32.163 8.11853 32.7989 8.3295 33.2678C8.54048 33.7366 8.82663 34 9.125 34L15.875 34C16.1734 34 16.4595 33.7366 16.6705 33.2678C16.8815 32.7989 17 32.163 17 31.5C17 30.837 16.8815 30.2011 16.6705 29.7322C16.4595 29.2634 16.1734 29 15.875 29Z" fill="#FFE9B4" />
                        <path d="M20.2283 5.11273C18.2236 3.10537 15.5382 2.00002 12.6668 2.00002C11.2651 1.99668 9.87655 2.2703 8.58088 2.80518C7.28522 3.34005 6.10799 4.12564 5.11682 5.11681C4.12565 6.10798 3.34006 7.28521 2.80519 8.58087C2.27031 9.87654 1.99669 11.2651 2.00003 12.6668C2.00003 15.7749 3.19138 18.6823 5.26674 20.643L5.55741 20.9156C6.75809 22.0383 8.40012 23.5763 8.40012 24.9337L8.40012 26.5337C8.40012 26.8166 8.5125 27.0879 8.71254 27.288C8.91258 27.488 9.1839 27.6004 9.4668 27.6004L11.0668 27.6004C11.2083 27.6004 11.3439 27.5442 11.444 27.4442C11.544 27.3442 11.6002 27.2085 11.6002 27.067L11.6002 19.2549C11.6002 19.1471 11.5675 19.0417 11.5065 18.9528C11.4454 18.8639 11.3588 18.7956 11.2582 18.7569C10.6422 18.5056 10.0571 18.1847 9.51413 17.8002C9.39213 17.7223 9.28725 17.6204 9.2059 17.5007C9.12455 17.3809 9.06843 17.2459 9.04095 17.1037C9.01346 16.9616 9.0152 16.8154 9.04604 16.6739C9.07689 16.5325 9.1362 16.3988 9.22037 16.281C9.30454 16.1633 9.41179 16.0638 9.53562 15.9889C9.65944 15.9139 9.79723 15.8648 9.9406 15.8448C10.084 15.8248 10.2299 15.8341 10.3695 15.8723C10.5092 15.9105 10.6396 15.9767 10.7528 16.0669C11.2462 16.4162 12.1962 16.9336 12.6668 16.9336C13.1375 16.9336 14.0875 16.4149 14.5822 16.0669C14.8125 15.9221 15.0895 15.8708 15.3564 15.9234C15.6233 15.9761 15.86 16.1288 16.0181 16.3502C16.1762 16.5716 16.2437 16.8451 16.2068 17.1146C16.1698 17.3842 16.0313 17.6295 15.8196 17.8002C15.2765 18.184 14.6914 18.5043 14.0755 18.7549C13.9749 18.7936 13.8883 18.8619 13.8272 18.9508C13.7662 19.0397 13.7335 19.1451 13.7335 19.2529L13.7335 27.067C13.7335 27.2085 13.7897 27.3442 13.8897 27.4442C13.9898 27.5442 14.1254 27.6004 14.2669 27.6004L15.8669 27.6004C16.1498 27.6004 16.4211 27.488 16.6211 27.288C16.8212 27.0879 16.9336 26.8166 16.9336 26.5337L16.9336 24.9337C16.9336 23.6083 18.5576 22.0716 19.7436 20.949L20.071 20.6383C22.2056 18.6003 23.3337 15.8409 23.3337 12.6668C23.3407 11.265 23.0699 9.87562 22.5369 8.57903C22.0039 7.28244 21.2193 6.10431 20.2283 5.11273Z" fill="#FFE9B4" />
                    </g>
                    <defs>
                        <filter id="filter0_ddi_418_4825" x="0.6" y="0.599989" width="24.1337" height="34.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-0.4" dy="-0.4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_418_4825" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="0.4" dy="0.4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_418_4825" result="effect2_dropShadow_418_4825" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_418_4825" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="0.4" dy="0.4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_418_4825" />
                        </filter>
                    </defs>
                </svg>

            </IconButton>
        </Wrapper>
    )
}