import { Carrousel } from "@/components/Carrousel/Carrousel";
import { BookItem } from "@/components/Library/BookItem";
import { CategoryItem } from "@/components/Library/CategoryItem";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useBook } from "@/hooks/books/useBook";
import { Book } from "@/interfaces/library";
import { dataCategories } from "@/utilities/data";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Favorites = () => {
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
            <StatusBar backgroundColor={'#FFFFFF'} barStyle="light-content" />
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
                renderItem={({ item }) => <BookItem book={item} onPress={() => navigation.navigate('FavoritesReadBook', { book: item })} />}
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
        paddingTop: 0,
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