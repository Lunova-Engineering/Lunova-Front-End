// BaseExponentContext.js
import React, { createContext, useState } from 'react';

export const BaseExponentContext = createContext(undefined);

export const BaseExponentProvider = ({ children }) => {
    const [baseExponent, setBaseExponent] = useState(.5);

    return (
        <BaseExponentContext.Provider value={{ baseExponent, setBaseExponent }}>
            {children}
        </BaseExponentContext.Provider>
    );
};
