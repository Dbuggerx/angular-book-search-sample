const privates = new WeakMap();

export default class BookSearchResultsCtrl {
  /** Controller responsible for the results in the books page. */
  constructor(ApiService, $stateParams) {
    'ngInject';
    privates.set(this, {
      $stateParams,
      api: ApiService.bookSearch,
      currentPage: 0
    });
    this.results = [];
    this.fetchNextPage();
  }

  fetchNextPage() {
    const self = privates.get(this);
    self.$stateParams.page = ++self.currentPage;
    self.api.query(self.$stateParams).$promise
      .then(data => this.results = this.results.concat(data));
  }

}
