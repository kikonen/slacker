import express from 'express';

import { Pool, PoolClient, Client } from 'pg';
import { QueryTypes } from 'sequelize';

import { DB } from './DB';

import { ChannelsController } from './controllers/ChannelsController';
import { UsersController } from './controllers/UsersController';
import { RolesController } from './controllers/RolesController';

import { MessagesController } from './controllers/MessagesController';

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import path from 'path';
import querystring from 'querystring';

dotenv.config();

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3100', 10);

const pool = new Pool({
  max: 5,
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.get('/channels', ChannelsController.index);
app.get('/channels/:id', ChannelsController.show);
app.post('/channels', ChannelsController.create);
app.put('/channels/:id', ChannelsController.update);
app.delete('/channels/:id', ChannelsController.destroy);

app.get('/users', UsersController.index);
app.get('/users/:id', UsersController.show);
app.post('/users', UsersController.create);
app.put('/users/:id', UsersController.update);
app.delete('/users/:id', UsersController.destroy);
app.get('/users/action/find_email', UsersController.findByEmail);

app.get('/roles', RolesController.index);
app.get('/roles/:id', RolesController.show);

app.post('/messages/send', MessagesController.send);
app.get('/messages/events', MessagesController.events);

// app.use((req, res, next) => {
//   res.status(404);
//   res.json({"success": false});
// });

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
