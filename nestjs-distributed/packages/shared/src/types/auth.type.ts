export type Auth = {
    user: {
        uuid: string;
        username: string;
        role: string;
        permission: string[];
    };
};
