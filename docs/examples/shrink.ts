import type { ChartConfiguration } from 'chart.js';
import type {} from '../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// #region top
export const top: ChartConfiguration<'funnel'> = {
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
// #endregion top

// #region top5
export const top5: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        shrinkAnchor: 'top',
        shrinkFraction: 0.5,
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion top5

// #region top25
export const top25: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        shrinkAnchor: 'top',
        shrinkFraction: 0.25,
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion top25

// #region middle
export const middle: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        shrinkAnchor: 'middle',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion middle

// #region bottom
export const bottom: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        shrinkAnchor: 'bottom',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion bottom

// #region none
export const none: ChartConfiguration<'funnel'> = {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [
      {
        data: [0.7, 0.66, 0.61, 0.01],
        shrinkAnchor: 'none',
      },
    ],
  },
  plugins: [ChartDataLabels],
};
// #endregion none
