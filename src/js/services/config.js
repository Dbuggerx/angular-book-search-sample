/**
 * Services configurations.
 * @module services/config
 */
import angular from 'angular';
import ApiService from './api-service';
import ApiMocks from './api-mocks';

/**
 * Here's where all services are configured into the 'BooksChallenge' module
 * @see module:main
 */
export default function () {
  angular.module('BooksChallenge')
    .service('ApiService', ApiService)
    .service('ApiMocks', ApiMocks);
}
