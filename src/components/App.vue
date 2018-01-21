<template>
  <div id="app">
    <div class="technology-item" v-for="(technology, index) in technologies" :key="technology.name">
      <div class="technology-item__pointer" v-bind:style="{ backgroundColor: getStatusColor(technology.status ) }">
        {{ index }}</div>
      <div class="technology-item__name">{{ technology.name }}</div>
    </div>
  </div>
</template>

<script>
import { technologies, statuses } from './../data';

export default {
  name: 'app',
  data: function () {
    return {
      technologies: technologies,
      statuses: statuses
    }
  },
  methods: {
    getStatusColor: function (status) {
      const res = this.statuses.find((item) => {
        return item.name === status
      })
      return res.color
    }
  }
}
</script>

<style lang="scss" scoped>
  .technology-item {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    padding: 5px 0px;

    &__pointer {
      height: 20px;
      width: 20px;
      border-radius: 20px;
      padding: 5px;
      text-align: center;
      color: white;
      font-weight: bold;
    }

    &__name {
      padding: 5px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
</style>
