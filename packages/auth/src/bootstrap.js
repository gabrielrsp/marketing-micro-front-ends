import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history'


// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  }) // we are creating our history here cause we're going to eventually add in a lot of code
 
  if (onNavigate) {
     history.listen(onNavigate); // event listener that call a function as a callback (that provides by default the location as a parameter) any times it detects a navigation
  }

  ReactDOM.render(
    <App history={history}/>,
    el
  );

  return {
    
    onParentNavigate({pathname: nextPathname}) {  //for anytime a parent (or container) does some kind of navigation we want to have it monitored on "onParentNavigate"
      const { pathname } = history.location 
      
      if(pathname !== nextPathname) {
        history.push(nextPathname)
      }
    } 
    
  }
}

// If we are in development and in isolation,
// Call mount immediately
if(process.env.NODE_ENV === 'development') {

  const devRoot = document.querySelector('#_auth-dev-root')

  if(devRoot) {
    mount(devRoot, {defaultHistory: createBrowserHistory() })
  }
}


// We are running through container
// and we should export the mount function 

export { mount };