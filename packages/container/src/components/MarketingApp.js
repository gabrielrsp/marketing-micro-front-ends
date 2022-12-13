import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null) // create a reference for an HTML element

  const history = useHistory()

  //useEffect hook determines what's gonna be executed when this component shows up
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => { // descruct pathname and renaming to nextPathname
        const { pathname } = history.location;

        if(pathname !== nextPathname) {
          history.push(nextPathname);
        }
      }
    });

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />;
}