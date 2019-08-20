export class SessionAdd{
    'recruiterEmail': string;
    'numberOfHours': number;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}