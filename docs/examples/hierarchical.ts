import type { ChartConfiguration } from 'chart.js';
import type {} from '../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// #region config
export const config: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: [
      {
        label: 'Step 1',
        children: ['A', 'B'],
      },
      'Step 2',
    ],
    datasets: [
      {
        tree: [
          {
            value: 0.9,
            children: [0.9, 0.8],
          },
          0.7,
        ],
        datalabels: {
          // formatter: (v) => v.toLocaleString(),
        },
      } as any,
    ],
  },
  options: {
    indexAxis: 'y',
    layout: {
      padding: {
        // add more space at the bottom for the hierarchy
        left: 100,
      },
    },
    scales: {
      y: {
        display: true,
        type: 'hierarchical',
        padding: 25,
        levelPercentage: 1,
      },
      x: {
        // display: true,
      },
    },
  },
  plugins: [ChartDataLabels],
};
// #endregion config
