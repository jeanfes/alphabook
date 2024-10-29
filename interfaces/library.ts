export interface Library {
    id: number;
    category: Category;
    items: Book[];
}

export interface Category {
    id: number;
    text: string;
}

export interface Book {
    id: number;
    title: string;
    text: string;
    image: string;
    favorite: boolean;
    categoryId: number;
}
