export class Category{
    'id': number;
    'category': string;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}