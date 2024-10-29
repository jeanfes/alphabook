interface Category {
    id: number;
    text: string;
}

interface Book {
    id: number;
    title: string;
    text: string;
    image: string;
    favorite: boolean;
    categoryId: number;
}

export const dataCategories: Category[] = [
    { id: 0, text: 'All' },
    { id: 1, text: 'Fiction' },
    { id: 2, text: 'Adventure' },
    { id: 3, text: 'Children' },
    { id: 4, text: 'Science Fiction' },
    { id: 5, text: 'Romance' },
    { id: 6, text: 'Horror' },
];

export const dataBooks: Book[] = [
    { id: 1, title: 'Catcher in the Rye', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false, categoryId: 1 },
    {
        id: 2,
        title: 'Someone Like You',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg',
        favorite: false,
        categoryId: 1,
    },
    { id: 3, title: 'The Great Gatsby', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false, categoryId: 1 },
    {
        id: 4,
        title: 'To Kill a Mockingbird',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg',
        favorite: false,
        categoryId: 1,
    },
    {
        id: 5,
        title: 'The Last of Rest',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg',
        favorite: false,
        categoryId: 2,
    },
    {
        id: 6,
        title: 'Journey to the Unknown',
        text: 'Updated: 12/05/2024',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s',
        favorite: false,
        categoryId: 2,
    },
    {
        id: 7,
        title: 'Into the Wild',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg',
        favorite: false,
        categoryId: 2,
    },
    {
        id: 8,
        title: 'Around the World in 80 Days',
        text: 'Updated: 12/05/2024',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s',
        favorite: false,
        categoryId: 2,
    },
    {
        id: 9,
        title: 'Mystery of the Old House',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg',
        favorite: false,
        categoryId: 3,
    },
    {
        id: 10,
        title: 'Adventures in Wonderland',
        text: 'Updated: 12/05/2024',
        image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp',
        favorite: false,
        categoryId: 3,
    },
    { id: 11, title: 'Galactic Wars', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false, categoryId: 4 },
    {
        id: 12,
        title: 'Alien Invasion',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg',
        favorite: false,
        categoryId: 4,
    },
    { id: 13, title: 'Dune', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false, categoryId: 4 },
    {
        id: 14,
        title: "Ender's Game",
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg',
        favorite: false,
        categoryId: 4,
    },
    {
        id: 15,
        title: 'Love in Paris',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg',
        favorite: false,
        categoryId: 5,
    },
    {
        id: 16,
        title: 'Forever Yours',
        text: 'Updated: 12/05/2024',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s',
        favorite: false,
        categoryId: 5,
    },
    {
        id: 17,
        title: 'Pride and Prejudice',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg',
        favorite: false,
        categoryId: 5,
    },
    {
        id: 18,
        title: 'The Notebook',
        text: 'Updated: 12/05/2024',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s',
        favorite: false,
        categoryId: 5,
    },
    {
        id: 19,
        title: 'Haunted House',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg',
        favorite: false,
        categoryId: 6,
    },
    {
        id: 20,
        title: 'Nightmare',
        text: 'Updated: 12/05/2024',
        image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp',
        favorite: false,
        categoryId: 6,
    },
    {
        id: 21,
        title: 'It',
        text: 'Updated: 12/05/2024',
        image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg',
        favorite: false,
        categoryId: 6,
    },
    {
        id: 22,
        title: 'The Shining',
        text: 'Updated: 12/05/2024',
        image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp',
        favorite: false,
        categoryId: 6,
    },
];
