import React from 'react';
import AuthenticatedScreen from './authenticated-app';
import { useAuth } from './context/auth_context';
import UnAuthenticatedScreen from './unauthenticated-app';
import './App.less'
import { ErrorBoundary } from './components/error-bounray';
import { FullPageErrorFallback } from './components/libs';

import { BrowserRouter } from 'react-router-dom'


function App() {

  const { user } = useAuth()

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback} >
      <BrowserRouter>
        {
          user ? <AuthenticatedScreen /> : <UnAuthenticatedScreen />
        }
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
