---
title: Getting Started
---

Chart.js module for charting funnel plots. This plugin extends with a new char type `funnel`.

A Funnel chart is a variant of a bar chart where the bar shrinks on one side to the size of the next bar. In addition, they are usually centered giving the visual impression of a funnel.

![funnel chart](https://user-images.githubusercontent.com/4129778/212717664-b3c63b7f-022b-4a39-953c-9d6e45265f7c.png)

## Install

```sh
npm install chart.js chartjs-chart-funnel
```

## Usage

see [Examples](./examples/)

and [CodePen](https://codepen.io/sgratzl/pen/eYjEXQW)

## Configuration

### Data Structure

you can either provide percentages (values between 0 and 1) or absolute values (> 1)

### Styling

Trapezoid Elements are Bar elements and provide the same coloring options. In addition, see [TrapezoidElementOptions](/api/interfaces/interface.TrapezoidElementOptions.md) custom option with respect to shrinking behavior.

In addition, the FunnelController has the following options [FunnelController](/api/interfaces/interface.FunnelChartOptions.md) to customize the alignment of the chart.
