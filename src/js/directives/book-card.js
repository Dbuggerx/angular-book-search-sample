import moment from 'moment';

export default function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/book-card.html',
    scope: {
      book: '='
    },
    controller: 'BookCardCtrl',
    controllerAs: 'bookCardCtrl'
  };
}
