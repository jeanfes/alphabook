import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const { user } = useContext(AuthContext);

    return (
        <ViewContainer>
            <Header />
            <View style={styles.container}>
                <View style={styles.greetingsContainer}>
                    <Text style={styles.greetingsText}>Hello, {user?.name || 'User'}</Text>
                    <Text style={styles.subtitleGreetingsText}>What do you want to read today?</Text>
                </View>
                <SearchBar showMicro/>
            </View>
        </ViewContainer >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
        paddingTop: 4,
        paddingLeft: 18,
        paddingRight: 18,
        backgroundColor: '#fff',
    },
    greetingsContainer: {
        gap: 8,
    },
    greetingsText: {
        fontSize: 26,
        color: '#EB5757',
        fontFamily: 'OpenSansBold',
    },
    subtitleGreetingsText: {
        fontSize: 18,
        color: '#4f4f4f',
        fontFamily: 'OpenSansRegular',
    },
});
