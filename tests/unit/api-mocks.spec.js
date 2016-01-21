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

  describe('filterBookResults', () => {
    it('should filter books by category', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue([{
        'genre': {
          'category': 'Non-Fiction',
          'name': 'History'
        }
      }, {
        'genre': {
          'category': 'Fiction',
          'name': 'Arts'
        }
      }]);
      let result1 = apiMock.filterBookResults({'category': 'Non-Fiction'});
      expect(result1.length).toBe(1);
      expect(result1[0].genre.category).toBe('Non-Fiction');

      let result2 = apiMock.filterBookResults({'category': 'Fiction'});
      expect(result2.length).toBe(1);
      expect(result2[0].genre.category).toBe('Fiction');
    });
  });

  describe('filterBookResults', () => {
    it('should filter books by genre', () => {
      spyOn(ApiMocks, 'getJsonData').and.returnValue([{
        'genre': {
          'category': 'Non-Fiction',
          'name': 'History'
        }
      }, {
        'genre': {
          'category': 'Fiction',
          'name': 'Arts'
        }
      }]);
      let result1 = apiMock.filterBookResults({'genre': 'History'});
      expect(result1.length).toBe(1);
      expect(result1[0].genre.name).toBe('History');

      let result2 = apiMock.filterBookResults({'genre': 'Arts'});
      expect(result2.length).toBe(1);
      expect(result2[0].genre.name).toBe('Arts');
    });
  });

  describe('paramsHaveValues', () => {
    it('should tell if any value is present, besides the page', () => {
      expect(apiMock.paramsHaveValues({})).toBeFalsy();
      expect(apiMock.paramsHaveValues({category: 'test'})).toBeTruthy();
      expect(apiMock.paramsHaveValues({genre: 'test'})).toBeTruthy();
      expect(apiMock.paramsHaveValues({category: 'test', genre: 'test'})).toBeTruthy();
    });
  });

});
