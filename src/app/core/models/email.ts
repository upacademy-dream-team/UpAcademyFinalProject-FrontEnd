export class Email{
    'emailTo': string;
    'body': string;
    'subject': string;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}