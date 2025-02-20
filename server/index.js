import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../src/App.tsx';
import '../src/App.css';
import '../src/index.css';

//App = App.default || App;

const __dirname = path.resolve();
const app = express();
const PORT = 9000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

app.get('*', (_req, res) => {
  // ReactコンポーネントをSSRでレンダリング
  const html = ReactDOMServer.renderToString(React.createElement(App));  // JSXとして渡す

  // index.htmlの読み込み
  const indexFile = path.join(__dirname, 'dist', 'index.html');

  // index.htmlにSSRされたコンテンツを埋め込む
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong');
      return;
    }

    const result = data.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});