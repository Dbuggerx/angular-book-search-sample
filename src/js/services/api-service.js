/**
 * API configuration.
 * @module services/api-service
 */

const privates = new WeakMap();

export default class ApiService{
  /**
  * Wraps the API endpoints with ngResource
  * @memberof Services
  * @param {ngResource} - The injected {@link https://docs.angularjs.org/api/ngResource/service/$resource $resource} from AngularJS
  */
  constructor($resource){
    'ngInject';
    privates.set(this, {
      $resource,
      baseUrl: 'http://www.once-upon-api.com'
    });
  }

  get bookGenres(){
    return privates.get(this).$resource(privates.get(this).baseUrl + '/api/book/genres');
  }

  get bookCategories(){
    return privates.get(this).$resource(privates.get(this).baseUrl + '/api/book/categories');
  }

  get bookSearch(){
    return privates.get(this).$resource(privates.get(this).baseUrl + '/api/book/search');
  }
}
