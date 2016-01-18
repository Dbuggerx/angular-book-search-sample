import angular from 'angular';
import BooksCtrl from './books-ctrl';

export default function () {
  angular.module('BooksChallenge')
    .controller('BooksCtrl', BooksCtrl);
}
