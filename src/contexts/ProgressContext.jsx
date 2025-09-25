import { FTClient } from 'ft-client';
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { preloadedImages, screens } from "../constants/screens";
import { getUrlParam } from "../utils/getUrlParam";
import {useImagePreloader} from '../hooks/useImagePreloader';


const INITIAL_STATE = {
    screen: 0,
}

const ProgressContext = createContext(INITIAL_STATE);

const API_LINK = import.meta.env.VITE_API_URL;

export function ProgressProvider(props) {
    const { children } = props
    const [currentScreen, setCurrentScreen] = useState(+getUrlParam('screen') || 0);
    const shownScreen = screens[currentScreen]?.component;

    const client = useRef();

    useEffect(() => {
        client.current = new FTClient(
            API_LINK,
            'x5-innovation-center'
        );

    }, []);
    
    useImagePreloader(preloadedImages);

    const registrateEmail = async ({email, isAdsAgreed}) => {
       try {
            const emailUser = await client?.current.findRecord('email', email);
            if (emailUser) return {hasUser: true};

            const record = await client?.current.createRecord({email, isAdsAgreed});
            return record; 
       } catch (e) {
            console.log(e);
            return {isError: true}
       }
    };

    function next() {
        const nextScreenIndex = +currentScreen + 1;
        if (nextScreenIndex > screens.length - 1) return;

        setCurrentScreen(nextScreenIndex);
    }

    const state = {
        shownScreen,
        currentScreen,
        next,
        registrateEmail
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
