import express from 'express';
import path from 'path';
import querystring from 'querystring';

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3200', 10);

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
  const query = {
    client_id: process.env.AUTH_CLIENT_ID,
    scope: 'openid email',
    response_type: 'code',
    redirect_uri: process.env.AUTH_REDIRECT_URI,
  };

  const queryStr = querystring.stringify(query);
  const auth_url = `${process.env.AUTH_API}?${queryStr}`;

  res.render(`${__dirname}/../view/index`, { auth_url: auth_url });
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const scope = req.query.scope;
  const authuser = req.query.authuser;
  const prompt = req.query.prompt;

  debugger;
  res.send(
`Authenticated...
<br>code = ${code}
<br>scope = ${scope}
<br>authuser = ${authuser}
<br>prompt = ${prompt}
`);
});

app.listen(port, 'auth', () => {
  console.log(`Listening at http://localhost:${port}`);
});
