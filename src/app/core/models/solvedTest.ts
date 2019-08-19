import { Answer } from './answer';
import { Candidate } from './candidate';

export class SolvedTest{
    'answer': Answer[];
    'candidate': Candidate;
    'score':number;
    'testID':number;
    'id':number;
    'date':string;
    'timeSpent':number;
    ////falta timeSpent e date
    constructor(data?: any) {
        Object.assign(this, data)
    }
}