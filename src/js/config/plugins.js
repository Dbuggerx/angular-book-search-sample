import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import 'angular-resource';
import 'ngInfiniteScroll';

/**
 * Plugins imports and configuration
 * @module config/plugins
 */
export default function () {
  angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 750);
}
