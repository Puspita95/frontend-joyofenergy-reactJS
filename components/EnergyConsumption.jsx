import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import UsageInformation from "./UsageInformation/UsageInformation.jsx";
import {
  getConsumption,
  getCost,
  getFootPrint,
} from "../utils/usageInformation.js";

export const EnergyConsumption = ({ readings }) => {
  const [buttons, setButtons] = useState([
    { id: 1, name: "Last 30 days", isSelected: true },
    { id: 2, name: "Last 24 hours", isSelected: false },
  ]);
  const [usageInfo, setUsageInfo] = useState({});
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const containerId = "usageChart";
  const nDaysOfReading = sortByTime(groupByDay(readings)).slice(-30);
  const last24HoursReading = sortByTime(readings).slice(-24);

  const handleBtnClick = (prevIndex, index) => {
    const clonedButtons = [...buttons];
    if (index > -1) {
      clonedButtons[index].isSelected = true;
      clonedButtons[prevIndex].isSelected = false;
      setButtons(clonedButtons);
      setSelectedButtonIndex(index);
    }
  };

  useEffect(() => {
    if(buttons[selectedButtonIndex].id===1){
      const consumptionvalue = Math.round(getConsumption(nDaysOfReading));
      setUsageInfo({
        consumption: consumptionvalue,
        cost: getCost(consumptionvalue),
        footPrint: getFootPrint(consumptionvalue),
      });
    }
    else if (buttons[selectedButtonIndex].id===2){
      const consumptionvalue = Math.round(getConsumption(last24HoursReading));
      setUsageInfo({
        consumption: consumptionvalue,
        cost: getCost(consumptionvalue),
        footPrint: getFootPrint(consumptionvalue),
      });
    }
    
    renderChart(
      containerId,
      buttons[selectedButtonIndex].id === 1
        ? nDaysOfReading
        : last24HoursReading,
      buttons[selectedButtonIndex].id
    );
  }, [buttons]);
  let prevIndex = buttons.findIndex((item) => item.isSelected);
  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        {buttons &&
          buttons.map((item, index) => {
            prevIndex = item.isSelected ? index : prevIndex;
            return (
              <button
                key={item.id}
                className={`
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bold
              cusor-pointer
            ${item.isSelected ? "bg-blue white" : "bg-light-grey blue"}
            ${item.id === 2 ? "ml2" : ""}`}
                onClick={() => handleBtnClick(prevIndex, index)}
              >
                {item.name}
              </button>
            );
          })}
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <section>
        <UsageInformation usageInfo={usageInfo} />
      </section>
    </>
  );
};
