import "../ComponentStyles/GraphFilter.css";
import React from "react";
import GraphNavigator from "./GraphNavigator";

export default function GraphFilter(props) {
  // const [selected, setSelected] = useState("day");
  return (
    <div className="graphFilter">
      <h6>Water Usage</h6>
      <GraphNavigator activeFilter={props.activeFilter}/>
      <ul>
        <li>
          <input
            type="radio"
            name="item"
            id="one"
            value="day"
            onChange={props.handleRadioEvent}
          />
          <label htmlFor="one">Day</label>
        </li>

        <li>
          <input
            type="radio"
            name="item"
            id="two"
            value="month"
            onChange={props.handleRadioEvent}
          />
          <label htmlFor="two">Month</label>
        </li>

        <li>
          <input
            type="radio"
            name="item"
            id="three"
            value="year"
            onChange={props.handleRadioEvent}
          />
          <label htmlFor="three">Year</label>
        </li>
      </ul>
    </div>
  );
}
