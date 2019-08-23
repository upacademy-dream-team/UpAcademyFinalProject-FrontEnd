export class SessionAdd{
    'recruiterEmail': string;
    'numberOfHours': number;
    'candidateEmail': string;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}