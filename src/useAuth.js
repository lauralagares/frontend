import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { authContext } from './context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function useAuth(code) {

   const navigate = useNavigate()

   const {saveToken} = useContext(authContext);

   const [accessToken, setAccessToken] = useState();
   const [refreshToken, setRefreshToken] = useState();
   const [expiresIn, setExpiresIn] = useState();

   useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        code,
    }).then((res) => {
        setAccessToken(res.data.accessToken)
        saveToken(res.data.accessToken) // cojo el token y lo guardo en contexto
        //sessionStorage.setItem('accessToken', res.data.accessToken);  esto no estaba
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        navigate('/dashboard')
        // window.history.pushState({}, null, "/") 
    }).catch((err) => {
        window.location = "/" 
    })
   }, [code]);

   useEffect(() => {

    if(!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {
            refreshToken,
        }).then((res) => {
            setAccessToken(res.data.accessToken)
            saveToken(res.data.accessToken) // hago lo mismo que antes cuando refresca
            setExpiresIn(res.data.expiresIn)
        }).catch(() => {
            window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
   }, [refreshToken, expiresIn])

   return accessToken
}




