/**
 * Controllers configurations.
 * @module controllers/config
 */
import angular from 'angular';
import BookSearchParamsCtrl from './book-search-params-ctrl';
import BookSearchResultsCtrl from './book-search-results-ctrl';
import BookDetailsCtrl from './book-details--ctrl';

/**
 * Here's where all controllers are configured into the 'BooksChallenge' module
 * @see module:main
 */
export default function () {
  angular.module('BooksChallenge')
    .controller('BookSearchParamsCtrl', BookSearchParamsCtrl)
    .controller('BookSearchResultsCtrl', BookSearchResultsCtrl)
    .controller('BookDetailsCtrl', BookDetailsCtrl);
}
