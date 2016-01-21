export default function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/books/book-card.html',
    scope: {
      book: '='
    },
    controller($scope, $state) {
      'ngInject';
      this.gotoDetails = () =>{
        $state.go('books.details', {id: $scope.book.id});
      };
    },
    controllerAs: 'bookCardCtrl'
  };
}
