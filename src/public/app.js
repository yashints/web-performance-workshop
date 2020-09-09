'use strict';

import './globals.js';
import '@fortawesome/fontawesome-free/css/all.css';

import Error404 from './views/pages/Error404.js';
import Navbar from './views/components/Navbar.js';
import Footer from './views/components/Footer.js';

import Utils from './services/Utils.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {  
  '/': import('./views/pages/Home.js'),
  '/about': import('./views/pages/About.js'),
  '/tickets': import('./views/pages/Tickets.js'),
  '/disruptions': import('./views/pages/Disruptions.js'),
  '/lost-found': import('./views/pages/LostFound.js'),
  '/history': import('./views/pages/History.js'),
  '/gallery': import('./views/pages/Gallery.js'),
  '/surprise': import('./views/pages/Surprise.js')
};

(async () => {  
  const header = null || document.getElementById('header_container');
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  const footer = null || document.getElementById('footer_container');
  footer.innerHTML = await Footer.render();
  await Footer.after_render();
})();

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => { 
  
  const content = null || document.getElementById('page_container');
  content.innerHTML = `<div>Loading...</div>`;     

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page;
  if(routes[parsedURL]) {
    const module = await routes[parsedURL];
    page = module.default;
  } else {
    page = await import('./views/pages/Error404.js').default;
  }

  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
