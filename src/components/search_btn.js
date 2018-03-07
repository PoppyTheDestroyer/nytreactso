import React from "react";

const SearchBtn = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10 }}
    className="btn btn-success"
  >
    {props.children}
  </button>
);

export default SearchBtn;