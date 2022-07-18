import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import AppRouter from './components/AppRouter';
import {check} from "./http/userAPI";
import NavBar from './components/NavBar';
import { Spinner } from 'react-bootstrap';

function App() {
  const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <>
      <NavBar/>
       <AppRouter/>
       </>
  );
}

export default observer(App);
