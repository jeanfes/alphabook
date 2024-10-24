import { Carrousel } from '@/components/Carrousel/Carrousel';
import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Link, NavigationContainer } from '@react-navigation/native';
import { CategoryItem } from '@/components/Library/CategoryItem';
import { BookItem } from '@/components/Library/BookItem';
import { ReadBook } from '@/pages/ReadBook';
import { Notifications } from '@/pages/Notifications';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { useLibrary } from '@/hooks/books/useLibrary';
import { Book, Library } from '@/interfaces/library';
import { useBook } from '@/hooks/books/useBook';

const Stack = createNativeStackNavigator();

const Index = () => {
    const { user, userMemory } = useGlobalContext();
    const { getLibraries } = useLibrary();
    const [searchBook, setSearchBook] = useState<string>('');
    const [libraries, setLibraries] = useState<Library[]>([]);
    const [categories, setCategories] = useState<{ id: number; text: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>();
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const navigation = useNavigation<any>();

    const handleSelectCategory = (category: { id: number; text: string }) => {
        setSelectedCategory(category?.id);
        setSelectedBooks(libraries.find((b) => b.category.id === category?.id)?.items || []);
    };

    const handleSearchBook = useMemo(() => {
        if (searchBook) {
            const filteredBooks = libraries?.map((b) => b.items)?.flat()?.filter((b) => b.title.toLowerCase().includes(searchBook.toLowerCase()));
            setSelectedBooks(filteredBooks);
            setSelectedCategory(libraries[0].category?.id);
        } else {
            setSelectedBooks(libraries.find((b) => b.category?.id === selectedCategory)?.items || []);
        }
    }, [searchBook]);

    useEffect(() => {
        handleSearchBook;
    }, [searchBook]);

    const getAllData = useCallback(async () => {
        const libraries = await getLibraries();
        setLibraries(libraries);
        setCategories(libraries.map((b: Library) => b.category));
        setSelectedCategory(libraries[0]?.category?.id);
        setSelectedBooks(libraries[0]?.items);
    }, [getLibraries]);

    useEffect(() => {
        getAllData();
    }, []);

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
                        <Text style={stylesIndex.greetingsText}>Hello, {user?.name || userMemory?.name || 'User'}</Text>
                        <Text style={stylesIndex.subtitleGreetingsText}>What do you want to read today?</Text>
                    </View>
                    <View style={stylesIndex.homeContainer}>
                        <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
                    </View>
                    {categories?.length > 0 &&
                        <Carrousel
                            data={categories}
                            renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item?.id} />}
                        />
                    }
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('readbook', { book: item })} />} />
                    <View style={stylesIndex.recommended}>
                        <Text style={stylesIndex.textRecommended}>Recommended for you</Text>
                        <Carrousel data={libraries[2]?.items} renderItem={({ item }) => <BookItem book={item} />} />
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
    const { getLibraries } = useLibrary();
    const { saveBook, books: globalBooks } = useBook();
    const [books, setBooks] = useState<Book[]>([]);

    const handleFavoriteBook = (book: Book) => {
        console.log('book', book);
        saveBook({ ...book, favorite: !book?.favorite });
    };

    const getAllBooks = useCallback(async () => {
        const libraries = await getLibraries();
        setBooks(libraries?.map((b: Library) => b.items)?.flat());
    }, [getLibraries]);

    useEffect(() => {
        getAllBooks();
    }, []);

    useEffect(() => {
        setBooks(globalBooks);
    }, [globalBooks]);

    return (
        <NavigationContainer independent linking={linking}>
            <Stack.Navigator initialRouteName='Index'>
                <Stack.Screen
                    options={{
                        gestureDirection: 'horizontal',
                        customAnimationOnGesture: true,
                        headerShown: false,
                    }}
                    name='index'
                    component={Index}
                />
                <Stack.Screen
                    name='readbook'
                    component={ReadBook}
                    options={({ route }: any) => ({
                        headerTitle: '',
                        headerShadowVisible: false,
                        headerTitleStyle: {
                            color: '#000',
                            fontFamily: 'OpenSansBold',
                            fontSize: 20,
                        },
                        headerLeft: () => (
                            <Link to={'/index'}>
                                <IconArrowLeft />
                            </Link>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => {
                                handleFavoriteBook(route?.params?.book);
                            }}>
                                <IconSaved color={books.find((item) => item?.id === route?.params?.book?.id)?.favorite ? '#EB5757' : '#fff'} />
                            </Pressable>
                        ),
                    })}
                />
                <Stack.Screen
                    name='notifications'
                    component={Notifications}
                    options={{
                        headerTitle: 'Notifications',
                        headerTitleStyle: {
                            color: '#000',
                            fontFamily: 'OpenSansBold',
                            fontSize: 20,
                        },
                        headerLeft: () => (
                            <Link to={'/index'} style={{ marginRight: 30 }}>
                                <IconArrowLeft />
                            </Link>
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