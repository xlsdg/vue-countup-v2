<template>
  <div style="padding: 2rem; font-family: sans-serif">
    <h1>Vue CountUp V2 - Dev Playground</h1>

    <div style="margin: 2rem 0">
      <h2>Basic Example</h2>
      <CountUp :end-val="2024" :duration="2" />
    </div>

    <div style="margin: 2rem 0">
      <h2>With Decimals</h2>
      <CountUp :end-val="3.14159" :duration="3" :decimals="5" />
    </div>

    <div style="margin: 2rem 0">
      <h2>Currency Format</h2>
      <CountUp :end-val="1234567.89" :duration="2" :decimals="2" :options="{ prefix: '$', separator: ',' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CountUp from './countup.vue';
</script>
