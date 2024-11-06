import { Carrousel } from '@/components/Carrousel/Carrousel';
import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View, Platform, Button, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CategoryItem } from '@/components/Library/CategoryItem';
import { BookItem } from '@/components/Library/BookItem';
import { ReadBook } from '@/pages/ReadBook';
import { Notifications } from '@/pages/Notifications';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { Book } from '@/interfaces/library';
import { useBook } from '@/hooks/books/useBook';
import { dataCategories } from '@/utilities/data';
import { shortText } from '@/utilities/formatters';

const Stack = createNativeStackNavigator();

const Home = () => {
    const { user, userMemory } = useGlobalContext();
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
        <SafeAreaView
            style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
            }}
        >
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never">
                <View style={stylesIndex.container}>
                    <View style={stylesIndex.greetingsContainer}>
                        <Text style={stylesIndex.greetingsText}>Hello, {shortText(user?.name, 15) || shortText(userMemory?.name, 15) || 'User'}</Text>
                        <Text style={stylesIndex.subtitleGreetingsText}>What do you want to read today?</Text>
                    </View>
                    <View style={stylesIndex.homeContainer}>
                        <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
                    </View>
                    {dataCategories?.length > 0 && (
                        <Carrousel
                            data={dataCategories}
                            renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item?.id} />}
                        />
                    )}
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('HomeReadBook', { book: item })} />} />
                    <View style={stylesIndex.recommended}>
                        <Text style={stylesIndex.textRecommended}>Recommended for you</Text>
                        <Carrousel data={books} renderItem={({ item }) => <BookItem book={item} />} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default function StackHome() {
    const { saveBook, books } = useBook();
    const navigation = useNavigation<any>();

    const handleFavoriteBook = (book: Book) => {
        saveBook({ ...book, favorite: !book.favorite });
    };

    const getColorFavorite = async (book: Book) => {
        if (books) {
            return books.some((b: Book) => b.id === book.id && b.favorite);
        }
    };

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{
                    gestureDirection: 'horizontal',
                    customAnimationOnGesture: true,
                    headerShown: false,
                }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="HomeReadBook"
                component={ReadBook}
                options={({ route }: any) => ({
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        color: '#000000',
                        fontFamily: 'OpenSansBold',
                        fontSize: 20,
                    },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                            style={{ padding: 20, paddingLeft: 0 }}
                        >
                            <IconArrowLeft />
                        </Pressable>
                    ),
                    headerRight: () => {
                        const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
                        useEffect(() => {
                            const checkFavorite = async () => {
                                const favorite = await getColorFavorite(route?.params?.book);
                                setIsFavorite(favorite);
                            };
                            checkFavorite();
                        }, [route?.params?.book]);
                        return (
                            <Pressable
                                onPress={() => {
                                    handleFavoriteBook(route?.params?.book);
                                    setIsFavorite(!isFavorite);
                                }}
                            >
                                <IconSaved color={isFavorite ? '#EB5757' : '#fff'} />
                            </Pressable>
                        );
                    }
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: 'Notifications',
                    animation: Platform.select({
                        ios: 'simple_push',
                        android: 'slide_from_right',
                    }),
                    headerTitleStyle: {
                        color: '#000',
                        fontFamily: 'OpenSansSemiBold',
                        fontSize: 20,
                    },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={{ padding: 20, paddingLeft: 0 }}
                        >
                            <IconArrowLeft />
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const stylesIndex = StyleSheet.create({
    container: {
        flex: 1,
        gap: 25,
        paddingTop: 0,
        paddingLeft: 18,
        backgroundColor: '#FFFFFF',
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
