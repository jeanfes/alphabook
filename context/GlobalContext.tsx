import { useAuthentication } from '@/hooks/auth/useAuth';
import { SignIn, User } from '@/interfaces/auth';
import React, { createContext, useContext, ReactNode, FC } from 'react';

interface AuthContextProps {
    handleSignIn: (payload: SignIn) => void;
    handleSignOut: () => void;
    handleUpdateUser: (payload: User) => void;
    userMemory: User | null | undefined;
    tokenMemory: string | undefined;
    user: User | null;
    token: string;
    loading: boolean;
}

export const GlobalContext = createContext<AuthContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
    const { handleSignIn, handleSignOut, handleUpdateUser, user, token, userMemory, tokenMemory, loading } = useAuthentication();

    return (
        <GlobalContext.Provider value={{ handleSignIn, handleSignOut, handleUpdateUser, user, token, userMemory, tokenMemory, loading }}>
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