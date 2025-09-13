import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: any[];
  dataKey: string;
  name: string;
  color?: string;
  height?: number;
}

export const CustomRadarChart: React.FC<RadarChartProps> = ({
  data,
  dataKey,
  name,
  color = '#f59e0b',
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={name}
          dataKey={dataKey}
          stroke={color}
          fill={color}
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
