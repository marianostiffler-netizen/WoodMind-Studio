import app from './app.js';
import { initializeDatabase } from './src/db/database.js';

const PORT = process.env.PORT || 3001;

// Initialize database before starting server
try {
  await initializeDatabase();
  console.log('✅ Database initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WoodMind Studio Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📁 Uploads directory: ${process.env.UPLOAD_DIR || './uploads'}`);
  console.log(`💾 Database: ${process.env.DB_PATH || './database.sqlite'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully');
  process.exit(0);
});
