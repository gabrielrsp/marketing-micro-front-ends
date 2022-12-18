import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Router, Redirect } from 'react-router-dom'
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

//these lazy componentes will be loaded only when requested their pages
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if(isSignedIn) {
      history.push('/dashboard')
    }

    /* 
      We don't want to set push to root route here if user is not signed in
      Because every time the user first come to this application it will trigger that function no matter what
    */

  }, [isSignedIn])

  /* 
    whenever we create a browser router, that internally creates a browser history for us
    we need to get access to that history instance, so we can somehow redirect the user around our application
  */


  //remember to put specific routes ('/example') before root routes( only '/' )
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
            <Suspense fallback={<Progress/>}>
              <Switch>
                <Route path="/auth">
                 <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/dashboard" >
                  { !isSignedIn && <Redirect to="/"/> }
                  <DashboardLazy/>
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
      </StylesProvider>
      </Router>
  ) 
};

