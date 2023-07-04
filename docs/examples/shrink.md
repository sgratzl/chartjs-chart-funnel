---
title: Funnel Shrinking
---

# Funnel Shrinking

<script setup>
import {top, top5, top25, middle, bottom, none} from './shrink';
</script>

## Top (default)
<FunnelChart
  :options="top.options"
  :data="top.data"
/>

### Code

<<< ./shrink.ts#top

## Top (0.5 fraction)
<FunnelChart
  :options="top5.options"
  :data="top5.data"
/>

### Code

<<< ./shrink.ts#top5

## Top (0.25 fraction)
<FunnelChart
  :options="top25.options"
  :data="top25.data"
/>

### Code

<<< ./shrink.ts#top25

## Middle
<FunnelChart
  :options="middle.options"
  :data="middle.data"
/>

### Code

<<< ./shrink.ts#middle

## Bottom
<FunnelChart
  :options="bottom.options"
  :data="bottom.data"
/>

### Code

<<< ./shrink.ts#bottom

## None
<FunnelChart
  :options="none.options"
  :data="none.data"
/>

### Code

<<< ./shrink.ts#none


