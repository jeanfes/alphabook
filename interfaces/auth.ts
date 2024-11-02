export interface User {
    id?: string;
    password: string;
    username: string;
    name: string;
    email: string;
    image: string;
    token?: string;
}

export interface SignIn {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    image: string;
    token: string;
}

// export interface SignUp {
//     name: string;
//     username: string;
//     email: string;
//     password: string;
//     confirmPassword?: string;
// }

export interface StateAuth {
    user: User | null;
    token: string;
}

export type ActionAuth =
    | { type: 'SIGN_IN', payload: SignIn }
    // | { type: 'SIGN_UP', payload: SignUp }
    | { type: 'SIGN_OUT' };