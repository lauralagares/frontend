import React from 'react';
import './style.css';
import { useTranslation} from 'react-i18next';
import { BsSpotify } from 'react-icons/bs';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login() {

  const [t, i18n] = useTranslation ("global") ;

  return (
    <div>
        <a className='btn btn-success btn-lg fw-bold' href={AUTH_URL}><BsSpotify></BsSpotify> {t("login.title")}</a>
    </div>
  )
}

export default Login