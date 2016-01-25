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
    this.loading = true;
    this.noMoreResults = false;
    this.results = [];
    this.fetchNextPage();
  }

  fetchNextPage() {
    this.loading = true;
    const self = privates.get(this);
    self.$stateParams.page = ++self.currentPage;
    self.api.query(self.$stateParams, data => {
      this.noMoreResults = data.length === 0;
      this.results = this.results.concat(data);
      this.loading = false;
    });
  }

}
