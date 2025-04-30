
import React from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { ProcessedPassenger } from "@/utils/dataPreprocessing";

interface ScatterPlotProps {
  data: { x: number; y: number; passengerId: number; cluster: number }[];
  xLabel?: string;
  yLabel?: string;
  activeCluster: number | null;
  setActiveCluster: (cluster: number | null) => void;
  onPointClick?: (passengerId: number) => void;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xLabel = "Component 1",
  yLabel = "Component 2",
  activeCluster,
  setActiveCluster,
  onPointClick
}) => {
  const clusterColors = [
    "#3498db", // blue
    "#e74c3c", // red
    "#2ecc71", // green
    "#f39c12", // yellow
    "#9b59b6", // purple
    "#1abc9c", // teal
    "#34495e", // dark blue
    "#e67e22", // orange
    "#95a5a6"  // gray
  ];

  // Get unique clusters for legend
  const uniqueClusters = Array.from(new Set(data.map(d => d.cluster)));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
        <XAxis 
          type="number" 
          dataKey="x" 
          name={xLabel} 
          label={{ 
            value: xLabel, 
            position: 'bottom', 
            offset: 5 
          }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name={yLabel}
          label={{ 
            value: yLabel, 
            angle: -90, 
            position: 'left', 
            offset: 10 
          }} 
          padding={{ top: 10, bottom: 10 }}
        />
        <ZAxis range={[60, 60]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value: any, name: string) => {
            return [
              parseFloat(value).toFixed(2),
              name === "y" ? yLabel : xLabel
            ];
          }}
          labelFormatter={(value) => `Point ${value}`}
        />
        <Legend 
          payload={uniqueClusters.map((cluster) => ({
            value: `Cluster ${cluster}`,
            type: 'circle',
            id: `cluster-${cluster}`,
            color: clusterColors[cluster % clusterColors.length]
          }))}
          onClick={(e) => {
            if (activeCluster === Number(e.value.split(' ')[1])) {
              setActiveCluster(null);
            } else {
              setActiveCluster(Number(e.value.split(' ')[1]));
            }
          }}
        />
        <Scatter 
          name="Passengers" 
          data={data} 
          onClick={(data) => onPointClick && onPointClick(data.passengerId)}
        >
          {
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={clusterColors[entry.cluster % clusterColors.length]}
                fillOpacity={activeCluster === null || activeCluster === entry.cluster ? 0.8 : 0.2}
                strokeWidth={activeCluster === entry.cluster ? 2 : 1}
              />
            ))
          }
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
