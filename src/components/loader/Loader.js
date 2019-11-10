import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { PropTypes } from 'prop-types';

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
        {`      
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #d65;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #d65, 0 0 5px #d65;
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0, -4px);
        -ms-transform: rotate(3deg) translate(0, -4px);
        transform: rotate(3deg) translate(0, -4px);
      }

      #nprogress .spinner {
        display: "block";
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }

      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: #d65;
        border-left-color: #d65;
        border-radius: 50%;
        -webkit-animation: nprogresss-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }

      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }

      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }

        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `}
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
