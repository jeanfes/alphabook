import { useEffect, useState } from "react";
import { Book, Library } from "@/interfaces/library";
import { customFetch } from "@/services/customFetch";
import { useStorage } from "../storage/useStorage";
//import { useConnection } from "../connection/useConnection";
import { useGlobalContext } from "@/context/GlobalContext";
import { useLibrary } from "./useLibrary";

export const useBook = () => {
    const { saveData, getData } = useStorage();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const { token } = useGlobalContext();
    const { getLibraries, saveLibrary } = useLibrary();
    //const { isConnected } = useConnection();
    const isConnected = false;

    const saveBook = async (book: Book) => {
        const actualLibrary = await getLibraries();
        if (isConnected) {
            const response = await customFetch({
                endpoint: `book/save/${book.id}`,
                method: 'POST',
                token: token,
            });
            if (response.success) {
                try {
                    const updatedBooks = actualLibrary?.items.map((item: Book) => {
                        return item.id === book.id ? book : item;
                    });
                    const updatedLibrary = { ...actualLibrary, items: updatedBooks };
                    await saveLibrary(updatedLibrary);
                } catch (error) {
                    console.log('Error saving book');
                }
            } else {
                console.log('Error saving book');
            }
        } else {
            try {
                console.log('updatedBooks', book);
                const updatedBooks = actualLibrary?.items?.map((item: Book) => {
                    console.log('book.id',book.id);
                    console.log('item.id', item.id);
                    return item.id === book.id ? book : item;
                });
                const updatedLibrary = { ...actualLibrary, items: updatedBooks };
                await saveLibrary(updatedLibrary);
            } catch (error) {
                console.log('Error saving book');
            }
        }
    };

    const removeBook = async (book: Book) => {
        try {
            const actualLibrary = await getLibraries();
            const updatedBooks = actualLibrary?.items.filter((item: Book) => item.id !== book.id);
            const updatedLibrary = { ...actualLibrary, items: updatedBooks };
            const result = await saveData({ key: 'library', value: updatedLibrary });
            if (result) {
                setBooks(updatedBooks);
            } else {
                console.log('Error removing book');
            }
        } catch (error) {
            console.log('Error removing book');
        }
    };

    const syncBooks = async () => {
        setLoading(true);
        try {
            // Obtener libros de la memoria
            const memoryBooks = await getData({ key: 'books' }) || [];
            if (isConnected) {
                // Obtener libros de la nube
                const response = await customFetch({
                    endpoint: 'book/list',
                    method: 'GET',
                    token: token,
                });
                const cloudBooks = response.data;
                // Actualizar libros en la memoria con los de la nube
                const updatedBooks = cloudBooks.map((book: Book) => {
                    const found = memoryBooks.find((item: Book) => item.id === book.id);
                    return found ? found : book;
                });
                // Subir libros actualizados de la memoria a la nube
                for (const book of memoryBooks) {
                    const found = cloudBooks.find((item: Book) => item.id === book.id);
                    if (!found || JSON.stringify(found) !== JSON.stringify(book)) {
                        const response = await customFetch({
                            endpoint: `book/save/${book.id}`,
                            method: 'POST',
                            token: token,
                            body: book,
                        });
                        if (!response.success) {
                            console.log('Error al sincronizar libro:', book);
                            return;
                        }
                    }
                }
                // Guardar libros actualizados en la memoria
                const result = await saveData({ key: 'books', value: updatedBooks });
                if (result) {
                    setBooks(updatedBooks);
                } else {
                    setBooks([]);
                }
            } else {
                // Si no hay conexión, usar los libros de la memoria
                setBooks(memoryBooks);
            }
        } catch (error) {
            console.log('Error durante la sincronización de libros:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        syncBooks();
    }, [isConnected]);

    return { loading, removeBook, syncBooks, saveBook, books };
}