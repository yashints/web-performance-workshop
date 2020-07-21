'use strict';

import Home from './views/pages/Home.js';
import About from './views/pages/About.js';
import Error404 from './views/pages/Error404.js';
import Tickets from './views/pages/Tickets.js';
import Disruptions from './views/pages/Disruptions.js';

import Navbar from './views/components/Navbar.js';
import Footer from './views/components/Footer.js';

import Utils from './services/Utils.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Home,
  '/about': About,
  '/tickets': Tickets,
  '/disruptions': Disruptions,
};

(async () => {
  // Render the Header and footer of the page
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

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
