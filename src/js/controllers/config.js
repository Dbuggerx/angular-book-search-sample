/**
 * Controllers configurations.
 * @module controllers/config
 */
import angular from 'angular';
import BooksCtrl from './books-ctrl';

/**
 * Here's where all controllers are configured into the 'BooksChallenge' module
 * @see module:main
 */
export default function () {
  angular.module('BooksChallenge')
    .controller('BooksCtrl', BooksCtrl);
}
