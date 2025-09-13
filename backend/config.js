// backend/config.js
require('dotenv').config();

module.exports = {
  ORACLE_USER: process.env.ORACLE_USER || 'your_oracle_user',
  ORACLE_PASSWORD: process.env.ORACLE_PASSWORD || 'your_oracle_password',
  ORACLE_CONNECTSTRING: process.env.ORACLE_CONNECTSTRING || 'localhost/XEPDB1',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  MOCK_MODE: process.env.MOCK_MODE === 'true', // set to true for mock DB
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5177'
};
