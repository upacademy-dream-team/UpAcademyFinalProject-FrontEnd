export class User{
    'id': number;
    'username': string;
    'email': string;
    'password': string;
    'accessType': string;
    constructor(data?: any) {
        Object.assign(this, data);
    }
}