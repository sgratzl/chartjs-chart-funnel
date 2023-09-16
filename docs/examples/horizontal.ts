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
        shrinkAnchor: 'top',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion config
