import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Paginator.style';
import withStyles from '../../utils/withStyles';

class Paginator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.pages = [1, 2, 3, 4, 5];
  }

  handleClick(e, page) {
    const {
      props: {
        onPageChange,
      },
    } = this;

    onPageChange(page);
  }

  render() {
    const {
      props: {
        className,
        paginator,
      },
    } = this;

    const containerClass = `${className} paginator`;
    return (
      <section className={containerClass}>
        <nav aria-label="pagination">
          <ul>
            {
              this.pages.map(page => (
                <li key={page}>
                  <button type="button" className={`paginator__page-link ${paginator.current === page ? 'active' : ''}`} onClick={e => this.handleClick(e, page)}>{ page }</button>
                </li>
              ))
            }
          </ul>
        </nav>
      </section>
    );
  }
}

Paginator.propTypes = {
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  paginator: PropTypes.shape({
    current: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
  })
};

Paginator.defaultProps = {
  className: '',
  onPageChange: () => {},
  paginator: {
    current: 1,
    from: 1,
    to: 5,
  },
};

const StyledPaginator = withStyles(Paginator, styles);
export default StyledPaginator;
