const privates = new WeakMap();

export default class BookSearchParamsCtrl {
  /** Controller responsible for the parameters in the books page. */
  constructor(ApiService, $scope, $state, $stateParams) {
    'ngInject';

    privates.set(this, {
      $state,
      selectedParams : {
        genre: $stateParams.genre,
        category: $stateParams.category,
        query: $stateParams.query
      }
    });

    this.bookGenres = [this.constructor.allGenresLabel];
    this.bookCategories = [this.constructor.allCategoriesLabel];

    ApiService.bookGenres.query().$promise.then(data => {
      this.bookGenres = this.bookGenres.concat(data);
    });
    ApiService.bookCategories.query().$promise.then(data => {
      this.bookCategories = this.bookCategories.concat(data);
    });

  }

  static get allGenresLabel(){
    return 'All Genres';
  }
  static get allCategoriesLabel(){
    return 'All Categories';
  }

  getStringOrNull(val){
    return (val || '').length ? val : null;
  }

  get selectedGenre(){
    return this.getStringOrNull(privates.get(this).selectedParams.genre) || this.constructor.allGenresLabel;
  }
  set selectedGenre(val){
    privates.get(this).selectedParams.genre = val === this.constructor.allGenresLabel ? null : this.getStringOrNull(val);
    this.search();
  }

  get selectedCategory(){
    return this.getStringOrNull(privates.get(this).selectedParams.category) || this.constructor.allCategoriesLabel;
  }
  set selectedCategory(val){
    privates.get(this).selectedParams.category = val === this.constructor.allCategoriesLabel ? null : this.getStringOrNull(val);
    this.search();
  }

  get selectedQuery(){
    return privates.get(this).selectedParams.query;
  }
  set selectedQuery(val){
    privates.get(this).selectedParams.query = val;
  }

  search() {
    const self = privates.get(this);
    self.$state.go('search', {
      'genre': self.selectedParams.genre,
      'category': self.selectedParams.category,
      'query': self.selectedParams.query
    });
  }
}
