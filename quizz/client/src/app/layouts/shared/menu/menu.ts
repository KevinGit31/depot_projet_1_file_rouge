import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        label: 'ADMINISTRATION',
        isTitle: true,
    },
    {
        label: 'Les utilisateurs',
        icon: 'users',
        link: '/user',
    },
    {
        label: 'Les questions',
        icon: 'bookmark',
        link: '/question',
    },
    {
        label: 'Les sujets',
        icon: 'layers',
        link: '/qcm',
    },
    {
        label: 'QCM',
        isTitle: true,
        isNotAdmin:true,
    },
    {
        label: 'Démarrer un QCM',
        icon: 'target',
        link: '/',
        isNotAdmin:true
    },
    {
        label: 'Mes scores',
        icon: 'activity',
        link: '/score',
        isNotAdmin:true
    }
];
