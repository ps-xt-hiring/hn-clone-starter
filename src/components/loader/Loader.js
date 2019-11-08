import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { PropTypes } from 'prop-types';
import * as loaderCss from './loader.css';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }

  routeChangeStart = () => {
    const { startPosition } = this.props;
    NProgress.set(startPosition);
    NProgress.start();
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer);
    const { stopDelayMs } = this.props;
    this.timer = setTimeout(() => {
      NProgress.done(true);
    }, stopDelayMs);
  };

  render() {
    return (
      <style jsx global>
        {`${loaderCss}`}
      </style>
    );
  }
}

Loader.defaultProps = {
  startPosition: 0.3,
  stopDelayMs: 200,
  options: {},
};

Loader.propTypes = {
  startPosition: PropTypes.number,
  stopDelayMs: PropTypes.number,
  options: PropTypes.shape({}),
};

export default Loader;
