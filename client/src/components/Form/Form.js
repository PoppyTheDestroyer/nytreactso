import React from "react";

const Form = props => (
  <form>
    <label htmlFor="term">Search</label>
    <input
      className="form-control"
      value={props.term}
      type="text"
      name="term"
      onChange={props.handleInputChange}
      required
      autoFocus
    />
    <label htmlFor="begin">Start Date (Optional)</label>
    <input
      className="form-control"
      type="date"
      value={props.begin}
      name="begin"
      onChange={props.handleInputChange}
    />
    <label htmlFor="end">End Date (Optional)</label>
    <input
      className="form-control"
      type="date"
      value={props.end}
      name="end"
      onChange={props.handleInputChange}
    />
    <button
      onClick={props.handleFormSubmit}
      type="submit"
      className="btn btn-danger"
    >
      Search
    </button>
  </form>
);

export default Form;
