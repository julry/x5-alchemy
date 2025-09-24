// import { FTClient } from 'ft-client';
import { createContext, useContext, useState } from 'react'
// import { createContext, useEffect, useContext, useRef, useState } from 'react'
import { screens } from "../constants/screens";
import { getUrlParam } from "../utils/getUrlParam";


const INITIAL_STATE = {
    screen: 0,
}

const ProgressContext = createContext(INITIAL_STATE);

// const API_LINK = process.env.REACT_APP_API_URL;

export function ProgressProvider(props) {
    const { children } = props
    const [currentScreen, setCurrentScreen] = useState(+getUrlParam('screen') || 0);
    const shownScreen = screens[currentScreen]?.component;

    // const client = useRef();
    // useEffect(() => {
    //     client.current = new FTClient(
    //         API_LINK,
    //         'campus-alfa'
    //     );
    // }, []);

    // const registrateEmail = async ({email, isAdsAgreed}) => {
    //    try {
    //         const emailUser = await client?.current.findRecord('email', email);
    //         if (emailUser) return;

    //         const record = await client?.current.createRecord({email, isAdsAgreed});
    //         return record; 
    //    } catch (e) {
    //         return {isError: true}
    //    }
    // };


    function next() {
        const nextScreenIndex = +currentScreen + 1;
        console.log('nextScreenIndex', nextScreenIndex);
        if (nextScreenIndex > screens.length - 1) return;

        setCurrentScreen(nextScreenIndex);
    }

    const state = {
        shownScreen,
        currentScreen,
        next,
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
