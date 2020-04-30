import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.send(`
    <!DOCTYPE html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${renderToString(<App />)}</div>
        </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
