'use client';

import { useState } from 'react';
import BubbleChart from '@/components/BubbleChart';
import { chartData } from '@/data';

const AXIS_OPTIONS = [
  { label: 'Population', value: 'Population' },
  { label: 'Statement 1', value: 'Statement 1' },
  { label: 'Statement 2', value: 'Statement 2' },
];

export default function Home() {
  const [xAxis, setXAxis] = useState('Statement 1');
  const [yAxis, setYAxis] = useState('Statement 2');

  const xLabel = AXIS_OPTIONS.find((option) => option.value === xAxis)?.label || '';
  const yLabel = AXIS_OPTIONS.find((option) => option.value === yAxis)?.label || '';

  console.log('Selected X-axis:', xAxis);
  console.log('Selected Y-axis:', yAxis);

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-center my-8">
        Interactive Quadrant Chart Web Application
      </h1>
      <div className="flex gap-4 mb-6">
        <div>
          <label htmlFor="x-axis-select" className="block text-sm font-medium text-gray-700">
            X-Axis
          </label>
          <select
            id="x-axis-select"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {AXIS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="y-axis-select" className="block text-sm font-medium text-gray-700">
            Y-Axis
          </label>
          <select
            id="y-axis-select"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {AXIS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Chart Preview</h2>
        <div className="flex justify-center">
          <BubbleChart
            xAxisKey={xAxis}
            yAxisKey={yAxis}
            chartData={chartData}
            xLabel={xLabel}
            yLabel={yLabel}
          />
        </div>
      </section>
    </main>
  );
}
