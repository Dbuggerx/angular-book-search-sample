/**
 * Configuration of the fake API, used to intercept requests and simulate their responses.
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

  $httpBackend.whenGET(/\/api\/book\/related\?(.+\=.+)+$/).respond((method, url) => {
    try {
      let params = /\/api\/book\/related?\?(.+\=.+)+$/
        .exec(url)[1]
        .split('&')
        .map((pair) => pair.split('='))
        .reduce((obj, pair) => {
          obj[pair[0]] = pair[1];
          return obj;
        }, {});
      return [200, ApiMocks.getRelatedBooks(params.id, params.qty)];
    } catch (e) {
      return [500, e];
    }
  });

  $httpBackend.whenGET(/\/api\/book\/.+$/).respond((method, url) => {
    try {
      let id = /\/api\/book\/(.+)$/.exec(url)[1];
      return [200, ApiMocks.getBookById(id)];
    } catch (e) {
      return [500, e];
    }
  });

}
