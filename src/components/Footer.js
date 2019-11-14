import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {

    return (
        props.articlesLength ? <div className="click-more" onClick={props.handleMoreClick}>More</div> : ''
    )
}

Footer.propTypes = {
    handleMoreClick: PropTypes.func
};

export default Footer; 