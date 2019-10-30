import React from 'react';
import Fetch from 'isomorphic-unfetch';
import Loader from '../components/loader/Loader';
import App from '../App';

// import avatar from '../public/logo.gif';
// import { useRouter } from 'next/router';

function ServerApp(props) {
  // const router = useRouter();

  console.log("ServerApp----", props.data)
  return (
    <div>
      <Loader />
      <App page={props.page} total={props.data.length} lists={props.data} />
    </div>);
}

ServerApp.getInitialProps = async function ({ query: { page = 0 } }) {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`);
  const data = await res.json();

  return {
    data: data.hits,
    page: parseInt(page, 10)
  };
}


export default ServerApp;
