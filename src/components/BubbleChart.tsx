'use client';

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Label, LabelList, Tooltip } from 'recharts';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface BubbleChartProps {
  xAxisKey: string;
  yAxisKey: string;
  chartData: { [key: string]: string | number }[];
  xLabel: string;
  yLabel: string;
}

interface CustomizedLabelProps {
  x?: number | string;
  y?: number | string;
  value?: string | number;
}

const CustomizedLabel = ({ x, y, value }: CustomizedLabelProps) => {
  if (x === undefined || y === undefined) return null;
  return (
    <text x={x} y={y} dy={-10} fill="#000000" fontSize={12} fontWeight="bold" textAnchor="middle">
      {value}
    </text>
  );
};

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
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
      >
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#888" />
          </marker>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis
          type="number"
          dataKey={xAxisKey}
          domain={['auto', 'auto']}
          axisLine={{ stroke: '#888', markerEnd: 'url(#arrow)' }}
          tick={{ fill: '#888' }}
        >
          <Label value={xLabel} offset={-25} position="insideBottom" fontSize={16} fill="#333" />
        </XAxis>
        <YAxis
          type="number"
          dataKey={yAxisKey}
          domain={['auto', 'auto']}
          axisLine={{ stroke: '#888', markerEnd: 'url(#arrow)' }}
          tick={{ fill: '#888' }}
        >
          <Label value={yLabel} angle={-90} offset={-25} position="insideLeft" fontSize={16} fill="#333" />
        </YAxis>
        <ZAxis type="number" dataKey="Population" range={[100, 1000]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <ReferenceLine x={0} stroke="#ccc" strokeWidth={1} />
        <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />
        <Scatter data={chartData} fill="#FF5722" fillOpacity={0.9} stroke="none">
          <LabelList dataKey="Bubble Number" content={CustomizedLabel} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChart;
