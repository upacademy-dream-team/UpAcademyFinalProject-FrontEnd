import { Category } from './category';

export class Question{
    'category': Category;
    'question': string;
    'options':string[];
    'solution':number[];
    'id':number;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}