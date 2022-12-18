import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';


// Mount function to start up the app
const mount = (el) => {

  const app = createApp(Dashboard)
  app.mount(el); // notice that this mount function is from vue. it's how vue show a component in the DOM
}

// If we are in development and in isolation,
// Call mount immediately
if(process.env.NODE_ENV === 'development') {

  const devRoot = document.querySelector('#_dashboard-dev-root')

  if(devRoot) {
    mount(devRoot)
  }
}


// We are running through container
// and we should export the mount function 

export { mount };