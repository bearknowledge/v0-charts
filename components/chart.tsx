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
  const [domain, setDomain] = useState([0,0] as [x: number, y: number])

  useEffect(() => {
    if (data.data[0]?.name === "xci") {
      setDomain([0, 250]);
    }
    if (data.data[0]?.name === "sp50") {
      setDomain([0, 450]);
    }
    if (data.data[0]?.name === "hype6") {
      setDomain([0, 350]);
    }
  },[data])


  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.data}
        margin={{
          top: 0,
          right:5,
          left: -25,
          bottom: 10,
        }}
        
      >
      
        <YAxis type="number" key={data} domain={domain} />
        <XAxis dataKey="date" />
    

        <Tooltip />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#2FFD76"
          strokeWidth={5}
          activeDot={{ r: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
