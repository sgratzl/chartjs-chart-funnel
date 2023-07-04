---
title: Gradient
---

# Gradient Color

<script setup>
import {config} from './gradient';
</script>

<FunnelChart
  :options="config.options"
  :data="config.data"
/>

### Code

<<< ./gradient.ts#config
