import React from "react";
import { Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Grid } from "@material-ui/core";

const SummaryChart = ({ data, dataLength, netPromotersScore }) => (
  <div className="container" style={{ margin: "30px 0" }}>
    <Grid container spacing={3}>
      <Grid item xs={1} sm={6}>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#3A3A3A",
          }}
        >
          <span
            style={{ fontSize: "35px", margin: "20px 0" }}
            className="netPromoters"
          >
            {netPromotersScore}
          </span>
          <span>Net Promoters Score</span>{" "}
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#3A3A3A",
            margin: "30px 0",
          }}
        >
          <span>Total Response: </span>{" "}
          <span style={{ fontSize: "25px" }}>{dataLength}</span>{" "}
        </div>
      </Grid>
      <Grid item xs={1} sm={6}>
        <BarChart
          data={data}
          layout="vertical"
          barCategoryGap={1}
          margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
          width={500}
          height={250}
          barGap={40}
          barSize={40}
        >
          <XAxis type="number" />
          <YAxis
            domain={[1, 1]}
            type="category"
            dataKey="name"
            padding={{ right: 20 }}
            width={120}
            tickLine={false}
            tickSize={10}
            axisLine={false}
          />
          <Tooltip />

          <Bar
            dataKey="promoters"
            fill="#4BB543"
            label={{
              position: "right",
              formatter: (v) => `${Math.round((v / dataLength) * 100)}%`,
            }}
          />
          <Bar
            dataKey="passives"

            fill="#5bc0de"
            label={{
              position: "right",
              formatter: (v) => `${Math.round((v / dataLength) * 100)}%`,
            }}
          />
          <Bar
            dataKey="detractors"

            fill="#D0342C"
            label={{
              position: "right",
              formatter: (v) => `${Math.round((v / dataLength) * 100)}%`,
            }}
          />
        </BarChart>
      </Grid>
    </Grid>
  </div>
);

export default SummaryChart;
