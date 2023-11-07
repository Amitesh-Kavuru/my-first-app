import React, { useEffect, useState } from "react";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";

export default function GraphNavigator(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateText, setDateText] = useState(
    new Date().toLocaleString("en", { day: "2-digit", month: "long" })
  );
  useEffect(() => {
    let tempDate = new Date();
    setCurrentDate(tempDate);
    if (props.activeFilter === "day") {
      setDateText(
        tempDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
    } else if (props.activeFilter === "month") {
      setDateText(
        tempDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
    } else if (props.activeFilter === "year") {
      setDateText(tempDate.toLocaleString("en", { year: "numeric" }));
    }
  }, [props.activeFilter]);

  const handleClickIncreaseDate = () => {
    if (props.activeFilter === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
      setDateText(
        newDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
    } else if (props.activeFilter === "month") {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setCurrentDate(newDate);
      setDateText(
        newDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
    } else if (props.activeFilter === "year") {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      setCurrentDate(newDate);
      setDateText(newDate.toLocaleString("en", { year: "numeric" }));
    }
  };
  const handleClickDecreaseDate = () => {
    if (props.activeFilter === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
      setDateText(
        newDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
    } else if (props.activeFilter === "month") {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setCurrentDate(newDate);
      setDateText(
        newDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
    } else if (props.activeFilter === "year") {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      setCurrentDate(newDate);
      setDateText(newDate.toLocaleString("en", { year: "numeric" }));
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleClickDecreaseDate}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <NavigateBefore />
      </button>
      <p style={{ margin: "0px", width: "135px", textAlign: "center" }}>
        {dateText}
      </p>
      <button
        onClick={handleClickIncreaseDate}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <NavigateNext />
      </button>
    </div>
  );
}
