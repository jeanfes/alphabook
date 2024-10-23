import { useEffect, useState } from "react";
import { useStorage } from "../storage/useStorage";
import { Book, Category, Library } from "@/interfaces/library";
import { customFetch } from "@/services/customFetch";
import { datalibrary } from "@/utilities/data";
import { useConnection } from "../connection/useConnection";
import { useGlobalContext } from "@/context/GlobalContext";
import { useBook } from "./useBook";

export const useLibrary = () => {
    const [libraries, setLibraries] = useState<Library[]>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const { token } = useGlobalContext();
    const { saveBook } = useBook();
    //const { isConnected } = useConnection();
    const isConnected = false;
    const { saveData, getData } = useStorage();
    const [loading, setLoading] = useState(false);

    const saveLibrary = async (library: Library) => {
        if (isConnected) {
            const response = await customFetch({
                endpoint: `library/save/${library.id}`,
                method: 'POST',
                token: token,
            });
            if (response.success) {
                try {
                    const updateLibraries = [...libraries ?? [], library];
                    await saveData({ key: 'library', value: updateLibraries });
                } catch (error) {
                    console.log('Error saving book');
                }
            } else {
                console.log('Error saving book');
            }
        } else {
            try {
                const updateLibraries = [...libraries ?? [], library];
                await saveData({ key: 'library', value: updateLibraries });
            } catch (error) {
                console.log('Error saving book');
            }
        }
    };

    const getLibraries = async () => {
        setLoading(true);
        try {
            const data = await getData({ key: 'library' });
            console.log(data);
            if (data) {
                setLibraries(data);
            }
        } catch (error) {
            console.log('Error getting library');
        }
        setLoading(false);
    };

    // Cargar libros al iniciar la aplicación
    useEffect(() => {
        setLibraries(datalibrary);
        datalibrary.map((item) => {
            setBooks(item.items);
            setCategories((prev) => [...prev, item.category]);
        });
    }, [datalibrary]);

    useEffect(() => {
        getLibraries();
    }, []);

    return { loading, books, saveBook, categories, libraries };
}