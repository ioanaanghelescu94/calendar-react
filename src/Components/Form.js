import React from "react";

const Form = props => {
  return (
    <div className="form">
      <select onChange={props.selectDay}>
        {props.days.map((day, index) => (
          <option value={index} key={index + "dropdown"}>
            {day.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="What to do"
        value={props.input}
        onChange={props.updateInput}
      />

      <button onClick={props.uploadEvent}>Submit</button>
    </div>
  );
};

export default Form;
