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

  it('should be defined', () => {
    expect(ctrl).toBeDefined();
  });

  describe('constructor', () => {
    it('should get book genres', () => {
      expect(ctrl.bookGenres.length).toBe(3);
    });

    it('should get book categories', () => {
      expect(ctrl.bookCategories.length).toBe(2);
    });

    it('should watch the selected genre and call search', () => {
      spyOn(ctrl, 'search');
      ctrl.selectedParams.genre = 'test';
      $scope.$apply();
      expect(ctrl.search.calls.count()).toBe(1);
    });

    it('should watch the selected category and call search', () => {
      spyOn(ctrl, 'search');
      ctrl.selectedParams.category = 'test';
      $scope.$apply();
      expect(ctrl.search.calls.count()).toBe(1);
    });
  });

  describe('search', () => {
    it('should send correct parameters', () => {
      ctrl.selectedParams.genre = 'genre test';
      ctrl.selectedParams.category = 'category test';
      ctrl.selectedParams.query = 'query test';
      $scope.$apply();
      expect($stateSpy.go).toHaveBeenCalledWith('books.search', {
        genre: 'genre test',
        category: 'category test',
        query: 'query test'
      });
    });
  });

});
