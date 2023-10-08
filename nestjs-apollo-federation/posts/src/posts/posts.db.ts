import { Post } from './models/post.object';

export const db = new Map<string, Post>([
    [
        '745ea490-51a8-458b-9ce4-d13e346fd471',
        {
            uuid: 'f29cf067-32f4-4b36-a178-6908c29aa705',
            slug: 'in-friendship-diminution ',
            title: 'In friendship diminution',
            content:
                'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court.',
            createdByUuid: 'f29cf067-32f4-4b36-a178-6908c29aa705',
            likedByUuids: ['c85b130a-b4a1-4f54-911e-9dfc69f76967', '6441f7f4-13eb-482e-94a2-42b3fcf39dc7'],
        },
    ],
    [
        'd4c00270-8e8e-43f1-8807-d48c7b085e75',
        {
            uuid: 'c85b130a-b4a1-4f54-911e-9dfc69f76967',
            slug: 'estimable-ye-situation',
            title: 'Estimable ye situation',
            content:
                'Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part.',
            createdByUuid: 'c85b130a-b4a1-4f54-911e-9dfc69f76967',
            likedByUuids: ['6441f7f4-13eb-482e-94a2-42b3fcf39dc7'],
        },
    ],
    [
        '5225d5db-6fc5-409d-b6aa-3c3e80e3dedc',
        {
            uuid: '6441f7f4-13eb-482e-94a2-42b3fcf39dc7',
            slug: 'how-promotion-excellent',
            title: 'How promotion excellent',
            content:
                'How promotion excellent curiosity yet attempted happiness. Gay prosperous impression had conviction.',
            createdByUuid: '6441f7f4-13eb-482e-94a2-42b3fcf39dc7',
            likedByUuids: ['f29cf067-32f4-4b36-a178-6908c29aa705', 'c85b130a-b4a1-4f54-911e-9dfc69f76967'],
        },
    ],
]);
