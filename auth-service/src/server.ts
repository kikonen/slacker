import express from 'express';
import path from 'path';

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3200', 10);

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../view/index.html`));
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const scope = req.query.scope;
  const authuser = req.query.authuser;
  const prompt = req.query.prompt;

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
