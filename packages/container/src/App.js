import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'


const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

//these lazy componentes will be loaded only when requested their pages
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  //remember to put specific routes ('/example') before root routes( only '/' )
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
            <Suspense fallback={<Progress/>}>
              <Switch>
                <Route path="/auth">
                 <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/dashboard" component={DashboardLazy} />
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
      </StylesProvider>
      </BrowserRouter>
  ) 
};

