import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        label: 'ADMINISTRATION',
        isTitle: true
    },
    {
        label: 'Les utilisateurs',
        icon: 'users',
        link: '/users',
    },
    {
        label: 'Les sujets',
        icon: 'layers',
        link: '/subject',
    },
    {
        label: 'Les questions',
        icon: 'bookmark',
        link: '/questions',
    },
    {
        label: 'Les réponses',
        icon: 'at-sign',
        link: '/answers',
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
        link: '/scores',
    },
    {
        label: 'Tableau de bord',
        isTitle: true
    },
    {
        label: 'Tableau de bord',
        icon: 'home',
        link: '/',
        badge: {
            variant: 'success',
            text: '1',
        }
    },
    {
        label: 'Analyse',
        isTitle: true
    },
    {
        label: 'Analyse',
        icon: 'activity',
        subItems: [
            {
                label: 'Le journal de prévision',
                link: '/apps/journal-prev',
            }
        ]
    },
    {
        label: 'Comptabilité',
        isTitle: true
    },
    {
        label: 'Comptabilité',
        icon: 'book',
        subItems: [
            {
                label: 'Les comptes',
                subItems: [
                    {
                        label: 'Les comptes de réferences',
                        link: '/apps/comptes-ref',
                    },
                    {
                        label: 'Les sous comptes',
                        link: '/apps/comptes-sub',
                    }
                ]
            },
            {
                label: 'Exercices',
                link: '/apps/fiscal-year',
            },
            {
                label: 'Le journal',
                link: '/apps/journal',
            },
            {
                label: 'Le grand livre',
                link: '/apps/ledger',
            },
            {
                label: 'La balance',
                link: '/apps/balance',
            },
            {
                label: 'Le resultat',
                link: '/apps/resultat',
            },
            {
                label: 'Le bilan',
                link: '/apps/bilan',
            },
            {
                label: 'Les graphs',
                link: '/apps/graphique',
            }
        ]
    },
    {
        label: 'Espace de Travail',
        isTitle: true
    },
    {
        label: 'Espace de Travail',
        icon: 'layers',
        link: '/ns'
    },
    {
        label: 'Apps',
        isTitle: true
    },
    {
        label: 'Calendar',
        icon: 'calendar',
        link: '/apps-calendar',
    },
    {
        label: 'Email',
        icon: 'inbox',
        subItems: [
            {
                label: 'Inbox',
                link: '/apps/email-inbox',
            },
            {
                label: 'Read',
                link: '/apps/email-read'
            },
            {
                label: 'Compose',
                link: '/apps/email-compose'
            },
        ]
    },
    {
        label: 'Offre',
        icon: 'briefcase',
        subItems: [
            {
                label: 'Les offres',
                link: '/apps/offer-list',
            },
            {
                label: 'Detail',
                link: '/apps/offer-detail',
            },
        ]
    },
    {
        label: 'Tasks',
        icon: 'bookmark',
        subItems: [
            {
                label: 'List',
                link: '/apps/task-list',
            },
            {
                label: 'Kanban Board',
                link: '/apps/task-board',
            },
        ]
    },
    {
        label: 'Custom',
        isTitle: true
    },
    {
        label: 'Pages',
        icon: 'file-text',
        subItems: [
            {
                label: 'Starter',
                link: '/other/pages-starter'
            },
            {
                label: 'Profile',
                link: '/other/pages-profile'
            },
            {
                label: 'Activity',
                link: '/other/pages-activity'
            },
            {
                label: 'Invoice',
                link: '/other/pages-invoice'
            },
            {
                label: 'Pricing',
                link: '/other/pages-pricing'
            },
            {
                label: 'Error 404',
                link: '/other/pages-error-404'
            },
            {
                label: 'Error 500',
                link: '/other/pages-error-500'
            },
        ]
    },
    {
        label: 'components',
        isTitle: true
    },
    {
        label: 'UI Elements',
        icon: 'package',
        subItems: [
            {
                label: 'Bootstrap UI',
                link: '/ui/bootstrap'
            },
            {
                label: 'Icons',
                link: '/ui/icons',
                subItems: [
                    {
                        label: 'Feather Icons',
                        link: '/ui/icon-feather'
                    },
                    {
                        label: 'Unicons Icons',
                        link: '/ui/icon-unicons'
                    },
                ]
            },
            {
                label: 'Widgets',
                link: '/ui/widgets'
            }
        ]
    },
    {
        label: 'Forms',
        link: '/ui/form',
        icon: 'file-text',
        subItems: [
            {
                label: 'Basic Elements',
                link: '/ui/forms-basic'
            },
            {
                label: 'Advanced',
                link: '/ui/forms-advanced'
            },
            {
                label: 'Validation',
                link: '/ui/forms-validation'
            },
            {
                label: 'Wizard',
                link: '/ui/forms-wizard'
            },
            {
                label: 'Editor',
                link: '/ui/forms-editor'
            },
            {
                label: 'File Uploads',
                link: '/ui/forms-uploads'
            },
        ]
    },
    {
        label: 'Charts',
        link: '/ui/charts',
        icon: 'pie-chart'
    },
    {
        label: 'Tables',
        link: '/ui/tables',
        icon: 'grid',
        subItems: [
            {
                label: 'Basic',
                link: '/ui/tables-basic'
            },
            {
                label: 'Advanced',
                link: '/ui/tables-advanced'
            },
        ]
    }
];
