import express from 'express';

import { QueryTypes } from 'sequelize';

import { DB } from './DB';

import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';

import { ChannelsController } from './controllers/ChannelsController';
import { UsersController } from './controllers/UsersController';
import { RolesController } from './controllers/RolesController';
import { SessionUserController } from './controllers/SessionUserController';

import { EventsController } from './controllers/EventsController';
import { CommandsController } from './controllers/CommandsController';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import path from 'path';
import querystring from 'querystring';

dotenv.config();

const app = express();
const port = parseInt(process.env.SERVER_PORT, 10);

app.use(cookieParser());
app.use(AuthenticationMiddleware.process);

app.use(bodyParser.json({
  limit: 100000
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.use('/Channels', ChannelsController.router);
app.use('/Users', UsersController.router);
app.use('/roles', RolesController.router);
app.use('/events', EventsController.router);
app.use('/commands', CommandsController.router);

app.get('/session/me', SessionUserController.show);

// app.use((req, res, next) => {
//   res.status(404);
//   res.json({"success": false});
// });

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
