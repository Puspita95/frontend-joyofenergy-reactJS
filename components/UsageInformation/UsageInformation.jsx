import "./UsageInformation.css";
import React from "react";

const UsageInformation = ({usageInfo}) => {
    
  return (
    <div className="container">
      <div className="box">
        <div>Cost &#128176; </div>
        <div>{usageInfo.cost} $</div>
      </div>
      <div className="box ">
        <div>Consumption  ⚡️</div>
        <div>{usageInfo.consumption} kWh</div>
      </div>
      <div className="box">
        <div>FootPrint  &#128095;</div>
        <div>{usageInfo.footPrint} tonnes</div>
      </div>
    </div>
  );
};
export default UsageInformation;
