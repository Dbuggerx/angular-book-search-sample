export default class BooksCtrl {
  /** Controller responsible for the books page. */
  constructor(ApiService) {
    'ngInject';
    this.bookGenres = ApiService.bookGenres.query();
  }
}
