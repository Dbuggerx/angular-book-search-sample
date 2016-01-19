export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('books', {
      abstract: true,
      url: '/books',
      controller: 'BooksCtrl',
      controllerAs: 'booksCtrl',
      templateUrl: 'templates/layout.html',
    })
    .state('books.search', {
      url: '/search',
      views: {
        "": {
          templateUrl: 'templates/books/list.html',
        },
        "header": {
          templateUrl: 'templates/books/header-search.html',
        }
      }
    });

  $urlRouterProvider.otherwise('/books/search');
}
