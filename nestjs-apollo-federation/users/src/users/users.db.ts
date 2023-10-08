import { User } from './models/user.object';

export const db = new Map<string, User>([
    [
        'f29cf067-32f4-4b36-a178-6908c29aa705',
        { uuid: 'f29cf067-32f4-4b36-a178-6908c29aa705', firstName: 'Adam', lastName: 'Nowak' },
    ],
    [
        'c85b130a-b4a1-4f54-911e-9dfc69f76967',
        { uuid: 'c85b130a-b4a1-4f54-911e-9dfc69f76967', firstName: 'Batrosz', lastName: 'Wiśniowski' },
    ],
    [
        '6441f7f4-13eb-482e-94a2-42b3fcf39dc7',
        { uuid: '6441f7f4-13eb-482e-94a2-42b3fcf39dc7', firstName: 'Celina', lastName: 'Kowalska' },
    ],
]);
