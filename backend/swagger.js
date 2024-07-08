const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

const swaggerConfig = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: `localhost:${process.env.PORT}/api`,
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/api.js'];

swaggerAutogen(outputFile, endpointsFiles, swaggerConfig);
