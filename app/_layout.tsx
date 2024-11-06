import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from '@/context/GlobalContext';
import Navigator from './navigator';

const linking = {
    prefixes: ['alphabook://', 'https://alphabook.com'],
    config: {
        screens: {
            Landing: {
                path: 'landing',
                screens: {
                    Index: 'index',
                    SignIn: 'sign-in',
                    SignUp: 'sign-up',
                },
            },
            Main: {
                path: 'main',
                screens: {
                    Index: 'index',
                    Profile: 'profile',
                    Search: 'search',
                    Book: 'book',
                },
            },
        },
    },
};

export default function App() {

    return (
        <GlobalProvider>
            <NavigationContainer independent linking={linking}>
                <Navigator />
            </NavigationContainer>
        </GlobalProvider>
    );
}
