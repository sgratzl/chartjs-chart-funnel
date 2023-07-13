import {
  Chart,
  ChartItem,
  ScriptableAndArrayOptions,
  ControllerDatasetOptions,
  CommonHoverOptions,
  UpdateMode,
  ChartConfiguration,
  Scale,
  ScriptableContext,
  CategoryScale,
  BarController,
  CoreChartOptions,
  CartesianScaleTypeRegistry,
  LinearScale,
} from 'chart.js';
import { merge } from 'chart.js/helpers';
import { pickForegroundColorToBackgroundColor, blues } from '../color';
import { TrapezoidElement, TrapezoidElementOptions } from '../elements';
import patchController from './patchController';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FunnelChartOptions {
  /**
   * alignment of the elements one of center, left, right
   * @default center
   */
  align: 'center' | 'left' | 'right';
}

export class FunnelController extends BarController {
  /**
   * @hidden
   */
  declare options: FunnelChartOptions;

  static readonly id: string = 'funnel';

  /**
   * @hidden
   */
  static readonly defaults: any = /* #__PURE__ */ merge({}, [
    BarController.defaults,
    {
      dataElementType: TrapezoidElement.id,
      barPercentage: 1,
      align: 'center',
      categoryPercentage: 0.98,
    },
  ]);

  /**
   * @hidden
   */
  static readonly overrides: any = /* #__PURE__ */ merge({}, [
    (BarController as any).overrides,
    {
      plugins: {
        legend: {
          display: false,
        },
        colors: {
          enabled: false,
        },
        datalabels: {
          anchor: 'start',
          // align: 'start',
          textAlign: 'center',
          font: {
            size: 20,
          },
          color: (context: {
            chart: Chart<'funnel'>;
            dataset: Chart['data']['datasets'][0];
            dataIndex: number;
            datasetIndex: number;
          }) => {
            // auto pick color based on background color
            const bgColor = context.chart.getDatasetMeta(context.datasetIndex).data[context.dataIndex].options
              .backgroundColor as string;
            return pickForegroundColorToBackgroundColor(bgColor, Chart.defaults.color as string, '#ffffff');
          },
          formatter: (value: number, context: { chart: Chart<'funnel'>; dataIndex: number }) => {
            const label = context.chart.data.labels?.[context.dataIndex] ?? '';
            return `${label}\n${(value * 100).toLocaleString()}%`;
          },
        },
      },
      scales: {
        _index_: {
          display: false,
          padding: 10,
          grid: {
            display: false,
          },
        },
        _value_: {
          display: false,
          beginAtZero: false,
          grace: 0,
          grid: {
            display: false,
          },
        },
      },
      elements: {
        trapezoid: {
          backgroundColor(context: ScriptableContext<'funnel'>) {
            const nData = context.chart.data.datasets[context.datasetIndex].data.length;
            return blues(context.dataIndex, nData);
          },
        },
      },
    },
  ]);

  /**
   * @hidden
   */
  getMinMax(scale: Scale, canStack?: boolean | undefined): { min: number; max: number } {
    const { max } = super.getMinMax(scale, canStack);
    const r = {
      // fake mirroring the scale
      center: { min: -max, max },
      left: { min: 0, max },
      right: { min: -max, max: 0 },
    }[this.options.align];
    return r;
  }

  /**
   * @hidden
   */
  update(mode: UpdateMode): void {
    super.update(mode);
    const meta = this._cachedMeta;
    // create a link
    const elements = (meta.data || []) as unknown as TrapezoidElement[];
    for (let i = 0; i < elements.length; i++) {
      elements[i].align = this.options.align;
      elements[i].next = elements[i + 1];
      elements[i].previous = elements[i - 1];
    }
  }
}

export interface FunnelControllerDatasetOptions
  extends ControllerDatasetOptions,
    ScriptableAndArrayOptions<TrapezoidElementOptions, ScriptableContext<'funnel'>>,
    ScriptableAndArrayOptions<CommonHoverOptions, ScriptableContext<'funnel'>> {}

declare module 'chart.js' {
  interface ChartTypeRegistry {
    funnel: {
      chartOptions: FunnelChartOptions & CoreChartOptions<'funnel'>;
      datasetOptions: FunnelControllerDatasetOptions;
      defaultDataPoint: number;
      metaExtensions: Record<string, never>;
      parsedDataType: { x: number; y: number };
      scales: keyof CartesianScaleTypeRegistry;
    };
  }
}

export class FunnelChart<DATA extends unknown[] = number[], LABEL = string> extends Chart<'funnel', DATA, LABEL> {
  static id = FunnelController.id as 'funnel';

  constructor(item: ChartItem, config: Omit<ChartConfiguration<'funnel', DATA, LABEL>, 'type'>) {
    super(item, patchController('funnel', config, FunnelController, TrapezoidElement, [CategoryScale, LinearScale]));
  }
}
