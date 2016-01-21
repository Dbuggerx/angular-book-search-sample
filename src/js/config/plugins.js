import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import 'angular-resource';
import 'ngInfiniteScroll';

export default function () {
  angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 750);
}
