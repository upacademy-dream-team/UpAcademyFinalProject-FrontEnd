export class Answer{
    'givenAnswer': number[];
    'questionID': number;
    'id':number;
    constructor(data?: any) {
        Object.assign(this, data)
    }
    public setQuestionID(questionID){
        this.questionID=questionID;
    }
}