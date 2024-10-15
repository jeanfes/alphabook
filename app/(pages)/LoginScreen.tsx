
import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';



type Props = StackScreenProps<any, 'Login'>;



const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
    return (
        <div>
            Login Screen
        </div>

    );

};


export default LoginScreen;
