import { ActionAuth, SignIn, StateAuth, User } from "@/interfaces/auth";
import { useEffect, useReducer, useState } from "react";
import { useSecureStorage } from "../storage/useSecureStorage";

const initialStateAuth: StateAuth = {
    user: null,
    token: '',
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
        // case 'SIGN_UP':
        //     return {
        //         ...state,
        //         user: action.payload,
        //     };
        default:
            return state;
    }
};

export { initialStateAuth, reducerAuthentication };

export const useAuthentication = () => {
    const [{ user, token }, dispatch] = useReducer(reducerAuthentication, initialStateAuth);
    const [userMemory, setUserMemory] = useState<User>();

    const handleSignIn = (payload: SignIn) => {
        dispatch({ type: 'SIGN_IN', payload });
    };

    const handleSignOut = () => {
        dispatch({ type: 'SIGN_OUT' });
    };

    const { getSecureData } = useSecureStorage();

    const getUserMemory = async () => {
        const userMemory = await getSecureData({ key: 'user' });
        setUserMemory(userMemory);
    };

    const getToken = async () => {
        const tokenMemory = await getSecureData({ key: 'token' });
        return tokenMemory;
    }

    useEffect(() => {
        getUserMemory();
    }, []);

    // const handleSignUp = (payload: SignUp) => {
    //     dispatch({ type: 'SIGN_UP', payload });
    // };

    return {
        handleSignIn,
        handleSignOut,
        // handleSignUp,
        userMemory,
        user,
        token,
    };
}