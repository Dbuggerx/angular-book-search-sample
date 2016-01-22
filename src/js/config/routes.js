export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('books', {
      abstract: true,
      url: '/books',
      templateUrl: 'templates/books/layout.html',
    })
    .state('books.search', {
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
          templateUrl: 'templates/books/search-results.html',
          controller: 'BookSearchResultsCtrl',
          controllerAs: 'bookSearchResultsCtrl'
        },
        "header": {
          templateUrl: 'templates/books/search-header.html',
          controller: 'BookSearchParamsCtrl',
          controllerAs: 'bookSearchParamsCtrl'
        }
      }
    })
    .state('books.details', {
      url: '/details/:id',
      views: {
        "": {
          templateUrl: 'templates/books/details.html',
          controller: 'BookDetailsCtrl',
          controllerAs: 'bookDetailsCtrl'
        },
        "header": {
          templateUrl: 'templates/books/details-header.html',
          controller: 'BookSearchParamsCtrl',
          controllerAs: 'bookSearchParamsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/books/search');
}
