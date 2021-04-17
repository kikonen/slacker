import express from 'express';

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3100', 10);

app.get('/', (req, res) => {
  res.send('Hello World! Via typescript');
});

app.get('/bar', (req, res) => {
  res.send('Bar! Via typescript');
});

app.use((req, res, next) => {
  res.status(404);
  res.render("Nope");
});

app.listen(port, 'api', () => {
  console.log(`Listening at http://localhost:${port}`);
});
