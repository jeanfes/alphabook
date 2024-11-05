import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ViewContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ViewContainer = ({ children, style }: ViewContainerProps) => {
    return (
        <SafeAreaView style={[styles.viewContainer, style]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never" contentContainerStyle={styles.scrollView}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
    },
});
