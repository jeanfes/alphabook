import { ButtonDynamic } from "@/components/Buttons/ButtonDynamic";
import { Image, StyleSheet, Text, View } from "react-native";


export const ReadBook = ({ route }: any) => {
    const { book } = route?.params;

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                {book?.image ?
                    <Image
                        source={{
                            uri: book?.image,
                        }}
                        style={styles.image}
                    /> :
                    <Image
                        source={require('@/assets/images/NotFoundImage.png')}
                        style={styles.image}
                    />
                }
                <View style={styles.containerTextImage}>
                    <Text style={styles.title}>{book?.title}</Text>
                    <Text style={styles.text}>{book?.text}</Text>
                </View>
            </View>
            <View style={styles.containerOverview}>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overviewText}>You are reading {book?.title}</Text>
            </View>
            <ButtonDynamic
                design={2}
                title='Read'
                onPress={() => console.log('Read')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        gap: 30,
        backgroundColor: '#FFFFFF',
        padding: 18,
    },
    containerImage: {
        alignItems: 'center',
        gap: 20,
    },
    containerTextImage: {
        alignItems: 'center',
        gap: 4,
    },
    image: {
        width: 240,
        height: 360,
        objectFit: 'fill',
        borderRadius: 20,
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 20,
        fontWeight: '500',
    },
    text: {
        fontFamily: 'OpenSansRegular',
        fontSize: 16,
        color: '#9D9D9D',
        fontWeight: '400',
    },
    containerOverview: {
        gap: 10,
    },
    overviewTitle: {
        fontFamily: 'OpenSansBold',
        fontSize: 22,
        fontWeight: '500',
    },
    overviewText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 16,
        color: '#9D9D9D',
        fontWeight: '400',
    },
});