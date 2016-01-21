import angular from 'angular';
import refillsDropdown from './refills-dropdown';
import bookCard from './book-card';

export default function () {
  angular.module('BooksChallenge')
    .directive('refillsDropdown', refillsDropdown)
    .directive('bookCard', bookCard);
}
