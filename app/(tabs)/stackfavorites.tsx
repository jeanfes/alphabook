
import { useLibrary } from '@/hooks/books/useLibrary';
import { Book, Library } from '@/interfaces/library';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReadBook } from '@/pages/ReadBook';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { useBook } from '@/hooks/books/useBook';
import { Favorites } from '@/pages/Favorites';

const Stack = createNativeStackNavigator();

export default function StackFavorites() {
    const { getLibraries } = useLibrary();
    const { saveBook, books: globalBooks } = useBook();
    const [books, setBooks] = useState<Book[]>([]);
    const navigation = useNavigation<any>();

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
        <Stack.Navigator initialRouteName="Favorites">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Favorites"
                component={Favorites}
            />
            <Stack.Screen
                name="FavoritesReadBook"
                component={ReadBook}
                options={({ route }: any) => ({
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Favorites');
                            }}
                            style={{ padding: 20, paddingLeft: 0 }}
                        >
                            <IconArrowLeft />
                        </Pressable>
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
    );
}
