import Theme from 'vitepress/theme';
import { createTypedChart } from 'vue-chartjs';
import { LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { FunnelController, TrapezoidElement } from '../../../src';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HierarchicalScale } from 'chartjs-plugin-hierarchical';

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component(
      'FunnelChart',
      createTypedChart('funnel', [
        LinearScale,
        CategoryScale,
        FunnelController,
        TrapezoidElement,
        Tooltip,
        ChartDataLabels,
        HierarchicalScale,
      ])
    );
  },
};
