import React, { createContext, useContext, useState } from "react";

// Define the context
interface MatchContextType {
    matchState: {
        pending_messages: any[];
    };
    setMatchState: (newState: State) => void;
    addPendingChat: (chat: any) => void;
}

interface State {
    pending_messages: any[];
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

// Define the custom hook
export const useMatchContext = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error("useMatchContext must be used within a MatchProvider");
    }
    return context;
};

// Define the provider
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

    const addPendingChat = (chat: any) => {
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
