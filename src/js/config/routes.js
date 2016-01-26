/**
 * @module config/routes
 */

/**
 * Routes Configuration
 * @param  {$stateProvider} $stateProvider
 * @param  {$urlRouterProvider} $urlRouterProvider
 */
export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('search', {
      url: '/search?category&genre&query',
      params: {
        category: {
          squash: true
        },
        genre: {
          squash: true
        }
      },
      views: {
        "": {
          templateUrl: 'templates/search.html',
          controller: 'BookSearchResultsCtrl',
          controllerAs: 'bookSearchResultsCtrl'
        },
        "header@search": {
          templateUrl: 'templates/search-header.html',
          controller: 'BookSearchParamsCtrl',
          controllerAs: 'bookSearchParamsCtrl'
        }
      }
    })
    .state('details', {
      url: '/details/:id',
      views: {
        "": {
          templateUrl: 'templates/details.html',
          controller: 'BookDetailsCtrl',
          controllerAs: 'bookDetailsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/search');
}
