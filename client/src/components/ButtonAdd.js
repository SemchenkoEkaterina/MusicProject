import React, { useContext } from 'react';
import  { Button } from 'react-bootstrap';
import './ButtonAdd.scss';

const ButtonAdd = (isAuth) => {
   console.log(isAuth);
   return((isAuth.isAuth) ? (<Button variant="outline-secondary" className='mb-4'>{isAuth.text}</Button>) : (<div/>))
};

export default ButtonAdd;