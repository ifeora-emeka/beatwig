import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    user: any; // Adjust the type of user as per your application's user object
    auth_loading: boolean;
}

interface AuthContextValueType extends AuthContextType {
    setAuthContextState: (newState: Partial<AuthContextType>) => void;
}

const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }:any) => {
    const [state, setState] = useState<AuthContextType>({
        user: null,
        auth_loading: true, // Adjust the initial value as needed
    });

    const setAuthContextStateWrapper = (newState: Partial<AuthContextType>) => {
        setState(prevState => ({
            ...prevState,
            ...newState,
        }));
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            setAuthContextState: setAuthContextStateWrapper
        }}>
            {children}
        </AuthContext.Provider>
    );
};
