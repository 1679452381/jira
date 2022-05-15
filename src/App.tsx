import React from 'react';
import AuthenticatedScreen from './authenticated-app';
import { useAuth } from './context/auth_context';
import UnAuthenticatedScreen from './unauthenticated-app';
import './App.less'


function App() {

  const { user } = useAuth()

  return (
    <div >
      {
        user ? <AuthenticatedScreen /> : <UnAuthenticatedScreen />
      }
    </div>
  );
}

export default App;
