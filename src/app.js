/* eslint-disable linebreak-style */
import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // The functions that's outside from constructor have to be called into him.
    this.middlewares();
    this.routes();
  }

  // Thats a middleware which makes server handling json files
  middlewares() {
    this.server.use(express.json());
  }

  // We're going to import all of the routes from file routes.js
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
