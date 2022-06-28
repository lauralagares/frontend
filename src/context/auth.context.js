import { createContext, useState} from 'react';

const authContext = createContext({}); //code??

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(sessionStorage.getItem('token')??'');
    const [id, saveId] = useState(sessionStorage.getItem('id')??''); 

    const saveToken = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
    }

    const deleteToken = () => {
        setToken('');
        sessionStorage.removeItem('token')
    }

    const setId = (newId) => {
        saveId(newId);
        sessionStorage.setItem('id', newId);
    }

    return <authContext.Provider value={{token, saveToken, deleteToken, id, setId}}>{children}</authContext.Provider>
}

export {authContext, AuthProvider};