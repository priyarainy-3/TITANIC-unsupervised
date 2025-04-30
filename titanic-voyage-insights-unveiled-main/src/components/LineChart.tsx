
import React from "react";
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
  data: Array<{name: string | number; [key: string]: any}>;
  xKey?: string;
  lines: Array<{
    key: string;
    color: string;
    name?: string;
  }>;
  xLabel?: string;
  yLabel?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey = "name",
  lines,
  xLabel,
  yLabel
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xKey} 
          label={xLabel ? { 
            value: xLabel,
            position: 'bottom',
            offset: 5
          } : undefined}
        />
        <YAxis 
          label={yLabel ? {
            value: yLabel,
            angle: -90,
            position: 'left',
            offset: 10
          } : undefined}
        />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line 
            key={index}
            type="monotone" 
            dataKey={line.key} 
            name={line.name || line.key} 
            stroke={line.color} 
            activeDot={{ r: 8 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
