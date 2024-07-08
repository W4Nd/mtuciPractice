const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const jsonParser = bodyParser.json();

const isDev = process.env.NODE_ENV === 'dev';

require('./database_connections');

const app = express();

app.use(cors());
app.use(jsonParser);

const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

app.get('/vacancies', async (req, res) => {
  const { text, perPage, maxPages } = req.query;
  try {
    const vacancies = await headhunterService.getVacancies(text, perPage, maxPages);
    res.json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

if (isDev) {
  const swaggerRoute = require('./routes/swagger');
  app.use(swaggerRoute);
}

const server = app.listen(process.env.PORT, () =>
  console.log(`Express.js server started on port ${process.env.PORT}`)
);
