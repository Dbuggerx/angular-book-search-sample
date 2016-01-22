const privates = new WeakMap();

export default class BookDetailsCtrl {
  /** Controller responsible for the book details. */
  constructor(ApiService, $state) {
    'ngInject';
    privates.set(this, {
      $state
    });


  }

}
