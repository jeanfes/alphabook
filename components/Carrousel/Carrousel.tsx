import { useId } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface CarrouselProps {
    data: any;
    renderItem: ({ item }: { item: any }) => JSX.Element;
    horizontal?: boolean;
}

export const Carrousel = ({ data, renderItem, horizontal = true }: CarrouselProps) => {
    const key = useId();
    const numColumns = horizontal ? 1 : 2;

    return (
        <FlatList
            data={data}
            key={key}
            contentContainerStyle={
                horizontal
                    ? {
                          flexGrow: 1,
                      }
                    : styles.container
            }
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
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignSelf: 'flex-start',
    },
    horizontalSeparator: {
        width: 12,
    },
    verticalSeparator: {
        height: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 340,
    },
    emptyText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        color: '#9D9D9D',
        textAlign: 'center',
    },
});
