---
title: Funnel Alignment
---

# Funnel Alignment

<script setup>
import {center, left, right} from './align';
</script>

## Center (default)

<FunnelChart
  :options="center.options"
  :data="center.data"
/>

### Code

<<< ./align.ts#center

## Left

<FunnelChart
  :options="left.options"
  :data="left.data"
/>

### Code

<<< ./align.ts#left

## Right

<FunnelChart
  :options="right.options"
  :data="right.data"
/>

### Code

<<< ./align.ts#right
