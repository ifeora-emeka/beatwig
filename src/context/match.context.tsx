import React, { createContext, useContext, useState } from "react";
import { MatchMessageData } from "@/types/message.types";

interface MatchContextType {
    matchState: State;
    setMatchState: (newState: State) => void;
}

export interface PendingMessage {
    _id: string;
    message: string;
}

interface State {
    active_message: MatchMessageData | null;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatchContext = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error("useMatchContext must be used within a MatchProvider");
    }
    return context;
};

export const MatchProvider = ({ children }: any) => {
    const [state, setState] = useState<State>({
        active_message: null,
    });

    const _setMatchState = (newState: Partial<State>) => {
        setState((prev) => ({
            ...prev,
            ...newState,
        }));
    };

    return (
        <MatchContext.Provider
            value={{
                matchState: state,
                setMatchState: _setMatchState,
            }}
        >
            {children}
        </MatchContext.Provider>
    );
};
