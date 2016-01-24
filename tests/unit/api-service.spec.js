import '../../js/main';
import BookViewModel from '../../js/view-models/book-view-model';

describe('ApiService', () => {

  let apiService, $httpBackend;

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$httpBackend_, _ApiService_) => {
    $httpBackend = _$httpBackend_;
    apiService = _ApiService_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  const bookMocks = [{
    'id': 'b841267346',
    'genre': {
      'category': 'Non-Fiction',
      'name': 'History'
    },
    'author': {
      'avatar': 'http://lorempixel.com/250/250/',
      'name': 'JRR Tolkein'
    },
    'name': 'The Lord of the Rings'
  }, {
    'id': 'b284012025',
    'genre': {
      'category': 'Fiction',
      'name': 'Arts'
    },
    'author': {
      'avatar': 'http://lorempixel.com/250/250/',
      'name': 'Harper Lee'
    },
    'name': 'To Kill a Mockingbird'
  }];

  describe('bookGenres', () => {
    it('should call /api/book/genres', () => {
      $httpBackend.expectGET(/\/api\/book\/genres$/).respond();
      apiService.bookGenres.query();
      $httpBackend.flush();
    });
  });

  describe('bookCategories', () => {
    it('should call /api/book/categories', () => {
      $httpBackend.expectGET(/\/api\/book\/categories$/).respond();
      apiService.bookCategories.query();
      $httpBackend.flush();
    });
  });

  describe('bookSearch', () => {
    beforeEach(() => {
      $httpBackend.expectGET(/\/api\/book\/search$/).respond(bookMocks);
    });

    it('should call /api/book/search', () => {
      apiService.bookSearch.query();
      $httpBackend.flush();
    });

    it('should return instances of "BookViemModel"', () => {
      let results = apiService.bookSearch.query();
      $httpBackend.flush();
      for (let result of results) {
        expect(result instanceof BookViewModel).toBeTruthy();
      }
    });
  });

  describe('book', () => {
    beforeEach(() => {
      $httpBackend.expectGET(/\/api\/book\/the-book-id$/).respond(bookMocks[0]);
    });

    it('should call /api/book/:id', () => {
      apiService.book.get({
        id: 'the-book-id'
      });
      $httpBackend.flush();
    });

    it('should return instance of "BookViemModel"', () => {
      let result = apiService.book.get({
        id: 'the-book-id'
      });
      $httpBackend.flush();
      expect(result instanceof BookViewModel).toBeTruthy();
    });
  });

});
