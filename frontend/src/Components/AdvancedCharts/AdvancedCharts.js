import React from "react";
import { TitleText } from "../StyledComponents";
import { formatSummary } from "../../utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import SummaryChart from "./SummaryChart";

const AdvancedCharts = ({ data }) => {
  const { final, finalInfo, netPromotersScore } = formatSummary(data);
  console.log(finalInfo);
  return (
    <div style={{ margin: "30px 0 ", fontFamily: "'Alata', sans-serif" }}>
      <TitleText data-testid="chart-title">Results</TitleText>
      <SummaryChart
        data={finalInfo}
        dataLength={data.length}
        netPromotersScore={netPromotersScore}
      />
      <BarChart
        width={window.innerWidth - 100}
        height={400}
        data={final}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 15,
        }}
        barGap={10}
        barSize={5}
      >
        <CartesianGrid strokeDasharray="4 0" vertical={false} />
        <XAxis dataKey="day" angle={-30} tickSize={20} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="detractors" stackId="a" fill="#D0342C" />
        <Bar dataKey="passives" stackId="a" fill="#5bc0de" />
        <Bar dataKey="promoters" stackId="a" fill="#4BB543" />
      </BarChart>
    </div>
  );
};

export default AdvancedCharts;
