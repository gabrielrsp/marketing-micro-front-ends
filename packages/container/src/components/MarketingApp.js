import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null) // create a reference for an HTML element

  //useEffect hook determines what's gonna be executed when this component shows up
  useEffect(() => {
    mount(ref.current);
  }, [])

  return <div ref={ref} />;
}