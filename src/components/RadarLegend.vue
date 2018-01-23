<template>
  <div class="radar-legend">
    <div class="category" v-for="(category) in categories" :key="category">
      <h2 class="h2">{{ category }}</h2>
      <div v-if="category === technology.category" class="technology-item" v-for="(technology, index) in technologies" :key="technology.name">
        <div class="technology-item__pointer" v-bind:style="{ backgroundColor: getStatusColor(technology.status ) }">
          {{ index }}</div>
        <div class="technology-item__name">{{ technology.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { technologies, statuses, categories } from './../data';

export default {
  name: 'categoryForm',
  data: function () {
    return {
      technologies: technologies,
      statuses: statuses,
      categories: categories
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

.radar-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 960px;
}

.h2 {
  text-transform: capitalize;
  flex-basis: 100%;
  text-align: center;
}

.category {
  flex-basis: 25%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  margin: 10px;
  padding: 20px;
  align-content: flex-start;
  background: #17212a;
  opacity: 0.8;
}

.technology-item {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    padding: 5px 0px;
    flex-basis: 50%;

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
