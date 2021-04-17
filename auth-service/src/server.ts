import express from 'express';

const app = express();
const port = parseInt(process.env.SERVER_PORT || '3200', 10);

app.get('/', (req, res) => {
  res.send('OAuth or such...');
});

app.listen(port, 'auth', () => {
  console.log(`Listening at http://localhost:${port}`);
});
