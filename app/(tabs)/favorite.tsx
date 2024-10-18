import { ViewContainer } from '@/components/ViewContainer/ViewContainer';
import { StyleSheet, Text } from 'react-native';

export default function Favorite() {
    return (
        <ViewContainer>
            <Text>
                Favorite
            </Text>
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
