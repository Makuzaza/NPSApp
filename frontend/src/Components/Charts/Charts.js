import React from "react";
import { TitleText } from "../StyledComponents";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


const Charts = ({ data }) => {

  return (
    <div style={{ margin: "30px 0 " }}>
      <TitleText data-testid="chart-title">Vote Results</TitleText>
      <div style={{ margin: "30px 0 " }}>
        <LineChart width={400} height={300} data={data}>
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="score" />
          <YAxis />
        <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;
