const {isBoolean, isNull, isString, isUUID} = require('../../../../../domain/common/helpers');
describe('Helpers', () => {
  describe('is boolean', () => {
    test('should return true if param is boolean', () => {
      const response = isBoolean(false);

      expect(response).toBeTruthy();
    });

    test('should return false if param is not boolean', () => {
      const response = isBoolean('true');

      expect(response).toBeFalsy();
    });
  });

  describe('is string', () => {
    test('should return true if param is string', () => {
      const response = isString('true');

      expect(response).toBeTruthy();
    });

    test('should return false if param is not string', () => {
      const response = isString(false);

      expect(response).toBeFalsy();
    });
  });

  describe('is null', () => {
    test('should return true if param is null', () => {
      const response = isNull(null);

      expect(response).toBeTruthy();
    });

    test('should return false if param is not null', () => {
      const response = isNull(false);

      expect(response).toBeFalsy();
    });
  });

  describe('is uuid', () => {
    test('should return true if param is uuid', () => {
      const response = isUUID('b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9');

      expect(response).toBeTruthy();
    });

    test('should return false if param is not uuid', () => {
      const response = isUUID('b3b6');

      expect(response).toBeFalsy();
    });
  });
});
