import { useEffect, useId } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface CarrouselProps {
    data: any;
    renderItem: ({ item }: { item: any }) => JSX.Element;
}

export const Carrousel = ({ data, renderItem }: CarrouselProps) => {
    const key = useId();

    return (
        <FlatList
            data={data}
            key={key}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={styles.lastSeparator} />}
        />
    );
};

const styles = StyleSheet.create({
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
    },
});
