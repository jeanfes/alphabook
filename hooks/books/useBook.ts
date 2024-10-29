import { useEffect, useState } from 'react';
import { Book, Library } from '@/interfaces/library';
import { customFetch } from '@/services/customFetch';
import { useStorage } from '../storage/useStorage';
//import { useConnection } from "../connection/useConnection";
import { useGlobalContext } from '@/context/GlobalContext';
import { useLibrary } from './useLibrary';
import { dataBooks } from '@/utilities/data';

export const useBook = () => {
    const { saveData, getData } = useStorage();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const { token } = useGlobalContext();
    //const { isConnected } = useConnection();
    const isConnected = false;

    const saveBook = async (book: Book) => {
        if (isConnected) {
            const response = await customFetch({
                endpoint: `book/save/${book.id}`,
                method: 'POST',
                token: token,
            });
            if (response.success) {
                setLoading(true);
                try {
                    const actualBooks: Book[] = await getData({ key: 'books' });
                    let updatedBooks: Book[];
                    if (actualBooks) {
                        const bookIndex = actualBooks.findIndex((b) => b.id === book.id);
                        if (bookIndex !== -1) {
                            // Reemplazar el libro existente
                            updatedBooks = [...actualBooks];
                            updatedBooks[bookIndex] = book;
                        } else {
                            // Agregar el nuevo libro
                            updatedBooks = [...actualBooks, book];
                        }
                    } else {
                        // Si no hay libros, agregar el nuevo libro
                        updatedBooks = [book];
                    }
                    await saveData({ key: 'books', value: updatedBooks });
                    return updatedBooks;
                } catch (error) {
                    console.log('Error saving book:', error);
                    return false;
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('Error saving book');
            }
        } else {
            setLoading(true);
            try {
                const actualBooks: Book[] = (await getData({ key: 'books' })) || [];
                const bookIndex = actualBooks.findIndex((b) => b.id === book.id);
                let updatedBooks: Book[];
                if (bookIndex !== -1) {
                    // Reemplazar el libro existente
                    updatedBooks = [...actualBooks];
                    updatedBooks[bookIndex] = book;
                } else {
                    // Agregar el nuevo libro
                    updatedBooks = [...actualBooks, book];
                }

                await saveData({ key: 'books', value: updatedBooks });
                setBooks(updatedBooks); // Actualizar el estado local
                return updatedBooks;
            } catch (error) {
                console.log('Error saving book:', error);
                return false;
            } finally {
                setLoading(false);
            }
        }
    };

    const removeBook = async (book: Book) => {
        try {
            const actualBooks = await getData({ key: 'books' });
            const updatedBooks = actualBooks.filter((item: Book) => item.id !== book.id);
            const result = await saveBook(updatedBooks);
            if (result) {
                return updatedBooks;
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
            const memoryBooks = (await getData({ key: 'books' })) || [];
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
                    return memoryBooks;
                } else {
                    return false;
                }
            } else {
                // Si no hay conexión, usar los libros de la memoria
                return memoryBooks;
            }
        } catch (error) {
            console.log('Error durante la sincronización de libros:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBooks = async () => {
        setLoading(true);
        try {
            const data = await getData({ key: 'books' });
            setBooks(data || []); // Asegurarse de que el estado local se actualice correctamente
        } catch (error) {
            console.log('Error getting books');
        } finally {
            setLoading(false);
        }
    };

    const removeAll = async () => {
        try {
            await saveData({ key: 'books', value: [] });
            setBooks([]); // Actualizar el estado local
        } catch (error) {
            console.log('Error removing books');
        }
    };

    // useEffect(() => {
    //     syncBooks();
    // }, []);

    // Cargar libros al iniciar la aplicación
    useEffect(() => {
        const initializeBooks = async () => {
            const storedBooks = await getData({ key: 'books' });
            if (!storedBooks || storedBooks.length === 0) {
                await saveData({ key: 'books', value: dataBooks });
                setBooks(dataBooks);
            } else {
                setBooks(storedBooks);
            }
        };
        initializeBooks();
    }, []);

    return { loading, removeBook, syncBooks, saveBook, removeAll, books };
};
