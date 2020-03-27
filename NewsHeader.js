import React from "react";

const headerItems = ["top", "new"];

const NewsHeader = props => {
  return (
    <header className="header">
      <ul className="header-list">
        {headerItems.map((item, index) => (
          <li
            className={`header-list__item " ${
              props.activeTab === index ? "active" : ""
            }`}
            key={index}
            onClick={e => props.getActiveTabData(index, e)}
          >
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default NewsHeader;
