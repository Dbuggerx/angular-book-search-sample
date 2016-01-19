/**
 * API configuration.
 * @module services/api-service
 */

const privates = new WeakMap();

class ApiService{
  /**
  * Wraps the API endpoints with ngResource
  *
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
}

export default ApiService;
