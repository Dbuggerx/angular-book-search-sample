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
          value: 'Category',
          squash: true
        },
        genre: {
          value: 'Genre',
          squash: true
        }
      },
      views: {
        "": {
          templateUrl: 'templates/books/list.html',
          controller: 'BookSearchResultsCtrl',
          controllerAs: 'bookSearchResultsCtrl'
        },
        "header": {
          templateUrl: 'templates/books/header-search.html',
          controller: 'BookSearchParamsCtrl',
          controllerAs: 'bookSearchParamsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/books/search');
}
