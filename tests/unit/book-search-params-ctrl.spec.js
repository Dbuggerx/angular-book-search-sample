import '../../js/main';

describe('BookSearchParamsCtrl', () => {

  let $controller, $scope, $httpBackend, $stateParams, ctrl;

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$controller_, _$rootScope_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(/\/api\/book\/genres/).respond(['genre1', 'genre2', 'genre3']);
    $httpBackend.expectGET(/\/api\/book\/categories/).respond(['category1', 'category2']);
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    ctrl = $controller('BookSearchParamsCtrl', {
      $scope,
      $state: jasmine.createSpyObj('$state', ['go']),
      $stateParams: {}
    });
    $scope.$apply();
    $httpBackend.flush();
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
  });

});
