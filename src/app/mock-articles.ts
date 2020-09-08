import { Article } from './article';
import { title } from 'process';

export const ARTICLES: Article[] = [
    {
        id: 1,
        title: 'Hello World!',
        content: '',
        description: 'This is my new article',
        key: 'hello-world',
        date: new Date(),
        imageURL: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/09/4-3.jpg',
    },
    {
        id: 2,
        title: 'Hello Second World!',
        content: '',
        description: 'This is my second new article',
        key: 'hello-world-2',
        date: new Date(),
        imageURL: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/09/4-3.jpg',
    },
];
