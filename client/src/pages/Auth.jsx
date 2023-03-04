import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../consts';
import { Card } from 'react-bootstrap';
import { login, registration } from '../http/userAPI';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';

const Auth = observer(() => {
   const { user } = useContext(Context)
   const navigate = useNavigate()
   const location = useLocation()
   const isLogin = location.pathname === LOGIN_ROUTE
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const click = async () => {
      try {
         let data;
         if (isLogin) {
            data = await login(email, password);
         } else {
            data = await registration(email, password)
         }
         user.setUser(data)
         user.setIsAuth(true)
         navigate(SHOP_ROUTE)
      } catch (e) {
         alert(e.response.data.message)
      }

   }
   return (
      <Container
         className='d-flex justify-content-center align-items-center'
      >
         <Card style={{ width: "600px" }} className='p-5 mt-5'>
            <h2 className='m-auto'>{isLogin ? 'Авторизация' : "Регистрация"}</h2>
            <Form className='d-flex flex-column'>
               <Form.Control
                  type="email"
                  placeholder="Введите email"
                  className='mt-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  className='mt-3'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               <div className='d-flex justify-content-between mt-3'>
                  {isLogin ?
                     <div>
                        Нет акаунта? <Nav.Link style={{ color: 'blue' }} href={REGISTRATION_ROUTE}>Зарегистрируйся</Nav.Link>
                     </div>
                     :
                     <div>
                        Есть аккаунт? <Nav.Link style={{ color: 'blue' }} href={LOGIN_ROUTE}>Войдите</Nav.Link>
                     </div>
                  }

                  <Button
                     onClick={click}
                     variant="outline-success"
                  >
                     {isLogin ? "Войти" : "Зарегистрироваться"}
                  </Button>
               </div>

            </Form>
         </Card>
      </Container>
   );

})

export default Auth;