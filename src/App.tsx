import React from 'react';
import AuthenticatedScreen from './authenticated-app';
import { useAuth } from './context/auth_context';
import UnAuthenticatedScreen from './unauthenticated-app';
import './App.less'
import { ErrorBoundary } from './components/error-bounray';
import { FullPageErrorFallback } from './components/libs';


function App() {

  const { user } = useAuth()

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback} >
      {
        user ? <AuthenticatedScreen /> : <UnAuthenticatedScreen />
      }
    </ErrorBoundary>
  );
}

export default App;
