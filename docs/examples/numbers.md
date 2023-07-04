---
title: Numbers
---

# Numbers

<script setup>
import {config} from './numbers';
</script>

<FunnelChart
  :options="config.options"
  :data="config.data"
/>

### Code

<<< ./numbers.ts#config
