import React from 'react'
import { useSearchParams } from "react-router-dom";
import useAuth from '../../useAuth';


function Authentication() {

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const accessToken = useAuth(code);

  return (
    <div className="loader"></div>
  )
}

export default Authentication