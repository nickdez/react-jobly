import { createContext } from 'react';

export const AuthContext = createContext({
    currentUser: {},
    updateUser: () => { },
    login: () => { },
    signup: () => { },
    logout: () => { }
});
