import { shortText } from "@/utilities/formatters";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface BookItemProps {
    book: {
        title: string;
        text: string;
        image: string;
    };
    onPress?: () => void;
}

export const BookItem = ({ book, onPress }: BookItemProps) => {
    return (
        <Pressable onPress={onPress} style={stylesBookItem.bookItem}>
            {book?.image ? (
                <Image
                    source={{ uri: book?.image }}
                    style={stylesBookItem.image}
                />
            ) : (
                <Image
                    source={require('@/assets/images/NotFoundImage.png')}
                    style={stylesBookItem.image}
                />
            )}
            <View style={stylesBookItem.textContainer}>
                <Text style={stylesBookItem.title}>
                    {shortText(book?.title, 16)}
                </Text>
                <Text style={stylesBookItem.text}>
                    {shortText(book?.text, 20)}
                </Text>
            </View>
        </Pressable>
    );
};

const stylesBookItem = StyleSheet.create({
    textContainer: {
        padding: 4,
        marginTop: 6,
    },
    image: {
        width: 170,
        height: 270,
        borderRadius: 6,
        objectFit: 'fill',
    },
    bookItem: {
        width: 170,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 6,
        margin: 6,
    },
    title: {
        fontSize: 16,
        fontFamily: 'OpenSansBold',
        color: '#000000',
    },
    text: {
        fontSize: 12,
        fontFamily: 'OpenSansRegular',
        color: '#9D9D9D',
    },
});