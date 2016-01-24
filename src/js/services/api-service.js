import BookViewModel from '../view-models/book-view-model';
import angular from 'angular';
const privates = new WeakMap();

export default class ApiService {
  /**
   * Wraps the API endpoints with ngResource
   * @param {ngResource} - The injected {@link https://docs.angularjs.org/api/ngResource/service/$resource $resource} from AngularJS
   */
  constructor($resource) {
    'ngInject';

    const baseUrl = 'http://www.once-upon-api.com'; //The API URL (if it existed)
    const bookGenres = $resource(baseUrl + '/api/book/genres');
    const bookCategories = $resource(baseUrl + '/api/book/categories');
    const bookSearch = $resource(baseUrl + '/api/book/search');
    bookSearch.prototype = BookViewModel.prototype;
    const book = $resource(baseUrl + '/api/book/:id', {
      id: '@id'
    });
    book.prototype = BookViewModel.prototype;

    privates.set(this, {
      $resource,
      bookGenres,
      bookSearch,
      bookCategories,
      book
    });
  }

  /**
   * Returns the "book genres" resource object
   */
  get bookGenres() {
    return privates.get(this).bookGenres;
  }

  /**
   * Returns the "book categories" resource object
   */
  get bookCategories() {
    return privates.get(this).bookCategories;
  }

  /**
   * Returns the "book search" resource object
   */
  get bookSearch() {
    return privates.get(this).bookSearch;
  }

  /**
   * Returns the "book" resource object
   */
  get book() {
    return privates.get(this).book;
  }
}
