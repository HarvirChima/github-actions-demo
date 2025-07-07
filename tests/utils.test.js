const { generateId, formatDate, isValidEmail, formatUptime } = require('../src/utils');

describe('Utility Functions', () => {
  describe('generateId', () => {
    it('should generate an ID of default length', () => {
      const id = generateId();
      expect(id).toHaveLength(8);
      expect(typeof id).toBe('string');
    });

    it('should generate an ID of specified length', () => {
      const id = generateId(12);
      expect(id).toHaveLength(12);
    });
  });

  describe('formatDate', () => {
    it('should format current date when no parameter provided', () => {
      const formatted = formatDate();
      expect(formatted).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
    });

    it('should format provided date', () => {
      const testDate = new Date('2023-01-01T00:00:00.000Z');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2023-01-01T00:00:00.000Z');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('formatUptime', () => {
    it('should format uptime correctly', () => {
      expect(formatUptime(0)).toBe('0d 0h 0m 0s');
      expect(formatUptime(61)).toBe('0d 0h 1m 1s');
      expect(formatUptime(3661)).toBe('0d 1h 1m 1s');
      expect(formatUptime(90061)).toBe('1d 1h 1m 1s');
    });
  });
});