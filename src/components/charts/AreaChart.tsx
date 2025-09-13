import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: any[];
  dataKey: string;
  name: string;
  color?: string;
  height?: number;
}

export const CustomAreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  name,
  color = '#8b5cf6',
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          fill={color}
          fillOpacity={0.3}
          name={name}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
