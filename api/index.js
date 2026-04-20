// Vercel Serverless Function Entry Point
const app = require('../server.js');

module.exports = async (req, res) => {
  // Handle the request using the Express app
  return app(req, res);
};
