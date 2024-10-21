import { Carrousel } from '@/components/Carrousel/Carrousel';
import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { books } from '@/utilities/data';
import { useNavigation } from 'expo-router';
import { Link, NavigationContainer } from '@react-navigation/native';
import { CategoryItem } from '@/components/Library/CategoryItem';
import { BookItem } from '@/components/Library/BookItem';
import { ReadBook } from '@/pages/ReadBook';
import { Notifications } from '@/pages/Notifications';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';

const Stack = createNativeStackNavigator();

const Index = () => {
    const { user } = useContext(AuthContext);
    const [searchBook, setSearchBook] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(books[0].category.id);
    const [selectedBooks, setSelectedBooks] = useState(books[0].items);
    const navigation = useNavigation<any>();

    const categories = books.map((b) => b.category);

    const handleSelectCategory = (category: { id: number; text: string }) => {
        setSelectedCategory(category?.id);
        setSelectedBooks(books.find((b) => b.category.id === category?.id)?.items || []);
    };

    const handleSearchBook = useMemo(() => {
        if (searchBook) {
            const filteredBooks = books
                .map((b) => b.items)
                .flat()
                .filter((b) => b.title.toLowerCase().includes(searchBook.toLowerCase()));
            setSelectedBooks(filteredBooks);
            setSelectedCategory(books[0].category.id);
        } else {
            setSelectedBooks(books.find((b) => b.category.id === selectedCategory)?.items || []);
        }
    }, [searchBook]);

    useEffect(() => {
        handleSearchBook;
    }, [searchBook]);

    return (
        <SafeAreaView
            style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
            }}
        >
            <Header />
            <ScrollView>
                <View style={stylesIndex.container}>
                    <View style={stylesIndex.greetingsContainer}>
                        <Text style={stylesIndex.greetingsText}>Hello, {user?.name || 'User'}</Text>
                        <Text style={stylesIndex.subtitleGreetingsText}>What do you want to read today?</Text>
                    </View>
                    <View style={stylesIndex.homeContainer}>
                        <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
                    </View>
                    <Carrousel
                        data={categories}
                        renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item.id} />}
                    />
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('readbook', { book: item })} />} />
                    <View style={stylesIndex.recommended}>
                        <Text style={stylesIndex.textRecommended}>Recommended for you</Text>
                        <Carrousel data={books[2].items} renderItem={({ item }) => <BookItem book={item} />} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const linking = {
    prefixes: ['https://alphabook.com', 'alphabook://'],
    config: {
        screens: {
            index: 'index',
            readbook: 'readbook/:id',
        },
    },
};

export default function StackIndex() {
    return (
        <NavigationContainer independent linking={linking}>
            <Stack.Navigator initialRouteName='Index'>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }} name="index" component={Index} />
                <Stack.Screen
                    name="readbook"
                    component={ReadBook}
                    options={{
                        headerTitle: "",
                        headerLeft: () => (
                            <Link to={"/index"}>
                                <IconArrowLeft />
                            </Link>
                        ),
                        headerRight: () => (
                            <Link to={"/index"}>
                                <IconArrowLeft />
                            </Link>
                        ),
                    }}
                />
                <Stack.Screen
                    name="notifications"
                    component={Notifications}
                    options={{
                        headerTitle: "",
                        headerLeft: () => (
                            <></>
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const stylesIndex = StyleSheet.create({
    container: {
        flex: 1,
        gap: 25,
        paddingTop: 4,
        paddingLeft: 18,
        backgroundColor: '#fff',
    },
    greetingsContainer: {
        gap: 8,
        paddingRight: 18,
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
    homeContainer: {
        paddingRight: 18,
    },
    recommended: {
        flexDirection: 'column',
        gap: 25,
        paddingBottom: 15,
    },
    textRecommended: {
        fontSize: 18,
        fontFamily: 'OpenSansBold',
        color: '#000000',
    },
});