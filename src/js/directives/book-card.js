export default function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/books/book-card.html',
    scope: {
      book: '='
    },
    controller($scope, $state) {
      'ngInject';
      this.book = $scope.book;
      this.gotoDetails = () =>{
        $state.go('books.details', {id: this.book});
      };
    },
    controllerAs: 'bookCardCtrl'
  };
}
