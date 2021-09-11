import { ProfilSection } from "../profil-section/profil-section";

export class Profil {

    id:number;
    title:String;
    sections:ProfilSection[]

    constructor(){
        this.sections = [];
        this.title = "";
    }
}

