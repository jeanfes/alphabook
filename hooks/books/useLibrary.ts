import { useEffect, useState } from "react";
import { useStorage } from "../storage/useStorage";
import { Library } from "@/interfaces/library";
import { customFetch } from "@/services/customFetch";
//import { useConnection } from "../connection/useConnection";
import { useGlobalContext } from "@/context/GlobalContext";
import { useBook } from "./useBook";

export const useLibrary = () => {
    const { token } = useGlobalContext();
    //const { isConnected } = useConnection();
    const isConnected = false;
    const { saveData, getData } = useStorage();
    const [loading, setLoading] = useState(false);

    const saveLibrary = async (libraries: Library[]) => {
        if (isConnected) {
            const response = await customFetch({
                endpoint: `library/save/`,
                method: 'POST',
                token: token,
            });
            if (response.success) {
                try {
                    await saveData({ key: 'libraries', value: libraries });
                } catch (error) {
                    console.log('Error saving book');
                }
            } else {
                console.log('Error saving book');
            }
        } else {
            try {
                await saveData({ key: 'libraries', value: libraries });
            } catch (error) {
                console.log('Error saving book');
            }
        }
    };

    const getLibraries = async () => {
        setLoading(true);
        try {
            const data = await getData({ key: 'libraries' });
            return data;
        } catch (error) {
            console.log('Error getting library');
        }
        setLoading(false);
    };

    const removeLibraries = async () => {
        try {
            await saveData({ key: 'libraries', value: [] });
        } catch (error) {
            console.log('Error removing library');
        }
    }

    useEffect(() => {
        getLibraries();
    }, []);

    return { loading, getLibraries, saveLibrary, removeLibraries };
}