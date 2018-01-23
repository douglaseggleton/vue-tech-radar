<template>
  <div id="app">
    <header>
      <h1 class="h1">
        <span class="h1-small">Build Your</span>
        <span class="h1-large">Tech Radar</span>
      </h1>
    </header>
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

<style lang="scss" scoped>
  #app {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  header {
    flex-basis: 100%;
  }
</style>
