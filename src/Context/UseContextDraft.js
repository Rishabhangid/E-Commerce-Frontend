import React, { createContext } from "react";

const AppConsumer = createContext();


const AppProvider = ({ children }) => {
    const data = 10


    return (
        <AppConsumer.Provider value={{ data }}>
            {children}
        </AppConsumer.Provider>
    )
}

export { AppConsumer, AppProvider };


