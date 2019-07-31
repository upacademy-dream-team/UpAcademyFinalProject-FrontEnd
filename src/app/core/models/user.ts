export class User{
    'id': number;
    'name': string;
    'email': string;
    'password': string;
    constructor(data?: any) {
        Object.assign(this, data);
    }
}