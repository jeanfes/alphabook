import { Book } from "@/interfaces/library";

interface Library {
    id: number;
    category: {
        id: number;
        text: string;
    };
    items: Book[];
}

export const datalibrary: Library[] = [
    {
        id: 1,
        category: {
            id: 1,
            text: 'All',
        },
        items: [
            { id: 1, title: 'Catcher in the Rye', text: 'Updated: 12/05/2024', image: '', favorite: true },
            { id: 2, title: 'Someone Like You', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: true },
            { id: 3, title: 'The Great Gatsby', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: true },
            { id: 4, title: 'To Kill a Mockingbird', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: true },
            { id: 5, title: 'The Last of Rest', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: true },
            { id: 6, title: 'Journey to the Unknown', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: true },
            { id: 7, title: 'Into the Wild', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: true },
            { id: 8, title: 'Around the World in 80 Days', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: true },
            { id: 9, title: 'Mystery of the Old House', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: true },
            { id: 10, title: 'Adventures in Wonderland', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: true },
            { id: 11, title: 'Galactic Wars', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: true },
            { id: 12, title: 'Alien Invasion', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: true },
            { id: 13, title: 'Dune', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: true },
            { id: 14, title: 'Ender\'s Game', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: true },
            { id: 15, title: 'Love in Paris', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: true },
            { id: 16, title: 'Forever Yours', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: true },
            { id: 17, title: 'Pride and Prejudice', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: true },
            { id: 18, title: 'The Notebook', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: true },
            { id: 19, title: 'Haunted House', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: true },
            { id: 20, title: 'Nightmare', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: true },
            { id: 21, title: 'It', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: true },
            { id: 22, title: 'The Shining', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: true },
        ],
    },
    {
        id: 2,
        category: {
            id: 2,
            text: 'Fiction',
        },
        items: [
            { id: 1, title: 'Catcher in the Rye', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false },
            { id: 2, title: 'Someone Like You', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: false },
            { id: 3, title: 'The Great Gatsby', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false },
            { id: 4, title: 'To Kill a Mockingbird', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: false },
        ],
    },
    {
        id: 3,
        category: {
            id: 3,
            text: 'Adventure',
        },
        items: [
            { id: 5, title: 'The Last of Rest', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: false },
            { id: 6, title: 'Journey to the Unknown', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: false },
            { id: 7, title: 'Into the Wild', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: false },
            { id: 8, title: 'Around the World in 80 Days', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: false },
        ],
    },
    {
        id: 4,
        category: {
            id: 4,
            text: 'Children',
        },
        items: [
            { id: 9, title: 'Mystery of the Old House', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: false },
            { id: 10, title: 'Adventures in Wonderland', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: false },
        ],
    },
    {
        id: 5,
        category: {
            id: 5,
            text: 'Science Fiction',
        },
        items: [
            { id: 11, title: 'Galactic Wars', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false },
            { id: 12, title: 'Alien Invasion', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: false },
            { id: 13, title: 'Dune', text: 'Updated: 12/05/2024', image: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg', favorite: false },
            { id: 14, title: 'Ender\'s Game', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg', favorite: false },
        ],
    },
    {
        id: 6,
        category: {
            id: 6,
            text: 'Romance',
        },
        items: [
            { id: 15, title: 'Love in Paris', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: false },
            { id: 16, title: 'Forever Yours', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: false },
            { id: 17, title: 'Pride and Prejudice', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', favorite: false },
            { id: 18, title: 'The Notebook', text: 'Updated: 12/05/2024', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s', favorite: false },
        ],
    },
    {
        id: 7,
        category: {
            id: 7,
            text: 'Horror',
        },
        items: [
            { id: 19, title: 'Haunted House', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: false },
            { id: 20, title: 'Nightmare', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: false },
            { id: 21, title: 'It', text: 'Updated: 12/05/2024', image: 'https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg', favorite: false },
            { id: 22, title: 'The Shining', text: 'Updated: 12/05/2024', image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp', favorite: false },
        ],
    },
];