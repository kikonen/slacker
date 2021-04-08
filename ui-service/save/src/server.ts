import express from 'express';

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('UI - TODO...');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
