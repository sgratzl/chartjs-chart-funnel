# Chart.js Funnel

[![License: MIT][mit-image]][mit-url] [![NPM Package][npm-image]][npm-url] [![Github Actions][github-actions-image]][github-actions-url]

Chart.js module for charting funnel plots. This plugin extends with a new char type `funnel`.

A Funnel chart is a variant of a bar chart where the bar shrinks on one side to the size of the next bar. In addition, they are usually centered giving the visual impression of a funnel.

![funnel chart](https://user-images.githubusercontent.com/4129778/212717664-b3c63b7f-022b-4a39-953c-9d6e45265f7c.png)

Works great with https://github.com/chartjs/chartjs-plugin-datalabels

![funnel chart with labels](https://user-images.githubusercontent.com/4129778/212717832-5932802e-01d2-4da4-82eb-c4f9d3d1eebe.png)

## Related Plugins

Check out also my other chart.js plugins:

- [chartjs-chart-boxplot](https://github.com/sgratzl/chartjs-chart-boxplot) for rendering boxplots and violin plots
- [chartjs-chart-error-bars](https://github.com/sgratzl/chartjs-chart-error-bars) for rendering errors bars to bars and line charts
- [chartjs-chart-geo](https://github.com/sgratzl/chartjs-chart-geo) for rendering map, bubble maps, and choropleth charts
- [chartjs-chart-graph](https://github.com/sgratzl/chartjs-chart-graph) for rendering graphs, trees, and networks
- [chartjs-chart-pcp](https://github.com/sgratzl/chartjs-chart-pcp) for rendering parallel coordinate plots
- [chartjs-chart-venn](https://github.com/sgratzl/chartjs-chart-venn) for rendering venn and euler diagrams
- [chartjs-chart-wordcloud](https://github.com/sgratzl/chartjs-chart-wordcloud) for rendering word clouds
- [chartjs-plugin-hierarchical](https://github.com/sgratzl/chartjs-plugin-hierarchical) for rendering hierarchical categorical axes which can be expanded and collapsed

## Install

```bash
npm install chart.js chartjs-chart-funnel
```

## Usage

see [Samples](https://github.com/sgratzl/chartjs-chart-funnel/tree/main/samples) on Github

and [![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/eYjEXQW)

## Styling

Trapezoid Elements are Bar elements and provide the same coloring options. In addition, see [TrapezoidElementOptions](https://github.com/sgratzl/chartjs-chart-funnel/blob/main/src/elements/TrapezoidElement.tjs#L11-L27) custom option with respect to shrinking behavior.

In addition, the FunnelController has the following options [FunnelController](https://github.com/sgratzl/chartjs-chart-funnel/blob/main/src/controllers/FunnelController.tjs#L24-L30) to customize the alignment of the chart.

### ESM and Tree Shaking

The ESM build of the library supports tree shaking thus having no side effects. As a consequence the chart.js library won't be automatically manipulated nor new controllers automatically registered. One has to manually import and register them.

Variant A:

```js
import Chart, { LinearScale, CategoryScale } from 'chart.js';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

// register controller in chart.js and ensure the defaults are set
Chart.register(FunnelController, TrapezoidElement, LinearScale, CategoryScale);

const chart = new Chart(document.getElementById('canvas').getContext('2d'), {
  type: 'funnel',
  data: {
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    datasets: [{
      data: [0.7, 0.66, 0.61, 0.01],
    }]
  },
});
```

Variant B:

```js
import { FunnelChart } from 'chartjs-chart-funnel';

const chart = new FunnelChart(document.getElementById('canvas').getContext('2d'), {
  data: {
    //...
  },
});
```

## Development Environment

```sh
npm i -g yarn
yarn install
yarn sdks vscode
```

### Building

```sh
yarn install
yarn build
```

[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[npm-image]: https://badge.fury.io/js/chartjs-chart-funnel.svg
[npm-url]: https://npmjs.org/package/chartjs-chart-funnel
[github-actions-image]: https://github.com/sgratzl/chartjs-chart-funnel/workflows/ci/badge.svg
[github-actions-url]: https://github.com/sgratzl/chartjs-chart-funnel/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
