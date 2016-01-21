/** @module main */

import $ from 'jquery';
import angular from 'angular';
import './templates';
import configPlugins from './config/plugins';
import routes from './config/routes';
import httpBackend from './config/http-backend';
import configServices from './services/config';
import configControllers from './controllers/config';
import configDirectives from './directives/config';

/** BooksChallenge' module definition */
let app = angular.module('BooksChallenge', ['templates', 'ui.router',
  'ngMockE2E', 'ngResource', 'infinite-scroll']);

app
  .config(routes)
  .run(httpBackend);

configPlugins();
configServices();
configControllers();
configDirectives();
