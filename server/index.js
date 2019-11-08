import express from 'express';
import Loadable from 'react-loadable';
// const cookiesMiddleware = require('universal-cookie-express');

import indexController from './controllers/index';

const PORT = 3000;

// initialize the application and create the routes
const app = express();

// app.use(cookiesMiddleware());
app.use(indexController);
// start the app
Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }
    console.log(`listening on ${PORT}...`);
    return true;
  });
});
