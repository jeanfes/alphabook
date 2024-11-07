import { Carrousel } from "@/components/Carrousel/Carrousel";
import { Header } from "@/components/Header/Header";
import { BookItem } from "@/components/Library/BookItem";
import { CategoryItem } from "@/components/Library/CategoryItem";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useGlobalContext } from "@/context/GlobalContext";
import { useBook } from "@/hooks/books/useBook";
import { Book } from "@/interfaces/library";
import { dataCategories } from "@/utilities/data";
import { shortText } from "@/utilities/formatters";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
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
                <View style={stylesHome.container}>
                    <View style={stylesHome.greetingsContainer}>
                        <Text style={stylesHome.greetingsText}>Hello, {shortText(user?.name, 12) || shortText(userMemory?.name, 12) || 'User'}</Text>
                        <Text style={stylesHome.subtitleGreetingsText}>What do you want to read today?</Text>
                    </View>
                    <View style={stylesHome.homeContainer}>
                        <SearchBar search={searchBook} setSearch={setSearchBook} showMicro />
                    </View>
                    {dataCategories?.length > 0 && (
                        <Carrousel
                            data={dataCategories}
                            renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item?.id} />}
                        />
                    )}
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('HomeReadBook', { book: item })} />} />
                    <View style={stylesHome.recommended}>
                        <Text style={stylesHome.textRecommended}>Recommended for you</Text>
                        <Carrousel data={books} renderItem={({ item }) => <BookItem book={item} />} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const stylesHome = StyleSheet.create({
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
