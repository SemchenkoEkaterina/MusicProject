import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authRoutes } from '../routes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    authRoutes.map((route) => {
                        const Component = () => route.component;
                        return (<Route key={route.path} path={route.path} element={<Component/>} />)
                    })
                }
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter;