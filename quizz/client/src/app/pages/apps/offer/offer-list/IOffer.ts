import { EStatus } from '../../../../core/models/estatus/estatus';
import { Contrat } from '../../../../core/models/contrat/contrat';
import { Company } from '../../../../core/models/company/company';
import { Detailsystem } from '../../../../core/models/detailsystem/detailsystem';
import { Profil } from 'src/app/core/models/profil/profil';

export interface IOffer {
    id:number;
    title:String;
    publishdate:Date;
    refreshdate:Date;
    number:String;
    contrat:Contrat;
    description:String;
    status:EStatus;
    company:Company;
    job:String;
    salary:number;
    nbrPost:number;
    detailSys:Detailsystem;
    profil:Profil;
}