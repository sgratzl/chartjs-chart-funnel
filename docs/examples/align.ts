import type { ChartConfiguration } from 'chart.js';
import type {} from '../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// #region center
export const center: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion center

// #region left
export const left: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        align: 'left',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion left

// #region right
export const right: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        align: 'right',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion right
