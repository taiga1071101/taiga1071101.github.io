import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // バンドルモードを指定
  mode: "development",
  target: 'node',
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFormat: "module",
    library: {
      type: 'module',  // モジュール形式でライブラリを出力
    },
    module: true,  // 出力をESMに設定
  },
  experiments: {
    outputModule: true,  // モジュールとして出力
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // どの拡張子にBabel-loaderを適用させるか
        exclude: /node_modules/, // 除外するファイルやディレクトリ
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env',  // 最新のJavaScriptを変換
                '@babel/preset-react',  // JSXを変換
              ],
            },
          },
        ],
      }
    ]
  },
  resolve: {
    fallback: {
      'url': false,  // 無効化（Webpack 5 から Node.js のコアモジュールのポリフィルが自動的に含まれなくなった）
      'path': false,
      'fs': false,
      "crypto": false,
      "stream": false,
      "buffer": false,
      "http": false,
      "https": false,
      'querystring': false,
      'net': false,
      'zlib': false,
    },
  },
};