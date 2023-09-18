import {createContext, ReactNode, useEffect, useState } from "react";
import { UserType } from "../utils/types";


interface UserContextValueType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const storedUser = localStorage.getItem('pod_user');

const initialData = storedUser ? JSON.parse(storedUser) : null;

export const UserContext = createContext<UserContextValueType>({
    user: initialData,
    setUser: () => { },
});

interface UserProviderProps {
    children: ReactNode
}

const UserProvider:React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(initialData);

    const contextValue: UserContextValueType = {
        user,
        setUser,
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('pod_user', JSON.stringify(user));
        }else {
            localStorage.removeItem('pod_user');
        }
    },[user])
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
 
export default UserProvider;
