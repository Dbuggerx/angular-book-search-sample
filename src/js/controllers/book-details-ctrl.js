export default class BookDetailsCtrl {
  /** Controller responsible for the book details. */
  constructor(ApiService, $stateParams) {
    'ngInject';
    this.bookData = ApiService.book.get({id: $stateParams.id});
    this.relatedBooks = ApiService.relatedBooks.query({
      id: $stateParams.id,
      qty: 3
    });
  }
}
