import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Signin from './components/Signin'
import Signup from './components/Signup'
/*
  BrowserRouter: Create a copy of browser history
  Router: Create a copy of router that doesn't make its own history, we need to provide it some history to use
*/


// this will add a prefix to all css classes generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'au'
});

export default ({history, onSignIn}) => {
  return <div>
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin">
            <Signin onSignIn={onSignIn} />
          </Route>
          <Route path="/auth/signup" >
            <Signup onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  </div>
}