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
}
