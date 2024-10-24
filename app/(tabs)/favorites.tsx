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
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReadBook } from '@/pages/ReadBook';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { useBook } from '@/hooks/books/useBook';

const Stack = createNativeStackNavigator();

const Favorites = () => {
    const { getLibraries } = useLibrary();
    const [searchBook, setSearchBook] = useState<string>('');
    const [libraries, setLibraries] = useState<Library[]>([]);
    const [categories, setCategories] = useState<{ id: number; text: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const navigation = useNavigation<any>();

    const handleSelectCategory = (category: { id: number; text: string }) => {
        setSelectedCategory(category?.id);
        const favoriteBooks = libraries.find((b) => b.category.id === category?.id)?.items.filter((book) => book.favorite) || [];
        setSelectedBooks(favoriteBooks);
    };

    const handleSearchBook = useMemo(() => {
        return () => {
            if (searchBook) {
                const filteredBooks = libraries
                    ?.map((b) => b.items)
                    ?.flat()
                    ?.filter((b) => b.favorite && b.title.toLowerCase().includes(searchBook.toLowerCase()));
                setSelectedBooks(filteredBooks || []);
                setSelectedCategory(libraries[0]?.category?.id || null);
            } else {
                const favoriteBooks = libraries.find((b) => b.category?.id === selectedCategory)?.items.filter((book) => book.favorite) || [];
                setSelectedBooks(favoriteBooks);
            }
        };
    }, [searchBook, libraries, selectedCategory]);

    useEffect(() => {
        handleSearchBook();
    }, [searchBook, handleSearchBook]);

    const getAllData = useCallback(async () => {
        const libraries = await getLibraries();
        const favoriteLibraries = libraries.map((library: Library) => ({
            ...library,
            items: library.items.filter((book) => book.favorite),
        })).filter((library: Library) => library.items.length > 0);
        setLibraries(favoriteLibraries);
        setCategories(favoriteLibraries.map((b: Library) => b.category));
        setSelectedCategory(favoriteLibraries[0]?.category?.id || null);
        setSelectedBooks(favoriteLibraries[0]?.items || []);
    }, [getLibraries]);

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View>
                <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
            </View>
            {categories?.length > 0 &&
                <Carrousel
                    data={categories}
                    renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item?.id} />}
                />
            }
            <Carrousel horizontal={false} data={selectedBooks} renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('readbook', { book: item })} />} />
        </View>
    );
}

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
            <Stack.Navigator initialRouteName='favorites'>
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
                        headerTitle: "",
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <Link to={"/favorites"}>
                                <IconArrowLeft />
                            </Link>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => {
                                handleFavoriteBook(route?.params?.book);
                            }}>
                                <IconSaved color={books.find((item) => item?.id === route?.params?.book?.id)?.favorite ? "#EB5757" : "#fff"} />
                            </Pressable>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        gap: 15,
        padding: 18,
        paddingTop: 8,
    },
});
