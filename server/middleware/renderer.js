import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { ServerStyleSheets } from '@material-ui/styles';
// import our main App component
import App from '../../src/App';

const path = require('path');
const fs = require('fs');

// import the manifest generated with the create-react-app build
const manifestFile = path.resolve(
  __dirname,
  '..',
  '..',
  'build',
  'asset-manifest.json',
);
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
  .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
  .map(k => assets[k]);

const extractAssetsCss = (assets, chunks) => Object.keys(assets)
  .filter(asset => chunks.indexOf(asset.replace('.css', '')) > -1)
  .map(k => assets[k]);

export default store => (req, res) => {
  // get the html file created with the create-react-app build
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  const sheets = new ServerStyleSheets();
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    const modules = [];
    const routerContext = {};

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <Loadable.Capture report={m => modules.push(m)}>
          <ReduxProvider store={store}>
            <StaticRouter location={req.baseUrl} context={routerContext}>
              <App />
            </StaticRouter>
          </ReduxProvider>
        </Loadable.Capture>,
      ),
    );

    // get the stringified state
    const reduxState = JSON.stringify(store.getState());

    // map required assets to script tags
    const extraChunks = extractAssets(manifest, modules).map(
      c => `<script type="text/javascript" src="${c}"></script>`,
    );

    const extraChunksCss = extractAssetsCss(manifest, modules).map(
      c => `<link rel="stylesheet" href="${c}" />`,
    );

    const css = sheets.toString();

    // get HTML headers
    const helmet = Helmet.renderStatic();

    // now inject the rendered app into our html and send it to the client
    return res.send(
      htmlData
        // write the React app
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace(
          '<style id="css-server-side"></style>',
          `<style id="css-server-side">${css}</style>`,
        )
        // write the string version of our state
        .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
        // append the extra css assets
        .replace('</head>', `${extraChunksCss.join('')}</head>`)
        // append the extra js assets
        .replace('</body>', `${extraChunks.join('')}</body>`)
        // write the HTML header tags
        .replace(
          '<title></title>',
          helmet.title.toString() + helmet.meta.toString(),
        ),
    );
  });
};
