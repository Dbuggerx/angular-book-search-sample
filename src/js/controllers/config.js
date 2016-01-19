/** @module controllers/config */

import angular from 'angular';
import BooksCtrl from './books-ctrl';

/**
 * Here's where all the controllers are configured into the 'BooksChallenge' module
 *
 */
export default function () {
  angular.module('BooksChallenge')
    .controller('BooksCtrl', BooksCtrl);
}
