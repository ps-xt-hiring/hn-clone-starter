import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import './list.scss';

let i = 0;

export default function List({
  items = [],
  className = '',
  hideEnable = false,
}) {
  const inputEl = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (hideEnable) {
      const node = document.createElement('SPAN');
      node.innerHTML = ' [hide]';
      node.setAttribute('role', 'button');
      node.onclick = () => setShow(false);
      inputEl.current.lastChild.appendChild(node);
    }
  }, []);

  return (
    <>
      {show
        && <>
          <ul className={`list-wrapper ${className}`} ref={inputEl}>
            {
              items.map((itm) => {
                i += 1;
                return (
                  <Fragment key={i}>
                    <li className="item">
                      { typeof itm === 'function' ? itm() : itm }
                    </li>
                  </Fragment>
                );
              })
            }
          </ul>
        </>
      }
    </>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ])),
  className: PropTypes.string,
};
