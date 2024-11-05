import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ButtonProfileProps {
    onPress: () => void;
    icon: JSX.Element;
    text: string;
    value?: string;
}

export const ButtonProfile = ({ onPress, icon, text, value }: ButtonProfileProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => {
                return [
                    {
                        backgroundColor: pressed ? '#e0e0e0' : 'white',
                    },
                    stylesButtonProfile.buttonProfile,
                ];
            }}
        >
            <View style={stylesButtonProfile.containerText}>
                <Text style={stylesButtonProfile.Text}>{text}</Text>
                {value && <Text style={stylesButtonProfile.Value}>{value}</Text>}
            </View>
            {icon}
        </Pressable>
    );
};

const stylesButtonProfile = StyleSheet.create({
    buttonProfile: {
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#e0e0e0',
    },
    containerText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    Text: {
        fontSize: 17,
        color: '#4f4f4f',
        fontFamily: 'OpenSansBold',
    },
    Value: {
        fontSize: 15,
        color: '#4f4f4f',
        fontFamily: 'OpenSansRegular',
    },
});
