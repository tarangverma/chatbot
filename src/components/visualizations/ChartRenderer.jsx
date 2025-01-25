import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { chartsConfig } from '@/configs/charts-config';

export function ChartRenderer({ data, type }) {
  if (!data || !type) return null;

  const chartConfig = {
    ...chartsConfig,
    series: data.series,
    type: type,
    labels: data.labels
  };

  return (
    <div className="w-full h-[300px] p-4">
      <ReactApexChart
        options={chartConfig}
        series={data.series}
        type={type}
        height="100%"
      />
    </div>
  );
}
