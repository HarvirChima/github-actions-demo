const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to GitHub Actions Demo!',
    description: 'This is a demo application showcasing various GitHub Actions workflows',
    endpoints: {
      health: '/health',
      api: '/api/info',
      version: '/version'
    }
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    api: 'GitHub Actions Demo API',
    version: '1.0.0',
    features: [
      'Automated CI/CD',
      'Security scanning',
      'Code quality checks',
      'Automated testing',
      'Docker containerization',
      'Deployment automation'
    ]
  });
});

// Version endpoint
app.get('/version', (req, res) => {
  res.json({
    version: process.env.npm_package_version || '1.0.0',
    commit: process.env.GITHUB_SHA || 'unknown',
    branch: process.env.GITHUB_REF_NAME || 'unknown',
    buildTime: process.env.BUILD_TIME || new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔍 API info: http://localhost:${PORT}/api/info`);
  });
}

module.exports = app;