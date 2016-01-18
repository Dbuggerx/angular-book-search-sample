export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('books', {
      url: '/books',
      templateUrl: 'templates/books.html',
      controller: 'BooksCtrl',
      controllerAs: 'booksCtrl'
    });

  $urlRouterProvider.otherwise('/books');
}
