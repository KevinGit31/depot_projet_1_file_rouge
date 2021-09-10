export class User {
    id: number;
    name: string;
    admin: boolean;
    email: string;
    password?: string;

    constructor(){
        this.name = ''
        this.admin = false
        this.email = ''
        this.password = ''
    }
}


