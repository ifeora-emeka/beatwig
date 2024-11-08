"use client";
import React, { createContext, useState, useContext } from "react";

interface AppState {
    showSearch: boolean;
}

interface AppContextType {
    appState: AppState;
    setAppContextState: (newState: Partial<AppState>) => void;
    saveSearchHistory: (keyword: string) => void;
}

const initialAppState: AppState = {
    showSearch: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }: any) => {
    const [state, setState] = useState<AppState>(initialAppState);

    const setAppContextState = (newState: Partial<AppState>) => {
        setState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const saveSearchHistory = (keyword: string) => {
        const searchHistory = localStorage.getItem("searchHistory") || "";
        const history = searchHistory.split(",").filter(Boolean);
        if (!history.includes(keyword)) {
            const newHistory = [keyword, ...history].slice(0, 5);
            localStorage.setItem("searchHistory", newHistory.join(","));
        }
    };

    const contextValue: AppContextType = {
        appState: state,
        setAppContextState,
        saveSearchHistory,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
