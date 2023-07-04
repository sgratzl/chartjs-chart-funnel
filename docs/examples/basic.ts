import type { ChartConfiguration } from 'chart.js';
import type {} from '../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// #region config
export const config: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        datalabels: {
          // anchor: (context) => {
          //   const value = context.dataset.data[context.dataIndex];
          //   return value < 0.02 ? 'end': 'start';
          // },
          // align: (context) => {
          //   const value = context.dataset.data[context.dataIndex];
          //   return value < 0.02 ? 'end': 'center';
          // },
          // textAlign: 'center',
          // // color: (context) => {
          // //   return '#FFCE56';
          // // },
          // font: {
          //   size: 20,
          // },
          // formatter: (value, context) => {
          //   const label = context.chart.data.labels[context.dataIndex];
          //   return `${label}\n${(value * 100).toLocaleString()}%`;
          // }
        },
        // backgroundColor: ChartFunnel.schemeBlues[9],
      },
    ],
  },
  options: {
    indexAxis: 'y',
  },
  plugins: [ChartDataLabels],
};
// #endregion config
