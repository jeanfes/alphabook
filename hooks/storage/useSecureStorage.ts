import { Storage } from '@/interfaces/storage';
import * as SecureStore from 'expo-secure-store';

export const useSecureStorage = () => {

    const saveSecureData = async ({ key, value }: Storage): Promise<boolean> => {
        try {
            const jsonValue = JSON.stringify(value);
            await SecureStore.setItemAsync(key, jsonValue);
            const storedValue = await SecureStore.getItemAsync(key);
            if (storedValue === jsonValue) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al guardar los datos seguros:', error);
            return false;
        }
    };

    const deleteSecureData = async ({ key }: { key: string }) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error al eliminar los datos seguros:', error);
        }
    }

    const getSecureData = async ({ key }: { key: string }) => {
        try {
            const result = await SecureStore.getItemAsync(key);
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Error al recuperar los datos seguros:', error);
        }
    };

    return { saveSecureData, deleteSecureData, getSecureData };
};
