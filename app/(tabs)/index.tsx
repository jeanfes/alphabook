import { Carrousel } from '@/components/Carrousel/Carrousel';
import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { AuthContext } from '@/context/AuthContext';
import { shortText } from '@/utilities/formatters';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { books } from '@/utilities/data';

interface CategoryItemProps {
    onPress: (category: any) => void;
    category: {
        id: number;
        text: string;
    };
    selected: boolean;
}

const CategoryItem = ({ category, selected, onPress }: CategoryItemProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                height: 40,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                paddingRight: 8,
                borderRadius: 8,
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: 'OpenSansRegular',
                    color: selected ? '#000000' : '#9D9D9D',
                }}
            >
                {category?.text}
            </Text>
        </Pressable>
    );
};

const BookItem = ({ book }: any) => {
    return (
        <View style={stylesBookItem.bookItem}>
            <Image
                source={{
                    uri: book?.image,
                }}
                style={stylesBookItem.image}
            />
            <View style={stylesBookItem.textContainer}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'OpenSansBold',
                        color: '#000000',
                    }}
                >
                    {shortText(book?.title, 16)}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: 'OpenSansRegular',
                        color: '#9D9D9D',
                    }}
                >
                    {shortText(book?.text, 20)}
                </Text>
            </View>
        </View>
    );
};

export default function Index() {
    const { user } = useContext(AuthContext);
    const scrollViewRef = useRef<ScrollView>(null);
    const [searchBook, setSearchBook] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(books[0].category.id);
    const [selectedBooks, setSelectedBooks] = useState(books[0].items);

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
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [searchBook]);

    return (
        <SafeAreaView
            style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
            }}
        >
            <Header />
            <ScrollView ref={scrollViewRef}>
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
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} />} />
                    <View style={stylesIndex.recommended}>
                        <Text style={stylesIndex.textRecommended}>Recommended for you</Text>
                        <Carrousel data={books[2].items} renderItem={({ item }) => <BookItem book={item} />} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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

const stylesBookItem = StyleSheet.create({
    textContainer: {
        padding: 4,
        marginTop: 6,
    },
    image: {
        width: 170,
        height: 270,
        borderRadius: 20,
    },
    bookItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 6,
    },
});
