export class User {
    id: number;
    name: string;
    admin: boolean;
    email: string;
    password?: string;
    qcm_sessions?: QcmSession[];


    constructor(){
        this.name = ''
        this.admin = false
        this.email = ''
        this.password = ''
        this.qcm_sessions = []
    }
}

class QcmSession {

    id: number;
    score: number;
    created_date:Date;

}




