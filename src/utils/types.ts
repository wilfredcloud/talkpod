export interface FeaturesType {
    name: string;
    iconClass: string;
    description: string;
}


export interface UserType {
    data: {
        id: string;
        name: string;
        email: string;
    };
    token: string
}

export interface Room {
    id: string
    name: string;
    userId: string;
}
