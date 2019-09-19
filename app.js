const express = require('express');
const appConfig = require('./src/config/app-config.js');
const routeConfig = require('./src/config/route-config.js');
const dbConfig = require('./src/config/db-config.js');

const app = express();

appConfig.init(app, express);
routeConfig.init(app);
dbConfig.init();

module.exports = app;
