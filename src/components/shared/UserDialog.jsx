import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { ArrowButton } from "./Button";
import { motion } from "framer-motion";

const DialogWrapper = styled(motion.div)`
    position: absolute;
    bottom: ${({$bottom}) => $bottom}px;
    right: var(--spacing_x3);
    height: ${({$ratio}) => $ratio * 140}px;
    width: ${({$ratio}) => $ratio * 298}px;
    z-index: 10;
    transform-origin: 100% 100%;
    overflow: hidden;
`;

const Dialog = styled.div`
    clip-path:url(#bgblur_0_418_4632_clip_path);
    height:100%;
    width:100%;
    background-color: #444A45;
`;

const ButtonStyled = styled(ArrowButton)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 16}px;
    right: ${({$ratio}) => $ratio * 16}px;
    width: ${({$ratio}) => $ratio * 56}px;
    height: ${({$ratio}) => $ratio * 56}px;
    z-index: 2;
`;

const Text = styled(motion.p)`
    position: absolute;
    top: ${({$isCenter}) => $isCenter ? 'var(--spacing_x5)' : 'var(--spacing_x3)'};
    left: var(--spacing_x3);
    font-weight: 700;
    text-overflow: clip;
`;

export const UserDialog = ({text, onNext, bottom, isCenter}) => {
    const ratio = useSizeRatio();

    return (
        <DialogWrapper 
            $ratio={ratio} 
            $bottom={bottom * ratio}
            initial={{opacity: 0, height: 0, width: 0, 'white-space': 'nowrap'}}
            animate={{opacity: 1, height: 140 * ratio + 'px', width: 298 * ratio + 'px', 'white-space': 'break-spaces'}}
            exit={{opacity: 0, height: 0, width: 0, 'white-space': 'nowrap'}}
            transition={{delay: 2, duration: 0.3}}
        >
            <svg width="100%" height="100%" viewBox="0 0 298 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <foreignObject x="-80" y="-80" width="458" height="300">
                <Dialog xmlns="http://www.w3.org/1999/xhtml"/>
            </foreignObject><g data-figma-bg-blur-radius="80">
            <path d="M201.5 7.65674e-06L274 1.90427e-06C287.255 8.5257e-07 298 10.7452 298 24L298 116C298 129.255 287.255 140 274 140L237.465 140C229.197 140 221.512 135.745 217.124 128.737L187.229 80.9972C182.841 73.99 175.156 69.7347 166.888 69.7347L24 69.7347C10.7452 69.7347 4.58837e-07 58.9895 1.02484e-06 45.7347L1.95295e-06 24.0001C2.51895e-06 10.7452 10.7452 6.16923e-05 24 5.79376e-05L201.5 7.65674e-06Z" fill="#F7F7F7" fill-opacity="0.3"/>
            <path d="M24 0.5L274 0.5C286.979 0.500015 297.5 11.0213 297.5 24V116C297.5 128.979 286.979 139.5 274 139.5H237.465C229.369 139.5 221.844 135.333 217.548 128.472L187.652 80.7314C183.173 73.5786 175.327 69.2344 166.888 69.2344L24 69.2344C11.0213 69.2344 0.499999 58.7131 0.5 45.7344L0.5 24C0.50003 11.0213 11.0213 0.500004 24 0.5Z" stroke="white" stroke-opacity="0.2"/>
            </g>
            <defs>
            <clipPath id="bgblur_0_418_4632_clip_path" transform="translate(80 80)"><path d="M201.5 7.65674e-06L274 1.90427e-06C287.255 8.5257e-07 298 10.7452 298 24L298 116C298 129.255 287.255 140 274 140L237.465 140C229.197 140 221.512 135.745 217.124 128.737L187.229 80.9972C182.841 73.99 175.156 69.7347 166.888 69.7347L24 69.7347C10.7452 69.7347 4.58837e-07 58.9895 1.02484e-06 45.7347L1.95295e-06 24.0001C2.51895e-06 10.7452 10.7452 6.16923e-05 24 5.79376e-05L201.5 7.65674e-06Z"/>
            </clipPath></defs>
            </svg>
            <Text
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 2.2, duration: 0.1}}
                $isCenter={isCenter}
            >
                {text}
            </Text>
            <ButtonStyled $ratio={ratio} onClick={onNext} />
        </DialogWrapper>
       
    )
}