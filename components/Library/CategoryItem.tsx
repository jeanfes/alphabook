import { memo } from 'react';
import { Pressable, Text } from 'react-native';

interface CategoryItemProps {
    onPress: (category: any) => void;
    category: {
        id: number;
        text: string;
    };
    selected: boolean;
}

export const CategoryItem = memo(({ category, selected, onPress }: CategoryItemProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                height: 40,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                paddingRight: 8,
                borderRadius: 8,
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: 'OpenSansRegular',
                    color: selected ? '#4f4f4f' : '#9D9D9D',
                }}
            >
                {category?.text}
            </Text>
        </Pressable>
    );
});
