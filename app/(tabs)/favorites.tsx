import { Carrousel } from '@/components/Carrousel/Carrousel';
import { BookItem } from '@/components/Library/BookItem';
import { CategoryItem } from '@/components/Library/CategoryItem';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLibrary } from '@/hooks/books/useLibrary';
import { Book, Library } from '@/interfaces/library';
import { Link, NavigationContainer } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReadBook } from '@/pages/ReadBook';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { useBook } from '@/hooks/books/useBook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dataCategories } from '@/utilities/data';

const Stack = createNativeStackNavigator();

const Favorites = () => {
    const { books } = useBook();
    const [searchBook, setSearchBook] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(books ? dataCategories[0]?.id : null);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const navigation = useNavigation<any>();

    const handleSelectCategory = (category: { id: number; text: string }) => {
        if (category.id === 0) {
            setSelectedBooks(books);
            setSelectedCategory(dataCategories[0]?.id);
            setSearchBook('');
            return;
        }
        setSelectedBooks(books.filter((b) => b.categoryId === category.id));
        setSelectedCategory(category?.id);
        setSearchBook('');
    };

    const handleSearchBook = useMemo(() => {
        if (searchBook) {
            const filteredBooks = books.filter((b) => b.title.toLowerCase().includes(searchBook.toLowerCase()));
            setSelectedBooks(filteredBooks);
            setSelectedCategory(dataCategories[0]?.id);
        } else {
            setSelectedBooks(books);
        }
    }, [searchBook]);

    useEffect(() => {
        handleSearchBook;
    }, [searchBook]);

    useEffect(() => {
        if (books) {
            setSelectedBooks(books);
        }
    }, [books]);

    return (
        <SafeAreaView style={stylesFavorites.mainContainer}>
            <View style={stylesFavorites.titlePage}>
                <Text style={stylesFavorites.titlePageText}>Favorites</Text>
            </View>
            <View style={stylesFavorites.searchBar}>
                <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
            </View>
            <View>
                {dataCategories?.length > 0 && (
                    <Carrousel
                        data={dataCategories}
                        renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item?.id} />}
                    />
                )}
            </View>
            <Carrousel
                horizontal={false}
                data={selectedBooks}
                renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('readbook', { book: item })} />}
            />
        </SafeAreaView>
    );
};

const stylesFavorites = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
        gap: 15,
        padding: 18,
        paddingTop: 8,
        paddingBottom: 0,
    },
    titlePage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 4,
    },
    titlePageText: {
        fontFamily: 'OpenSansSemiBold',
        fontSize: 24,
        color: '#000000',
    },
    searchBar: {
        paddingBottom: 4,
    },
});

export default function StackFavorites() {
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
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName="favorites">
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="favorites"
                    component={Favorites}
                />
                <Stack.Screen
                    name="readbook"
                    component={ReadBook}
                    options={({ route }: any) => ({
                        headerTitle: '',
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <Link to={'/favorites'} style={{ paddingRight: 30 }}>
                                <IconArrowLeft />
                            </Link>
                        ),
                        headerRight: () => (
                            <Pressable
                                onPress={() => {
                                    handleFavoriteBook(route?.params?.book);
                                }}
                            >
                                <IconSaved color={books.find((item) => item?.id === route?.params?.book?.id)?.favorite ? '#EB5757' : '#fff'} />
                            </Pressable>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
