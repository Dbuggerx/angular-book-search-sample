const privates = new WeakMap();

export default class BookSearchParamsCtrl {
  /** Controller responsible for the parameters in the books page. */
  constructor(ApiService, $scope, $state, $stateParams) {
    'ngInject';

    privates.set(this, {
      $state
    });

    this.bookGenres = ApiService.bookGenres.query();
    this.bookCategories = ApiService.bookCategories.query();
    this.selectedParams = {
      genre: $stateParams.genre,
      category: $stateParams.category,
      query: $stateParams.query
    };

    $scope.$watch(() => this.selectedParams.genre, () => this.search());
    $scope.$watch(() => this.selectedParams.category, () => this.search());
  }

  search() {
    privates.get(this).$state.go('books.search', {
      'genre': this.selectedParams.genre,
      'category': this.selectedParams.category,
      'query': this.selectedParams.query
    });
  }
}
