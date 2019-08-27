export class Candidate{
    'email': string;
    'name': string;
    'emailRecruiter':string;
    'id':number;
    'countryIP': string;
    constructor(data?: any) {
        Object.assign(this, data)
    }
}