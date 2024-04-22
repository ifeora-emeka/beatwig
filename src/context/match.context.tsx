import React, { createContext, useContext, useState } from "react";

interface MatchContextType {
    matchState: {
        pending_messages: PendingMessage[];
    };
    setMatchState: (newState: State) => void;
    addPendingChat: (chat: any) => void;
}

export interface PendingMessage {
    _id: string;
    message: string;
}

interface State {
    pending_messages: PendingMessage[];
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
        pending_messages: [],
    });

    const _setMatchState = (newState: Partial<State>) => {
        setState((prev) => ({
            ...prev,
            ...newState,
        }));
    };

    const addPendingChat = (chat: PendingMessage) => {
        setState((prev) => ({
            ...prev,
            pending_messages: [...prev.pending_messages, chat],
        }));
    };

    return (
        <MatchContext.Provider
            value={{
                matchState: state,
                setMatchState: _setMatchState,
                addPendingChat,
            }}
        >
            {children}
        </MatchContext.Provider>
    );
};
