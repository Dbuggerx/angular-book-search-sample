export default class BookDetailsCtrl {
  /** Controller responsible for the book details. */
  constructor(ApiService, $stateParams) {
    'ngInject';
    this.bookData = ApiService.book.get({id: $stateParams.id});
  }

}
