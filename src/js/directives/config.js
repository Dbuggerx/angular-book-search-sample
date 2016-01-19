import angular from 'angular';
import refillsDropdown from './refills-dropdown';

export default function () {
  angular.module('BooksChallenge')
    .directive('refillsDropdown', refillsDropdown);
}
