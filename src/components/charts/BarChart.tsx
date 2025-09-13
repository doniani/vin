import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  dataKey: string;
  name: string;
  color?: string;
  height?: number;
}

export const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  name,
  color = '#10b981',
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} name={name} />
      </BarChart>
    </ResponsiveContainer>
  );
};
