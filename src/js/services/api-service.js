export default function ($q, $http) {
  'ngInject';

  let baseUrl = 'http://www.once-api-a-time.com';

  return {
    summary: {
      getOperations(startDate, finalDate) {

        return $http.get(baseUrl + '/summary/operations', {
            params: {
              startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
              finalDate: finalDate ? finalDate.format('YYYY-MM-DD') : null
            }
          })
          .then((response) => response.data);
      }
    },
  }

}
