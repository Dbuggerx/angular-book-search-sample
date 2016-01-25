export default class BookDetailsCtrl {
  /** Controller responsible for the book details. */
  constructor(ApiService, $stateParams) {
    'ngInject';
    this.loadingBook = true;
    this.loadingRelated = true;

    this.bookData = ApiService.book.get({id: $stateParams.id}, () => {
      this.loadingBook = false;
    });
    this.relatedBooks = ApiService.relatedBooks.query({
      id: $stateParams.id,
      qty: 3
    }, () => {
      this.loadingRelated = false;
    });
  }
}
