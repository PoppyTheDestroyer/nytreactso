import React from "react";

const SearchBtn = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10 }}
    className="btn btn-danger"
  >
    {props.children}
  </button>
);

export default SearchBtn;