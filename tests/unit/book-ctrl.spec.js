import '../../js/main';

describe('BooksCtrl', () => {

  let $controller, $scope, $httpBackend, ctrl;

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$controller_, _$rootScope_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(/\/api\/book\/genres/).respond(['a', 'b', 'c']);
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    ctrl = $controller('BooksCtrl', {
      $scope
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
  });

});
