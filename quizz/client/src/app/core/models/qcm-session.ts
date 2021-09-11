export class QcmSession {
    id: number;
    questions: QuestionSession[];

    constructor(){
        this.questions = []
    }
}

class  QuestionSession {
    question_id: number;
    answers: AnswerSession[];

    constructor(){

        this.answers = []
    }
}

class  AnswerSession {
    answer_id: number;
    text: string;
    isTrue:boolean;

    constructor(){

    }
}


