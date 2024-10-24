import { useId } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

interface CarrouselProps {
    data: any;
    renderItem: ({ item }: { item: any }) => JSX.Element;
    horizontal?: boolean;
}

const { width } = Dimensions.get('window');

export const Carrousel = ({ data, renderItem, horizontal = true }: CarrouselProps) => {
    const key = useId();
    const itemWidth = 205;
    const numColumns = horizontal ? 1 : Math.floor(width / itemWidth);

    return (
        <FlatList
            data={data}
            key={key}
            contentContainerStyle={horizontal ? {} : styles.container}
            numColumns={numColumns}
            keyExtractor={(item, index) => `${item.id}-${index}-${key}`}
            renderItem={renderItem}
            horizontal={horizontal}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={horizontal ? styles.horizontalSeparator : styles.verticalSeparator} />}
            ListFooterComponent={() => <View style={horizontal ? styles.horizontalSeparator : styles.verticalSeparator} />}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay elementos</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    horizontalSeparator: {
        width: 12,
    },
    verticalSeparator: {
        height: 12,
    },
    emptyContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    emptyText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        color: '#9D9D9D',
        textAlign: 'center',
    },
});