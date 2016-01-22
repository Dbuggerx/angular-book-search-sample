import ApiMocks from '../../js/services/api-mocks';

describe('ApiMocks', () => {

  let apiMock;
  beforeEach(() => {
    apiMock = new ApiMocks();
  });

  it('should be defined', () => {
    expect(ApiMocks).toBeDefined();
  });

  describe('getBookGenres', () => {
    it('should return results', () => {
      expect(apiMock.getBookGenres().length > 0).toBeTruthy();
    });
  });

  describe('getBookCategories', () => {
    it('should return results', () => {
      expect(apiMock.getBookCategories().length > 0).toBeTruthy();
    });
  });

  describe('pageSize', () => {
    it('should be greater than 0', () => {
      expect(ApiMocks.pageSize > 0).toBeTruthy();
    });
  });

  describe('getPagedBooksSearch', () => {
    it('should return paged results', () => {
      expect(apiMock.getPagedBooksSearch(1).length).toBe(ApiMocks.pageSize);
    });
  });

  const bookMocks = [{
    'genre': {
      'category': 'Non-Fiction',
      'name': 'History'
    },
    "author": {
      "avatar": "http://lorempixel.com/250/250/",
      "name": "JRR Tolkein"
    },
    "name": "The Lord of the Rings"
  }, {
    'genre': {
      'category': 'Fiction',
      'name': 'Arts'
    },
    "author": {
      "avatar": "http://lorempixel.com/250/250/",
      "name": "Harper Lee"
    },
    "name": "To Kill a Mockingbird"
  }];

  describe('filterBookResults', () => {
    it('should filter books by category', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue(bookMocks);
      let result1 = apiMock.filterBookResults({
        'category': 'Non-Fiction'
      });
      expect(result1.length).toBe(1);
      expect(result1[0].genre.category).toBe('Non-Fiction');

      let result2 = apiMock.filterBookResults({
        'category': 'Fiction'
      });
      expect(result2.length).toBe(1);
      expect(result2[0].genre.category).toBe('Fiction');
    });

    it('should filter books by genre', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue(bookMocks);
      let result1 = apiMock.filterBookResults({
        'genre': 'History'
      });
      expect(result1.length).toBe(1);
      expect(result1[0].genre.name).toBe('History');

      let result2 = apiMock.filterBookResults({
        'genre': 'Arts'
      });
      expect(result2.length).toBe(1);
      expect(result2[0].genre.name).toBe('Arts');
    });

    it('should filter books by the author\'s name', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue(bookMocks);
      let result1 = apiMock.filterBookResults({
        'query': 'Tolkein'
      });
      expect(result1.length).toBe(1);
      expect(result1[0].author.name).toBe('JRR Tolkein');

      let result2 = apiMock.filterBookResults({
        'query': 'Harper'
      });
      expect(result2.length).toBe(1);
      expect(result2[0].author.name).toBe('Harper Lee');
    });

    it('should filter books by name', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue(bookMocks);
      let result1 = apiMock.filterBookResults({
        'query': 'Rings'
      });
      expect(result1.length).toBe(1);
      expect(result1[0].name).toBe('The Lord of the Rings');

      let result2 = apiMock.filterBookResults({
        'query': 'Mockingbird'
      });
      expect(result2.length).toBe(1);
      expect(result2[0].name).toBe('To Kill a Mockingbird');
    });
  });

  describe('paramsHaveValues', () => {
    it('should tell if any value is present, besides the page', () => {
      expect(apiMock.paramsHaveValues({})).toBeFalsy();
      expect(apiMock.paramsHaveValues({
        category: 'test'
      })).toBeTruthy();
      expect(apiMock.paramsHaveValues({
        genre: 'test'
      })).toBeTruthy();
      expect(apiMock.paramsHaveValues({
        category: 'test',
        genre: 'test'
      })).toBeTruthy();
    });
  });

  describe('normalizeString', () => {
    it('should return lower case text', () => {
      expect(apiMock.normalizeString('TEST')).toBe('test');
    });

    it('should trim the text', () => {
      expect(apiMock.normalizeString(' test ')).toBe('test');
    });

    it('should decode URI encoded params', () => {
      expect(apiMock.normalizeString('my%20test')).toBe('my test');
      expect(apiMock.normalizeString('my+test')).toBe('my test');
    });
  });

  describe('bookPropMatchesExactVal', () => {
    it('returns true when the value is not given', () => {
      expect(apiMock.bookPropMatchesExactVal('prop')).toBeTruthy();
    });

    it('returns true when the values are equal', () => {
      expect(apiMock.bookPropMatchesExactVal('test', 'TEST')).toBeTruthy();
    });

    it('returns false when the values are not equal', () => {
      expect(apiMock.bookPropMatchesExactVal('test', 'testing')).toBeFalsy();
    });
  });

});
