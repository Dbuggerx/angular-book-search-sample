/**
 * This function adds one to its input.
 */

import $ from 'jquery';
import angular from 'angular';
import '../templates';
import './config/plugins';
import routes from './config/routes';
import httpBackend from './config/http-backend';
import configControllers from './controllers/config';
import configDirectives from './directives/config';

let app = angular.module('BooksChallenge', ['templates', 'ui.router', 'ngMockE2E']);

app
  .config(routes)
  .run(httpBackend);

configControllers();
configDirectives();
