/**
 * API mocks
 * @module services/api-mocks
 */

/** Loading the books information file using JSPM's JSON loader plugin */
import jsonData from './books.json!json';

export default class ApiMocks {
  /** Used for simulating API data results */
  constructor() {
  }

  static get pageSize(){
    return 4;
  }

  static getJsonData(){
    return jsonData;
  }

  getPagedBooksSearch(params){
    let currentIndex = (params.page-1||0) * this.constructor.pageSize;
    return (this.paramsHaveValues(params) ? this.filterBookResults(params) : this.constructor.getJsonData())
      .slice(currentIndex, currentIndex + this.constructor.pageSize);
  }

  paramsHaveValues(params){
    return (params.category || params.genre || params.category) ? true : false;
  }

  filterBookResults(params){
    return this.constructor.getJsonData().filter(book =>
      (params.category ? this.normalizeString(book.genre.category) === this.normalizeString(params.category) : true) &&
      (params.genre ? this.normalizeString(book.genre.name) === this.normalizeString(params.genre) : true)
    );
  }

  normalizeString(str){
    return str.toLowerCase().replace(/\+/g, ' ');
  }

  getBookGenres() {
    return [
      'Arts',
      'Biographies',
      'Business',
      'Calendars',
      'Children\'s Books',
      'Christian Books',
      'Comics',
      'Computers',
      'Cookbooks',
      'Education',
      'Engineering',
      'Fantasy',
      'Health',
      'History',
      'Humor',
      'Law',
      'Literature',
      'Medical Books',
      'Parenting',
      'Politics',
      'Relationships',
      'Religion',
      'Romance',
      'Science Fiction',
      'Sciences',
      'Self-Help',
      'Social Sciences',
      'Spirituality',
      'Sports',
      'Technology',
      'Teen',
      'Thriller',
      'Travel'
    ];
  }

  getBookCategories() {
    return ['Fiction', 'Non-Fiction'];
  }
}
