import { createNavigationContainerRef } from '@react-navigation/native';

type TabParamList = {
    Home: undefined;
    Favorites: undefined;
    Alpha: undefined;
    Settings: undefined;
    Profile: undefined;
};

export const tabNavigationRef = createNavigationContainerRef<TabParamList>();