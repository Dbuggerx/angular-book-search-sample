const privates = new WeakMap();
export default class BookCardCtrl {
  /** Controller responsible for the book card directive. */
  constructor($scope, $state) {
    'ngInject';
    this.book = $scope.book;
    privates.set(this, { $state });
  }

  gotoDetails(){
    privates.get(this).$state.go('details', {id: this.book.id});
  }
}
