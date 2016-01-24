import moment from 'moment';

export default function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/books/book-card.html',
    scope: {
      book: '='
    },
    controller: 'BookCardCtrl',
    controllerAs: 'bookCardCtrl'
  };
}
