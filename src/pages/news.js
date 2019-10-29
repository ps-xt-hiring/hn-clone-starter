import React from 'react';
import App from '../App';
// import avatar from '../public/logo.gif';
import { useRouter } from 'next/router';    

function ServerApp() {
  const router = useRouter();
  return <App page={router.query.p} />;
}

export default ServerApp;
