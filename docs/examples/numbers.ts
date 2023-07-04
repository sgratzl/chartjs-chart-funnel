import type { ChartConfiguration } from 'chart.js';
import type {} from '../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// #region config
export const config: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3'],
    datasets: [
      {
        data: [2000, 1500, 300],
        datalabels: {
          formatter: (v) => v.toLocaleString(),
        },
      },
    ],
  },
  options: {
    indexAxis: 'y',
  },
  plugins: [ChartDataLabels],
};
// #endregion config
