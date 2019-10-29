import React from 'react';
import Layout from './components/layout/Layout';
import NewsList from './components/newsList/NewsList';
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
