/**
 * API mocks, used to intercept requests and simulate its responses.
 * @module config/http-backend
 */

export default function ($httpBackend, ApiMocks) {
  'ngInject';
  $httpBackend.whenGET(/.+\.html$/).passThrough();

  $httpBackend.whenGET(/\/api\/book\/genres/).respond((method, url) => {
    try {
      return [200, ApiMocks.getBookGenres()];
    } catch (e) {
      return [500, e];
    }
  });

  $httpBackend.whenGET(/\/api\/book\/categories/).respond((method, url) => {
    try {
      return [200, ApiMocks.getBookCategories()];
    } catch (e) {
      return [500, e];
    }
  });

  $httpBackend.whenGET(/\/api\/book\/search?\?(.+\=.+)+$/).respond((method, url) => {
    try {
      let params = /\/api\/book\/search?\?(.+\=.+)+$/
        .exec(url)[1]
        .split('&')
        .map((pair) => pair.split('='))
        .reduce((obj, pair) => {
          obj[pair[0]] = pair[1];
          return obj;
        }, {});
      return [200, ApiMocks.getPagedBooksSearch(params)];
    } catch (e) {
      return [500, e];
    }
  });
}
