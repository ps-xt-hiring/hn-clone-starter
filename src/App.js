/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import Layout from './components/layout/Layout';
import NewsList from './components/newsLists/NewsLists';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

function App(props) {
  return (
    <main>
      <Layout>
        <NewsList {...props} />
      </Layout>
    </main>
  );
}

export default App;
