import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { useLibrary } from '@/hooks/books/useLibrary';
import { StyleSheet, Text } from 'react-native';

export default function Favorites() {
    const { books } = useLibrary();

    return (
        <ViewContainer>
            <Text>Favorite</Text>
            {
                books.filter((book) => book.favorite).map((book) => (
                    <Text key={book.id}>{book.title}</Text>
                ))
            }
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
