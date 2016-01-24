import '../../js/main';

describe('BookSearchParamsCtrl', () => {

  let $controller, $scope, $httpBackend, $stateParams, ctrl, $stateSpy;

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$controller_, _$rootScope_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(/\/api\/book\/genres/).respond(['genre1', 'genre2', 'genre3']);
    $httpBackend.expectGET(/\/api\/book\/categories/).respond(['category1', 'category2']);
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $stateSpy = jasmine.createSpyObj('$stateSpy', ['go']);
    ctrl = $controller('BookSearchParamsCtrl', {
      $scope,
      $state: $stateSpy,
      $stateParams: {}
    });
    $scope.$apply();
    $httpBackend.flush();
    $stateSpy.go.calls.reset();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('constructor', () => {
    it('should get book genres', () => {
      expect(ctrl.bookGenres.length).toBe(4);
    });

    it('should get book categories', () => {
      expect(ctrl.bookCategories.length).toBe(3);
    });

  });

  describe('selectedGenre', () => {
    it('should call "search" when changed', () => {
      spyOn(ctrl, 'search');
      ctrl.selectedGenre = 'test';
      $scope.$apply();
      expect(ctrl.search.calls.count()).toBe(1);
    });
  });

  describe('selectedCategory', () => {
    it('should call "search" when changed', () => {
      spyOn(ctrl, 'search');
      ctrl.selectedCategory = 'test';
      $scope.$apply();
      expect(ctrl.search.calls.count()).toBe(1);
    });
  });

  describe('search', () => {
    it('should send correct parameters', () => {
      ctrl.selectedQuery = 'query test';
      ctrl.selectedGenre = 'genre test';
      ctrl.selectedCategory = 'category test';
      $scope.$apply();
      expect($stateSpy.go.calls.mostRecent().args).toEqual(['search', {
        genre: 'genre test',
        category: 'category test',
        query: 'query test'
      }]);
    });
  });

});
