import { Carrousel } from '@/components/Carrousel/Carrousel';
import { Header } from '@/components/Header/Header';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { AuthContext } from '@/context/AuthContext';
import { shortText } from '@/utilities/formatters';
import { useContext, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CategoryItemProps {
    onPress: (category: any) => void;
    category: {
        id: number;
        text: string;
    };
    selected: boolean;
}

const books = [
    {
        category: 'Fiction',
        items: [
            { id: 1, title: 'Catcher in the Rye', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg' },
            { id: 2, title: 'Someone Like You', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg' },
        ],
    },
    {
        category: 'Fantasy',
        items: [
            { id: 3, title: 'The Last of Rest', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg' },
            { id: 4, title: 'Journey to the Unknown', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s' },
        ],
    },
    {
        category: 'Mystery',
        items: [
            { id: 5, title: 'Mystery of the Old House', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg' },
            { id: 6, title: 'Adventures in Wonderland', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp' },
        ],
    },
];

const CategoryItem = ({ category, selected, onPress }: CategoryItemProps) => {
    return (
        <Pressable onPress={onPress} style={{ backgroundColor: 'transparent', paddingRight: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontFamily: 'OpenSansRegular', color: selected ? '#000000' : '#9D9D9D' }}>{category?.text}</Text>
        </Pressable>
    );
}

const BookItem = ({ book }: any) => {
    return (
        <View>
            <Image source={{ uri: book?.image }} style={stylesBookItem.image} />
            <View style={stylesBookItem.textContainer}>
                <Text style={{ fontSize: 16, fontFamily: 'OpenSansBold', color: '#000000' }}>{shortText(book?.title, 16)}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'OpenSansRegular', color: '#9D9D9D' }}>{shortText(book?.text, 20)}</Text>
            </View>
        </View>
    );
}

export default function Index() {
    const { user } = useContext(AuthContext);
    const [selectedCategory, setSelectedCategory] = useState(books[0].category);
    const [selectedBooks, setSelectedBooks] = useState(books[0].items);
    const categories = books.map((b) => b.category);

    const handleSelectCategory = (category: any) => {
        setSelectedCategory(category);
        setSelectedBooks(books.find((b) => b.category === category.text)?.items || []);
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <Header />
            <ScrollView>
                <View style={stylesIndex.container}>
                    <View style={stylesIndex.greetingsContainer}>
                        <Text style={stylesIndex.greetingsText}>Hello, {user?.name || 'User'}</Text>
                        <Text style={stylesIndex.subtitleGreetingsText}>What do you want to read today?</Text>
                    </View>
                    <View style={stylesIndex.homeContainer}>
                        <SearchBar showMicro />
                    </View>
                    <Carrousel data={categories} renderItem={({ item }) => <CategoryItem onPress={() => handleSelectCategory(item)} category={item} selected={selectedCategory === item} />} />
                    <Carrousel data={selectedBooks} renderItem={({ item }) => <BookItem book={item} />} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const stylesIndex = StyleSheet.create({
    container: {
        gap: 30,
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
    separator: {
        width: 12,
    },
    lastSeparator: {
        width: 18,
    }
});