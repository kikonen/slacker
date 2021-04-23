import express from 'express';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { GoogleAuth } from './GoogleAuth';
import { AuthenticationController } from './controllers/AuthenticationController';

dotenv.config();

const app = express();

const port = parseInt(process.env.SERVER_PORT, 10);

app.use(GoogleAuth.initialize);
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/login', AuthenticationController.login);
app.get('/callback', AuthenticationController.callback);

app.listen(port, 'auth', () => {
  console.log(`Listening at http://localhost:${port}`);
});
