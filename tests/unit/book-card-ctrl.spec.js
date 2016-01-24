import '../../js/main';

describe('BookCardCtrl', () => {

  let $scope, $stateSpy, ctrl;

  beforeEach(angular.mock.module('BooksChallenge'));
  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $stateSpy = jasmine.createSpyObj('$stateSpy', ['go']);
    $scope.book = {
      id: 'fake-book-id'
    };
    ctrl = $controller('BookCardCtrl', {
      $scope,
      $state: $stateSpy
    });
    $scope.$apply();
  }));

  describe('gotoDetails', () => {
    it('should go to the "details" state', () => {
      ctrl.gotoDetails();
      $scope.$apply();
      expect($stateSpy.go.calls.mostRecent().args).toEqual(['details', {
        id: 'fake-book-id'
      }]);
    });
  });


});
