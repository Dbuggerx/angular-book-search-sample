/** Loading the books information file using JSPM's JSON loader plugin */
import jsonData from './books.json!json';

export default class ApiMocks {
  /**
   * Used to simulate API responses
   */
  constructor() {}

  /**
   * Returns the amount of books to return on each response
   * @return {int}
   */
  static get pageSize() {
    return 8;
  }

  /**
   * Returns the books data
   * @return {array}
   */
  static getJsonData() {
    return jsonData;
  }

  /**
   * Returns a book by id
   * @param {string} id - The desired book id
   * @return {obj} - The corresponding book, or undefined
   */
  getBookById(id){
    for(let book of this.constructor.getJsonData())
      if(this.bookPropEqualsVal(book.id, id))
        return book;
  }

  /**
   * Searchs by the given parameters, and returns a page of results
   * @param {obj} params - An object containing the search parameters
   * @return {array} - A page of filtered books
   */
  getPagedBooksSearch(params) {
    let currentIndex = (params.page - 1 || 0) * this.constructor.pageSize;
    return (this.paramsHaveValues(params) ? this.filterBookResults(params) : this.constructor.getJsonData())
      .slice(currentIndex, currentIndex + this.constructor.pageSize);
  }

  /**
   * Checks if any parameter is given
   * @param {obj} params - An object containing the parameters
   * @return {array} - The filtered books
   */
  paramsHaveValues(params) {
    return (params.category || params.genre || params.query) ? true : false;
  }

  /**
   * Filters the book data by the given parameters
   * @return {array} - The filtered books
   */
  filterBookResults(params) {
    return this.constructor.getJsonData().filter(book =>
      this.bookPropEqualsVal(book.genre.category, params.category) &&
      this.bookPropEqualsVal(book.genre.name, params.genre) &&
      (this.bookPropContainsVal(book.author.name, params.query) ||
      this.bookPropContainsVal(book.name, params.query))
    );
  }

  /**
   * Matches the exact value, when value is given.
   * @param {string} bookProp - The book property.
   * @param {string} val - The value to search.
   * @return {bool} - True if val is null, otherwise the match result
   */
  bookPropEqualsVal(bookProp, val) {
    return val ? this.normalizeString(bookProp) === this.normalizeString(val) : true;
  }

  /**
   * Checks if the property contains the given value.
   * @param {string} bookProp - The book property.
   * @param {string} val - The value to search.
   * @return {bool} - True if val is null, otherwise the search result
   */
  bookPropContainsVal(bookProp, val) {
    return val ? this.normalizeString(bookProp).indexOf(this.normalizeString(val)) !== -1 : true;
  }

  /**
   * Normalizes the string, making it useful for comparisons
   * @param {string} str - The string to normalize
   * @return {string} - The normalized string
   */
  normalizeString(str) {
    return decodeURIComponent(str.toLowerCase().replace(/\+/g, ' ')).trim();
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
