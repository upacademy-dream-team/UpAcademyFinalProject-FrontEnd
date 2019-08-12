import { User } from './user';
import { Question } from './question';

export class Test{
    'author':User;
    'averageScore': number;
    'timer':number;
    'testName':string;
    'id':number;
    'dateTime':string;
    'questions':Question[];
    'submittedTests':number;
    ////falta timeSpent e date
    constructor(data?: any) {
        Object.assign(this, data)
    }
}