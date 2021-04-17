import express from 'express';
import dotenv from 'dotenv'
import { Pool, PoolClient, Client } from 'pg';
import path from 'path';
import querystring from 'querystring';

dotenv.config();

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3100', 10);

const pool = new Pool({
  max: 5,
});

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.get('/bar', (req, res) => {
  res.send('Bar! Via typescript');
});

app.get('/roles', (req, res) => {
  let client:PoolClient = null;

  pool.connect()
    .then(c => {
      client = c;
      return client.query('SELECT id, name from roles');
    }).then( (rs) => {
      client.release();
      return rs;
    }).then(rs => {
      const roles = rs.rows;

      res.send(rs.rows);
    });
});

app.use((req, res, next) => {
  res.status(404);
  res.render("Nope");
});

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
