---
title: Hierarchical Funnel
---

# Hierarchical Funnel

<script setup>
import {config} from './hierarchical';
</script>

<FunnelChart
  :options="config.options"
  :data="config.data"
/>

### Code

<<< ./hierarchical.ts#config
