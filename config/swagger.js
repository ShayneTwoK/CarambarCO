const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Node.js project',
    },
  },
  apis: ['./routes/*.js', './models/*.js'], // Chemin vers les fichiers d'annotations JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
