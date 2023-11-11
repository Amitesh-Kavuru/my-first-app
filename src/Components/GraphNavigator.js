import React, { useContext, useEffect, useState } from "react";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { FilterContext } from "./Content";

export default function GraphNavigator() {
  const context = useContext(FilterContext);
  const [dateText, setDateText] = useState(
    context.currentTSFilter.toLocaleString("en", {
      day: "2-digit",
      month: "long",
    })
  );
  const [navigateNext, setNavigateNext] = useState(false);
  useEffect(() => {
    setNavigateNext(false);
    let tempDate = new Date();
    context.setCurrentTSFilter(tempDate);
    if (context.activeFilter === "day") {
      setDateText(
        tempDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
    } else if (context.activeFilter === "month") {
      setDateText(
        tempDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
    } else if (context.activeFilter === "year") {
      setDateText(tempDate.toLocaleString("en", { year: "numeric" }));
    }
  }, [context.activeFilter]);

  const handleClickIncreaseDate = () => {
    if (context.activeFilter === "day") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setDate(newDate.getDate() + 1);
      context.setCurrentTSFilter(newDate);
      setDateText(
        newDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
      if (
        newDate.getDate() === new Date().getDate() &&
        newDate.getMonth() === new Date().getMonth() &&
        newDate.getFullYear() === new Date().getFullYear()
      ) {
        console.log("Prev date", newDate);
        console.log("Curr date", new Date());
        console.log("setting nav off");
        setNavigateNext(false);
      }
    } else if (context.activeFilter === "month") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setMonth(newDate.getMonth() + 1);
      context.setCurrentTSFilter(newDate);
      setDateText(
        newDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
      if (
        newDate.getMonth() === new Date().getMonth() &&
        newDate.getFullYear() === new Date().getFullYear()
      )
        setNavigateNext(false);
    } else if (context.activeFilter === "year") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setFullYear(newDate.getFullYear() + 1);
      context.setCurrentTSFilter(newDate);
      setDateText(newDate.toLocaleString("en", { year: "numeric" }));
      if (newDate.getFullYear() === new Date().getFullYear())
        setNavigateNext(false);
    }
  };
  const handleClickDecreaseDate = () => {
    if (context.activeFilter === "day") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setDate(newDate.getDate() - 1);
      context.setCurrentTSFilter(newDate);
      setDateText(
        newDate.toLocaleString("en", { day: "2-digit", month: "long" })
      );
      setNavigateNext(true);
    } else if (context.activeFilter === "month") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setMonth(newDate.getMonth() - 1);
      context.setCurrentTSFilter(newDate);
      setDateText(
        newDate.toLocaleString("en", { month: "long", year: "numeric" })
      );
      setNavigateNext(true);
    } else if (context.activeFilter === "year") {
      const newDate = new Date(context.currentTSFilter);
      newDate.setFullYear(newDate.getFullYear() - 1);
      context.setCurrentTSFilter(newDate);
      setDateText(newDate.toLocaleString("en", { year: "numeric" }));
      setNavigateNext(true);
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
        disabled={!navigateNext}
      >
        <NavigateNext />
      </button>
    </div>
  );
}
