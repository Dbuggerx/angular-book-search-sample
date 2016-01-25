import '../../js/main';

describe('BookDetailsCtrl', () => {

  let $controller, $scope, $httpBackend, $stateParams;

  let getCtrl = () => {
    return $controller('BookDetailsCtrl', {
      $scope,
      $stateParams: {
        id: 'testId'
      }
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
    beforeEach(() => {
      $httpBackend.expectGET(/\/api\/book\/.+$/).respond({
        'genre': {
          'category': 'Non-Fiction',
          'name': 'History'
        }
      });
    });

    it('should fetch book details', () => {
      let ctrl = getCtrl();
      $scope.$apply();
      $httpBackend.flush();
    });

    it('should fetch related books', () => {
      $httpBackend.expectGET(/\/api\/book\/related\?id=testId&qty=3$/).respond();
      let ctrl = getCtrl();
      $scope.$apply();
      $httpBackend.flush();
    });
  });


});
