import React from 'react';
import { Container, Nav} from 'react-bootstrap';
import './style.css';
import Login from '../login';
import { useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';

function Description() {

  const [t, i18n] = useTranslation ("global") ;

  return (
    <Nav className='description_container'>
    <Container className='d-flex mt-3' style={{justifyContent: 'center'}}>
      <Login></Login>
    </Container>

    <Container className='d-flex mb-2'
    style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <Link
       className='link'
       to="/privacy"> Privacy policy
      </Link>
      <Link
       className='link'
       to="/terms"> Terms & Conditions
      </Link>
      <Link
       className='link'
       to="/cookies"> Cookies
      </Link>

    </Container>

  </Nav>
  )
}

export default Description