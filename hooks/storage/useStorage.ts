import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
    const saveData = async ({ key, value }: { key: string; value: any }) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log('jsonValue', jsonValue);
            await AsyncStorage.setItem(key, jsonValue);
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    };

    const getData = async ({ key }: { key: string }) => {
        try {
            const result = await AsyncStorage.getItem(key);
            return result != null ? JSON.parse(result) : [];
        } catch (error) {
            console.error('Error getting data:', error);
            return false;
        }
    };

    const removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing data:', error);
            return false;
        }
    };

    return { saveData, getData, removeData };
};
