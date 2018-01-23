# vue-tech-radar
A collection of vue components to build an awesome tech radar.

## Demo
https://douglaseggleton.github.io/vue-tech-radar/

## Example
```
<template>
  <div id="app">
    <radar></radar>
    <radar-legend></radar-legend>
  </div>
</template>

<script>
import RadarLegend from './RadarLegend.vue'
import Radar from './Radar.vue'

export default {
  name: 'app',
  components: {
    RadarLegend,
    Radar
  }
}
</script>
```

## How to Run

1. Create your own data - edit /src/data.js
2. yarn install
3. yarn start (Go to http://localhost:1234)