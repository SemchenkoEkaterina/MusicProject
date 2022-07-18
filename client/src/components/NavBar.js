import React, { useContext } from 'react';
import { Context } from '../index';
import  { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, TRACKS_ROUTE } from '../utils/consts';

const NavBar = () => {
    const { user } = useContext(Context);
    
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg="light" variant="light" className='rounded-3'>
            <Container>
                <Nav.Link href={TRACKS_ROUTE}><img className="linked-logo__image" src="/images/logo.png" width="110" height="60" alt='Music hall'/></Nav.Link>
                {user.isAuth ?
                <Nav className="ml-auto">
                    <Button variant='outline-danger' onClick={() => logOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className="ml-auto">
                    <a href={LOGIN_ROUTE}>
                        <Button variant='outline-danger'>Авторизация</Button>
                    </a>
                </Nav>}
            </Container>
        </Navbar>
    )
};

export default observer(NavBar);