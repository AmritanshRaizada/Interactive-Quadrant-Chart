'use client';

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface BubbleChartProps {
  xAxisKey: string;
  yAxisKey: string;
  chartData: { [key: string]: string | number }[];
  xLabel: string;
  yLabel: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: ValueType, payload: { [key: string]: string | number } }[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded text-black">
        <p className="font-bold">{data["Bubble Number"]}</p>
        <p>Population: {data["Population"]}</p>
        <p>X: {payload[0].value}</p>
        <p>Y: {payload[1].value}</p>
      </div>
    );
  }

  return null;
};

const BubbleChart = ({ xAxisKey, yAxisKey, chartData, xLabel, yLabel }: BubbleChartProps) => {
  return (
    <ScatterChart
      width={500}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey={xAxisKey} name={xLabel} />
      <YAxis type="number" dataKey={yAxisKey} name={yLabel} />
      <ZAxis type="number" dataKey="Population" range={[60, 400]} name="Population" />
      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <ReferenceLine x={0} stroke="#ccc" />
      <ReferenceLine y={0} stroke="#ccc" />
      <Scatter name="Bubbles" data={chartData} fill="#8884d8" />
    </ScatterChart>
  );
};

export default BubbleChart;
