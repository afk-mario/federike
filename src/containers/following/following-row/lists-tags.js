import PropTypes from "prop-types";
import React from "react";

import Tag from "components/tag";

function ListTags({ lists }) {
  return (
    <div className="c-following-row-tag-list | cluster">
      {lists.map((item) => (
        <Tag key={item.id}>{item.title || item.id}</Tag>
      ))}
    </div>
  );
}

ListTags.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListTags;
