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
       to="/privacy"> {t("description.privacy")}
      </Link>
      <Link
       className='link'
       to="/terms"> {t("description.terms")}
      </Link>
      <Link
       className='link'
       to="/cookies"> {t("description.cookies")}
      </Link>

    </Container>

  </Nav>
  )
}

export default Description