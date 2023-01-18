import React, { useEffect } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";

export default function Chart(data: any) {
  const [domain, setDomain] = useState([0, 0] as [x: number, y: number]);

  useEffect(() => {
    if (data.data[0]?.name === "xci") {
      let max = 0;
      let min = data.data[0].price;
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].price > max) {
          max = data.data[i].price;
        }
        if (min > data.data[i].price) {
          min = data.data[i].price;
        }
      }
      let adjustedMax = Number(max.toFixed(0));
      let adjustedMin = Number(min.toFixed(0));
      setDomain([adjustedMin - 3, adjustedMax + 3]);
    }
    if (data.data[0]?.name === "sp50") {
      let max = 0;
      let min = data.data[0].price;
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].price > max) {
          max = data.data[i].price;
        }
        if (min > data.data[i].price) {
          min = data.data[i].price;
        }
      }
      let adjustedMax = Number(max.toFixed(0));
      let adjustedMin = Number(min.toFixed(0));
      setDomain([adjustedMin - 3, adjustedMax + 3]);
    }
    if (data.data[0]?.name === "hype6") {
      let max = 0;
      let min = data.data[0].price;
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].price > max) {
          max = data.data[i].price;
        }
        if (min > data.data[i].price) {
          min = data.data[i].price;
        }
      }
      let adjustedMax = Number(max.toFixed(0));
      let adjustedMin = Number(min.toFixed(0));
      setDomain([adjustedMin - 3, adjustedMax + 3]);
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.data}
        margin={{
          top: 3,
          right: 5,
          left: -5,
          bottom: 10,
        }}
      >
        <YAxis type="number" key={data} domain={domain} />
        <XAxis dataKey="date" />

        <Tooltip
          contentStyle={{
            backgroundColor: "gray",
            outline: "none",
            border: "none",
            borderRadius: "10px",
          }}
          wrapperStyle={{ outline: "none" }}
          labelStyle={{ color: "black" }}
          formatter={(value, name, props) => [
            (value = "$" + Number(value).toFixed(2)),
            (name = "Price"),
          ]}
        />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#2FFD76"
          strokeWidth={2}
          activeDot={{ r: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
