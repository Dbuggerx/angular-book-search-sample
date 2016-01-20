const privates = new WeakMap();

export default class BookSearchResultsCtrl {
  /** Controller responsible for the results in the books page. */
  constructor(ApiService, $state, $stateParams) {
    'ngInject';

    privates.set(this, {
      api: ApiService
    });
  }

  searchForBooks(){
    return privates.get(this).api.bookSearch.query({

    });
  }
}
