import { useId } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

interface CarrouselProps {
    data: any;
    renderItem: ({ item }: { item: any }) => JSX.Element;
}

const { width } = Dimensions.get('window');

export const Carrousel = ({ data, renderItem }: CarrouselProps) => {
    const key = useId();
    
    return (
        <FlatList
            data={data}
            key={key}
            keyExtractor={(item, index) => `${item.id}-${index}-${key}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={styles.lastSeparator} />}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Text
                        style={{
                            fontFamily: 'OpenSansRegular',
                            fontSize: 18,
                            color: '#9D9D9D',
                            textAlign: 'center',
                        }}
                    >
                        No hay elementos
                    </Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        width: 12,
    },
    lastSeparator: {
        width: 18,
    },
    emptyContainer: {
        width: width - 36,
        height: 320,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
