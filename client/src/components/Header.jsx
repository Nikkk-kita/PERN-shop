import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../consts';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Header = observer(() => {
   const navigate = useNavigate()
   const { user } = useContext(Context)
   const role = jwtDecode(localStorage.getItem('token')).role

   const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
   }
   return (
      <Navbar bg="dark" variant="dark">
         <Container>
            <NavLink style={{ color: 'white', textDecoration: 'none' }} to={SHOP_ROUTE}>КупиДевайс</NavLink>
            {user.isAuth ?
               <Nav className="ml-auto">
                  {role === 'ADMIN' ? <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button> : ""}
                  <Button variant={'outline-light'} className="ms-3" onClick={() => logOut()} >Выйти</Button>
               </Nav>
               :
               <Nav className="ml-auto">
                  <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
               </Nav>
            }
         </Container>
      </Navbar>
   );
})


export default Header;