import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';

import router from './router/index.js';

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

const MONGO_URL = process.env.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error) => console.log(error));

app.use('/', router());