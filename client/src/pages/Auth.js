import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TRACKS_ROUTE } from '../utils/consts';

const Auth = () => {
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const click = async () => {
        let data;
        if (isLogin) {
            data = await login(email, password);
        } else {
            data = await registration(email, password);
        }
        user.setUser(user);
        user.setIsAuth(true);
        navigate(TRACKS_ROUTE);
    };
    return (
        <Container
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight-76}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                    className='mt-4'
                    placeholder='Введите ваш e-mail...'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Control
                    className='mt-4'
                    placeholder='Введите ваш пароль...'
                    type='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <Row className='mt-4 d-flex justify-content-between' style={{width: '102%' }}>
                        {isLogin ? 
                        <div style={{width: '85%' }}>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div style={{width: '79%' }}>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                        }
                        <Button style={isLogin ? {width: '15%' } : {width: '21%' }} className='align-self-end' variant='outline-danger' size="sm" onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    )
};

export default observer(Auth);