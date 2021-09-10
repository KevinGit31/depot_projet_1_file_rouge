import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        label: 'ADMINISTRATION',
        isTitle: true
    },
    {
        label: 'Les utilisateurs',
        icon: 'users',
        link: '/user',
    },
    {
        label: 'Les sujets',
        icon: 'layers',
        link: '/qcm',
    },
    {
        label: 'Les questions',
        icon: 'bookmark',
        link: '/question',
    },
    {
        label: 'QCM',
        isTitle: true
    },
    {
        label: 'Démarrer un QCM',
        icon: 'target',
        link: '/qcm',
    },
    {
        label: 'Mes scores',
        icon: 'activity',
        link: '/score',
    }
];
