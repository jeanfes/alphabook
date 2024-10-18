import { StyleSheet, TextInput, View } from "react-native";
import { IconMicro, IconSearch } from "@/assets/icons/IconsSearchBar";
import { useState } from "react";

interface SearchBarProps {
    showMicro: boolean;
}

export const SearchBar = ({ showMicro }: SearchBarProps) => {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.container}>
            <IconSearch />
            <TextInput
                style={styles.input}
                placeholder="Search here"
                value={search}
                onChangeText={setSearch}
            />
            {showMicro && (
                <View style={styles.microphoneContainer}>
                    <IconMicro />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#8E8E93',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 18,
        paddingRight: 12,
        borderRadius: 14,
        gap: 18,
    },
    input: {
        flex: 1,
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        color: '#000',
    },
    microphoneContainer: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        padding: 12,
    },
});