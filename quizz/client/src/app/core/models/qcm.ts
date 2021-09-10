import { Question } from "./question";

export class Qcm {
    id: number;
    sujet: string;
    description:string;
    questions: Question[];

    constructor(){
        this.sujet=""
        this.description=""
        this.questions = []
    }
}

