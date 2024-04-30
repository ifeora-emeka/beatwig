import React, { createContext, useContext, useEffect, useState } from "react";
import { UserData } from "@/types/auth.types";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import AppLoading from "@/components/AppLoading";


interface AuthContextType {
    user: any;
    auth_loading: boolean;
    show_login: boolean;
}

interface AuthContextValueType extends AuthContextType {
    setAuthContextState: (newState: Partial<AuthContextType>) => void;
    getAuthDependencies: (id: string) => Promise<UserData>;
    createNewUser: (data: UserData) => void;
}

const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: any) => {
    const [state, setState] = useState<AuthContextType>({
        user: null,
        auth_loading: true,
        show_login: false,
    });

    const setAuthContextStateWrapper = (newState: Partial<AuthContextType>) => {
        console.log("SETTING AUTH STATE::", newState);
        setState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const getAuthDependencies = async (user_id: string): Promise<UserData> => {
        try {
            setAuthContextStateWrapper({ auth_loading: true });
            console.log("GETTING USER DEPENDENCIES::", user_id);
            const userRef = doc(db, dbCollectionName.USERS, user_id);
            const userSnapshot = await getDoc(userRef);
            let theUser = {
                ...(userSnapshot.data() as UserData),
                _id: userSnapshot.id,
                ref: userSnapshot.ref,
            };

            setAuthContextStateWrapper({ user: theUser, auth_loading: false });

            return Promise.resolve(theUser);
        } catch (error) {
            setAuthContextStateWrapper({ auth_loading: false });
            console.error("Error getting or creating user data:", error);
            return Promise.reject(error);
        }
    };

    const createNewUser = async (userData: UserData): Promise<UserData> => {
        console.log("CREATING NEW USER::", userData);
        const userRef = doc(db, dbCollectionName.USERS, userData._id);
        const newUserData: UserData = {
            _id: userData._id,
            username: userData.username,
            display_name: userData.display_name,
            email: userData.email,
            provider: userData.provider,
            avatar_url: userData.avatar_url,
            last_seen: Timestamp.now(),
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await setDoc(userRef, newUserData);
        const userSnapshot = await getDoc(userRef);

        const theUser = {
            ...newUserData,
            _id: userData._id,
            ref: userSnapshot.ref,
        } as UserData;

        setAuthContextStateWrapper({ user: theUser });
        return theUser;
    };

    useEffect(() => {
        if(state.user && !state.user?.display_name){
            setAuthContextStateWrapper({ show_login: true })
        }
    },[state.user])

    return (
        <>
            <AuthContext.Provider
                value={{
                    ...state,
                    setAuthContextState: setAuthContextStateWrapper,
                    getAuthDependencies,
                    createNewUser,
                }}
            >
                {state.auth_loading && <AppLoading />}
                {children}
            </AuthContext.Provider>
        </>
    );
};
