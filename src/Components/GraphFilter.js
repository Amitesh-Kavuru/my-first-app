import "../ComponentStyles/GraphFilter.css";
import React, { useContext } from "react";
import GraphNavigator from "./GraphNavigator";
import { FilterContext } from "./Content";

export default function GraphFilter() {
  const graphContext = useContext(FilterContext);
  return (
    <div className="graphFilter">
      <h6>Water Usage</h6>
      <GraphNavigator />
      <ul>
        <li>
          <input
            type="radio"
            name="item"
            id="one"
            value="day"
            onChange={(e) => graphContext.setGraphFilter(e.target.value)}
          />
          <label htmlFor="one">Day</label>
        </li>

        <li>
          <input
            type="radio"
            name="item"
            id="two"
            value="month"
            onChange={(e) => graphContext.setGraphFilter(e.target.value)}
          />
          <label htmlFor="two">Month</label>
        </li>

        <li>
          <input
            type="radio"
            name="item"
            id="three"
            value="year"
            onChange={(e) => graphContext.setGraphFilter(e.target.value)}
          />
          <label htmlFor="three">Year</label>
        </li>
      </ul>
    </div>
  );
}
