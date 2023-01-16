import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { FunnelController, TrapezoidElement } from '../build';

// register controller in chart.js and ensure the defaults are set
Chart.register(FunnelController, TrapezoidElement, LinearScale, CategoryScale);

const ctx = document.querySelector('canvas')!.getContext('2d')!;

const c = new Chart(ctx, {
  type: 'funnel',
  data: {
    labels: ['A', 'B'],
    datasets: [
      {
        data: [0.99, 0.6],
      },
    ],
  },
  options: {
    elements: {
      trapezoid: {
        shrinkAnchor: 'middle',
      },
    },
  },
});
