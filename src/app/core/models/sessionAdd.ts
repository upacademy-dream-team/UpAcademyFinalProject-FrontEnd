export class SessionAdd{
    'recruiterEmail': string;
    'numberOfDays': number;
    'candidateEmail': string;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}