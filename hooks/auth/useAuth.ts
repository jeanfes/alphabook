import { ActionAuth, SignIn, StateAuth } from "@/interfaces/auth";
import { useReducer } from "react";
import { useSecureStorage } from "../storage/useSecureStorage";

const initialStateAuth: StateAuth = {
    user: null,
    token: '',
};

const reducerAuthentication = (state: StateAuth, action: ActionAuth): StateAuth => {
    const { saveSecureData } = useSecureStorage();
    const { type } = action;
    switch (type) {
        case 'SIGN_IN':
            saveSecureData({ key: 'token', value: action.payload.token });
            return {
                ...state,
                user: action.payload,
                token: action.payload.token,
            };
        case 'SIGN_OUT':
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

    const handleSignIn = (payload: SignIn) => {
        dispatch({ type: 'SIGN_IN', payload });
    };

    const handleSignOut = () => {
        dispatch({ type: 'SIGN_OUT' });
    };

    // const handleSignUp = (payload: SignUp) => {
    //     dispatch({ type: 'SIGN_UP', payload });
    // };

    return {
        handleSignIn,
        handleSignOut,
        // handleSignUp,
        user,
        token,
    };
}