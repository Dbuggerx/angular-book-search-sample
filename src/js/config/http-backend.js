export default function ($httpBackend) {
  'ngInject';
  $httpBackend.whenGET(/.+\.html$/).passThrough();
}
