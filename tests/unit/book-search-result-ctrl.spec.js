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
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('constructor', () => {
    it('should fetch first page', () => {
      $httpBackend.expectGET(/\/api\/book\/search\?page=1$/);
      let ctrl = getCtrl();
      $scope.$apply();
    });

    it('should set "loading" to true', () => {
      let ctrl = getCtrl();
      $scope.$apply();
      expect(ctrl.loading).toBeTruthy();
    });
  });

  describe('fetchNextPage', () => {
    let ctrl;
    beforeEach(() => {
      ctrl = getCtrl();
    });

    it('should change the "loading" property', () => {
      $httpBackend.expectGET(/\/api\/book\/search\?page=.+$/).respond();
      ctrl.fetchNextPage();
      $scope.$apply();
      expect(ctrl.loading).toBeTruthy();
      $httpBackend.flush();
      expect(ctrl.loading).toBeFalsy();
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

    it('should set the "noMoreResults" to true when no results are available', () => {
      $httpBackend.expectGET(/\/api\/book\/search\?page=.+$/).respond();
      ctrl.fetchNextPage();
      $scope.$apply();
      $httpBackend.flush();
      expect(ctrl.noMoreResults).toBeTruthy();
    });

    it('should set the "noMoreResults" to false when results are available', () => {
      $httpBackend.expectGET(/\/api\/book\/search\?page=.+$/).respond([1, 2, 3]);
      ctrl.fetchNextPage();
      $scope.$apply();
      $httpBackend.flush();
      expect(ctrl.noMoreResults).toBeFalsy();
    });

  });

});
