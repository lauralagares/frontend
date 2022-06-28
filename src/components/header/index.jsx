import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { themeContext } from '../../context/theme.context';
import { authContext } from '../../context/auth.context';
import { BsSpotify } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { BsSuitHeartFill } from 'react-icons/bs';
import { TbMicrophone2 } from 'react-icons/tb';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { IoSunnySharp } from 'react-icons/io5'

function Header() {

  const [t, i18n] = useTranslation("global");

  const { toggleTheme } = useContext(themeContext);

  const navigate = useNavigate();

  const { token, deleteToken } = useContext(authContext);

  const handleLogout = () => {
    deleteToken();
    navigate('/');

  }

  return (

    <Navbar className='header_container' expand="lg">
      <Container fluid>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
         className="justify-content-end"
         id="basic-navbar-nav">

          <Navbar.Brand className='d-flex'>
            {token
              ? <>
                <Button size="sm" className='btn btn-secondary fw-bold me-1' as={Link} to="/dashboard" >
                  <TbMicrophone2></TbMicrophone2>
                </Button>
                <Button size="sm" className='btn btn-secondary fw-bold me-1' as={Link} to="/favorites" >
                  <BsSuitHeartFill className='favorites-icon'></BsSuitHeartFill>
                </Button>
              </>
              : ''
            }

          </Navbar.Brand>

          <Navbar.Brand className='d-flex'>
            <ButtonGroup size="sm" className='me-1'>
              <Button className='btn btn-secondary fw-bold' onClick={() => i18n.changeLanguage("es")}>ES</Button>
              <Button className='btn btn-secondary fw-bold' onClick={() => i18n.changeLanguage("en")}>EN</Button>
            </ButtonGroup>
          </Navbar.Brand>

          <Navbar.Brand className='d-flex'>

            <Form className="d-flex"
            style={{alignItems: 'center'}}>
              <IoSunnySharp className='me-2 text-warning'></IoSunnySharp>
              <Form.Check
                type="switch"
                id="custom-switch"
                onClick={toggleTheme}
              />
              <BsFillMoonStarsFill className='text-warning'></BsFillMoonStarsFill>
            </Form>
          </Navbar.Brand>

          <Navbar.Brand className='d-flex'>
            {
              token
                ? <Button
                  className='btn btn-success btn-sm fw-bold'
                  onClick={handleLogout}><BsSpotify></BsSpotify> {t("login.logout")}</Button>
                : ''
            }

          </Navbar.Brand>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header