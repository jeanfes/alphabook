import { createNavigationContainerRef } from "@react-navigation/native";

type LandingParamList = {
    Index: undefined;
    Login: undefined;
    Register: undefined;
};

export const landingNavigationRef = createNavigationContainerRef<LandingParamList>();