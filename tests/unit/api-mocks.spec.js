import ApiMocks from '../../js/services/api-mocks';

describe('ApiMocks', () => {
  it('should be defined', () => {
    expect(ApiMocks).toBeDefined();
  });

  describe('getBookGenres', () => {
    it('should return results', () => {
      let mock = new ApiMocks();
      expect(mock.getBookGenres().length > 0).toBeTruthy();
    });
  });
  
});
