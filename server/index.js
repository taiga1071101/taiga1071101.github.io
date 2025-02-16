import express from 'express';
const app = express();
const PORT = 9000;

app.use('/dist', express.static('dist'));  // バンドルしたファイルを提供

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});