import React from "react";
import PropTypes from "prop-types";
import TabItem from "../tab-item/tab-item.jsx";

const TabGenres = (props) => {
  const className = `catalog__genres-${props.className || ``}`;
  const restProps = Object.assign({}, props);
  delete restProps.className;

  return (
    <TabItem className={className} {...restProps} />
  );
};

TabGenres.propTypes = {
  className: PropTypes.string || ``.isRequired
};

export default TabGenres;
