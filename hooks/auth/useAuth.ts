import { ActionAuth, SignIn, StateAuth, User } from "@/interfaces/auth";
import { useEffect, useReducer, useState } from "react";
import { useSecureStorage } from "../storage/useSecureStorage";

const initialStateAuth: StateAuth = {
    user: null,
    token: '',
    loading: false,
};

const reducerAuthentication = (state: StateAuth, action: ActionAuth): StateAuth => {
    const { saveSecureData, deleteSecureData } = useSecureStorage();
    const { type } = action;
    switch (type) {
        case 'SIGN_IN':
            saveSecureData({ key: 'token', value: action.payload.token });
            saveSecureData({ key: 'user', value: action.payload });
            return {
                ...state,
                user: action.payload,
                token: action.payload.token,
            };
        case 'SIGN_OUT':
            deleteSecureData({ key: 'token' });
            deleteSecureData({ key: 'user' });
            return {
                ...state,
                user: null,
                token: '',
            };
        case 'UPDATE_USER':
            saveSecureData({ key: 'user', value: action.payload });
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
export { initialStateAuth, reducerAuthentication };

export const useAuthentication = () => {
    const [{ user, token, loading }, dispatch] = useReducer(reducerAuthentication, initialStateAuth);
    const [userMemory, setUserMemory] = useState<User | null>();
    const [tokenMemory, setTokenMemory] = useState<string>();
    const { getSecureData } = useSecureStorage();
    
    const handleSignIn = async (payload: SignIn) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Simula un tiempo de inicio de sesion de 500ms
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch({ type: 'SIGN_IN', payload });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleSignOut = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Logica de cierre de sesion
            dispatch({ type: 'SIGN_OUT' });
            setUserMemory(null);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleUpdateUser = async (payload: User) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Logica de actualización de usuario real
            dispatch({ type: 'UPDATE_USER', payload });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const getUserMemory = async () => {
        const userMemory = await getSecureData({ key: 'user' });
        setUserMemory(userMemory);
    };

    const getToken = async () => {
        const tokenMemory = await getSecureData({ key: 'token' });
        setTokenMemory(tokenMemory);
    };

    useEffect(() => {
        getUserMemory();
    }, []);

    useEffect(() => {
        getToken();
    }, []);

    return {
        handleSignIn,
        handleSignOut,
        handleUpdateUser,
        tokenMemory,
        userMemory,
        loading,
        user,
        token,
    };
}