import React, { Suspense } from 'react';
import './app.scss';
import Loading from '../loading/Loading';

const Header = React.lazy(() => import('../header/Header'));
const Feed = React.lazy(() => import('../feed/Feed'));

function App() {
  return (
    <Suspense className="App" fallback={<Loading />}>
      <Header />
      <Feed />
    </Suspense>
  );
}

export default App;
