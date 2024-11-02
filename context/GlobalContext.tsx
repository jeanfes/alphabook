import { useAuthentication } from '@/hooks/auth/useAuth';
import { SignIn, User } from '@/interfaces/auth';
import React, { createContext, useContext, ReactNode, FC } from 'react';

interface AuthContextProps {
    handleSignIn: (payload: SignIn) => void;
    handleSignOut: () => void;
    userMemory: User | undefined;
    tokenMemory: string | undefined;
    user: User | null;
    token: string;
    // handleSignUp: (payload: User) => void;
}

export const GlobalContext = createContext<AuthContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
    const { handleSignIn, handleSignOut, user, token, userMemory, tokenMemory } = useAuthentication();

    return (
        <GlobalContext.Provider value={{ handleSignIn, handleSignOut, user, token, userMemory, tokenMemory }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): AuthContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};