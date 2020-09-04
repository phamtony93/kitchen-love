import React, {useContext, createContext, useReducer} from 'react'

//Create Context instance
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProviderValue = () => useContext(StateContext);