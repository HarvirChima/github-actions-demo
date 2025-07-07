const request = require('supertest');
const app = require('../src/index');

describe('GitHub Actions Demo API', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body.message).toContain('Welcome to GitHub Actions Demo');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.version).toBeDefined();
    });
  });

  describe('GET /api/info', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/api/info')
        .expect(200);
      
      expect(response.body.api).toBe('GitHub Actions Demo API');
      expect(response.body.features).toBeInstanceOf(Array);
      expect(response.body.features.length).toBeGreaterThan(0);
    });
  });

  describe('GET /version', () => {
    it('should return version information', async () => {
      const response = await request(app)
        .get('/version')
        .expect(200);
      
      expect(response.body.version).toBeDefined();
      expect(response.body.commit).toBeDefined();
      expect(response.body.branch).toBeDefined();
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);
      
      expect(response.body.error).toBe('Not Found');
    });
  });
});