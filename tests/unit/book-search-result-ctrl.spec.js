import '../../js/main';

describe('BookSearchResultsCtrl', () => {

  let $controller, $scope, $httpBackend, $stateParams;

  let getCtrl = () => {
    return $controller('BookSearchResultsCtrl', {
      $scope,
      $stateParams: {}
    });
  };

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$controller_, _$rootScope_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    // $httpBackend.expectGET(/\/api\/book\/search?\?(.+\=.+)+$/).respond(['book1', 'book2', 'book3']);
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('constructor', () => {
    it('should fetch first page', () => {
      $scope.$digest();
      $httpBackend.expectGET(/\/api\/book\/search\?page=1$/);
      let ctrl = getCtrl();
      $scope.$apply();
    });
  });

  describe('fetchNextPage', () => {
    let ctrl;
    beforeEach(() => {
      ctrl = getCtrl();
    });

    it('should increment the page number on each call', () => {
      $httpBackend.expectGET(/\/api\/book\/search\?page=1$/).respond();
      $scope.$apply();
      $httpBackend.flush();
      $httpBackend.expectGET(/\/api\/book\/search\?page=2$/).respond();
      ctrl.fetchNextPage();
      $scope.$apply();
      $httpBackend.flush();
    });

    it('should concat each page\'s data', () => {
      expect(ctrl.results.length).toBe(0);
      $scope.$apply();
      $httpBackend.expectGET(/\/api\/book\/search\?page=.+$/).respond([1, 2, 3]);
      ctrl.fetchNextPage();
      $scope.$apply();
      $httpBackend.flush();
      expect(ctrl.results).toEqual([1, 2, 3]);
      $httpBackend.expectGET(/\/api\/book\/search\?page=.+$/).respond([4, 5, 6]);
      ctrl.fetchNextPage();
      $scope.$apply();
      $httpBackend.flush();
      expect(ctrl.results).toEqual([1, 2, 3, 4, 5, 6]);
    });

  });

});
