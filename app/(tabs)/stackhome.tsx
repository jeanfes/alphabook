import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReadBook } from '@/pages/ReadBook';
import { Notifications } from '@/pages/Notifications';
import { IconArrowLeft } from '@/assets/icons/IconsHeader';
import { IconSaved } from '@/assets/icons/IconsTabLayout';
import { Book } from '@/interfaces/library';
import { useBook } from '@/hooks/books/useBook';
import { Home } from '@/pages/Home';

const Stack = createNativeStackNavigator();

export default function StackHome() {
    const { saveBook, books } = useBook();
    const navigation = useNavigation<any>();

    const handleFavoriteBook = (book: Book) => {
        saveBook({ ...book, favorite: !book.favorite });
    };

    const getColorFavorite = async (book: Book) => {
        if (books) {
            return books.some((b: Book) => b.id === book.id && b.favorite);
        }
    };

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{
                    gestureDirection: 'horizontal',
                    customAnimationOnGesture: true,
                    headerShown: false,
                }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="HomeReadBook"
                component={ReadBook}
                options={({ route }: any) => ({
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        color: '#000000',
                        fontFamily: 'OpenSansBold',
                        fontSize: 20,
                    },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                            style={{ padding: 20, paddingLeft: 0 }}
                        >
                            <IconArrowLeft />
                        </Pressable>
                    ),
                    headerRight: () => {
                        const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
                        useEffect(() => {
                            const checkFavorite = async () => {
                                const favorite = await getColorFavorite(route?.params?.book);
                                setIsFavorite(favorite);
                            };
                            checkFavorite();
                        }, [route?.params?.book]);
                        return (
                            <Pressable
                                onPress={() => {
                                    handleFavoriteBook(route?.params?.book);
                                    setIsFavorite(!isFavorite);
                                }}
                            >
                                <IconSaved color={isFavorite ? '#EB5757' : '#fff'} />
                            </Pressable>
                        );
                    }
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: 'Notifications',
                    animation: Platform.select({
                        ios: 'simple_push',
                        android: 'slide_from_right',
                    }),
                    headerTitleStyle: {
                        color: '#000',
                        fontFamily: 'OpenSansSemiBold',
                        fontSize: 20,
                    },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={{ padding: 20, paddingLeft: 0 }}
                        >
                            <IconArrowLeft />
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
