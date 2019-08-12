export class Candidate{
    'email': string;
    'name': string;
    'emailRecruiter':string;
    'id':number;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}