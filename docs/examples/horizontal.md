---
title: Horizontal Funnel
---

# Horizontal Funnel

<script setup>
import {config} from './horizontal';
</script>

<FunnelChart
  :options="config.options"
  :data="config.data"
/>

### Code

<<< ./horizontal.ts#config
