import { CategoryScale, LinearScale, registry } from 'chart.js';
import createChart from '../__tests__/createChart';
import { FunnelController } from './FunnelController';
import { TrapezoidElement } from '../elements';
import { describe, beforeAll, test } from 'vitest';
describe('funnel', () => {
  beforeAll(() => {
    registry.addControllers(FunnelController);
    registry.addElements(TrapezoidElement);
    registry.addScales(LinearScale, CategoryScale);
  });
  test('default', () => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test('horizontal', () => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
            },
          ],
        },
        options: {
          indexAxis: 'x',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test('numbers', () => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [100, 75, 50],
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test.each(['top', 'bottom', 'none', 'middle'])('shrink-%s', (shrinkAnchor: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              shrinkAnchor: shrinkAnchor as 'top' | 'bottom' | 'none' | 'middle',
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test.each(['top', 'bottom', 'none', 'middle'])('hor-shrink-%s', (shrinkAnchor: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              shrinkAnchor: shrinkAnchor as 'top' | 'bottom' | 'none' | 'middle',
            },
          ],
        },
        options: {
          indexAxis: 'x',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test.each(['0', '0.25', '0.5', '0.75', '1'])('shrink-fraction-%s', (shrinkFraction: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              shrinkFraction: +shrinkFraction,
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test.each(['0', '0.25', '0.5', '0.75', '1'])('hor-shrink-fraction-%s', (shrinkFraction: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              shrinkFraction: +shrinkFraction,
            },
          ],
        },
        options: {
          indexAxis: 'x',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });

  test.each(['left', 'right', 'center'])('align-%s', (align: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              align: align as 'left' | 'right' | 'center',
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
  test.each(['left', 'right', 'center'])('hor-align-%s', (align: string) => {
    const chart = createChart(
      {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3'],
          datasets: [
            {
              data: [1, 0.75, 0.5],
              align: align as 'left' | 'right' | 'center',
            },
          ],
        },
        options: {
          indexAxis: 'x',
        },
      },
      500,
      200
    );
    return chart.toMatchImageSnapshot();
  });
});
