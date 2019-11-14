import React from 'react';
import classNames from 'classnames';


function Header ( props) {
    let newClass = classNames({
        'btn-selected': props.selectedSort === "newest"
    });
    let topClass = classNames({
        'btn-selected': props.selectedSort === "top"
    });

    return (
        <tr>
            <td className="logo">
                <a href="#">
                    <img src={require('../../img/y18.gif')} width="18px" height="18px" />
                </a>
            </td>
            <td className="navlinks">
                <span className="pagetop">
                    <a className={topClass} onClick={props.handleClick.bind(this,'top')} href="javascript:void(0)">top</a> |
                    <a className={newClass} onClick={props.handleClick.bind(this,'newest')} href="javascript:void(0)">new</a>
                </span>
            </td>
        </tr>   
    );
}

export default Header;
