import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {
  const ref = useRef(null) // create a reference for an HTML element

  const history = useHistory()

  //useEffect hook determines what's gonna be executed when this component shows up
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => { // descruct pathname and renaming to nextPathname
        const { pathname } = history.location;

        if(pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn
    });

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />;
}