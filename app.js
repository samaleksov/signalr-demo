import express from "express"
import { createServer } from "http"
import path from "path"

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const config = require('./webpack.config');
const compiler = webpack(config);

import React from 'react';
import {renderToString} from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import {RouterContext, match} from 'react-router';
import routes from './routes/routes';

let app = express();

app.use((req, res, next) => {
  let location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    let markup = renderToString(<RouterContext {...renderProps}/>);

		let html = [
      `<!DOCTYPE html>`,
      `<html>`,
        `<head>`,
          `<title>SignalR Demo</title>`,
          `<meta charset="utf-8"/>`,
        `</head>`,
        `<body>`,
          `<div id="root"><div>${markup}</div></div>`,
					`<script type="text/javascript" src="vendor.bundle.js" charset="utf-8"></script>`,
          `<script src="//localhost:5000/Scripts/signalr.samples.js"></script>`,
          `<script src="http://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-2.0.3.js"></script>`,
          `<script src="//localhost:5000/signalr/js"></script>`,
					`<script type="text/javascript" src="app.bundle.js" charset="utf-8"></script>`,
        `</body>`,
      `</html>`
    ].join('');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
});

app.use(webpackDevMiddleware(compiler,{
  stats: {
      colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'wwwroot')));
let server  = createServer(app);
server.listen(3333);
