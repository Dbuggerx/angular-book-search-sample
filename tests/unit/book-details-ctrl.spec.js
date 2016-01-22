import '../../js/main';

describe('BookDetailsCtrl', () => {

  let $controller, $scope, $httpBackend, $stateParams;

  let getCtrl = () => {
    return $controller('BookDetailsCtrl', {
      $scope,
      $stateParams: {id: 'testId'}
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
    it('should fetch book details', () => {
      $scope.$digest();
      $httpBackend.expectGET(/\/api\/book\/.+$/).respond();
      let ctrl = getCtrl();
      $scope.$apply();
      $httpBackend.flush();
    });
  });

});
