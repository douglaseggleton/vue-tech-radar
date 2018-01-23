<template>
<div>
  <svg viewBox="0 0 700 700">
    <!--
      status rings
      -->
    <circle v-for="(status, i) in statuses" :key="status.name" 
      class="status-circle"
      :cx="chartRadius + containerOffset" 
      :cy="chartRadius + containerOffset" 
      :r="chartRadius - (chartRadius / statuses.length * i)"></circle>
    
    <!--
      category dividers
      -->
    <line v-for="(category, i) in categories" :key="category"
      class="category-radius"
      :x1="calculateCategoryLineXPos(i) + containerOffset"
      :y1="calculateCategoryLineYPos(i) + containerOffset" 
      :x2="chartRadius + containerOffset" 
      :y2="chartRadius + containerOffset">
    </line>

    <!--
      category labels
      -->
    <text v-for="(category, i) in categories" :key="category + 1"
      class="category-label" 
      :x="getCategoryLabelXPos(category, i) + containerOffset"
      :y="getCategoryLabelYPos(category, i) + containerOffset">
      {{ category }}
    </text>

    <!-- 
      technologies
      -->
    <g v-for="(technology, i) in technologies" :key="technology.name" 
      class="pointer">
      <circle class="pointer__circle"
        :fill="getStatusColor(technology.status)"
        :cx="getTechnologyXPos(technology, i) + containerOffset" 
        :cy="getTechnologyYPos(technology, i) + containerOffset"
        r="15">
      </circle>
      <text class="pointer__text"
        :x="getTechnologyXPos(technology, i) + containerOffset"
        :y="getTechnologyYPos(technology, i) + containerOffset + pointerSize * 0.5">
        {{ i }}
      </text>
    </g>

    <!--
      status labels
      -->
    <g v-for="(status, i) in statuses" :key="status.name + 1" class="status-label">
      <rect class="status-label__rect"
        :height="labelHeight"
        :width="labelWidth"
        :x="chartRadius - ( labelWidth / 2) + containerOffset"
        :y="getStatusLabelYPos(status, i) + containerOffset"
        rx="5">
      </rect>
      <text class="status-label__text"
        :fill="status.color"
        :font-size="containerSize * 0.023"
        :x="chartRadius + containerOffset"
        :y="getStatusLabelYPos(status, i)  + labelHeight * 0.7 + containerOffset">
        {{ status.name }}
      </text>
    </g>
  </svg>
</div>
</template>

<script>
import { technologies, statuses, categories } from './../data'
import * as seedrandom from 'seedrandom'

const random = seedrandom.default('')

const numberCache = {};

const containerSize = 600;

const chartDiameter = 600;
const containerOffset = 50;

function radians(degrees) {
  return degrees * Math.PI / 180
}

function generateRandomNumber(i) {
  return numberCache[i] ? numberCache[i] : (numberCache[i] = random())
}

export default {
  name: 'radar',
  data: function () {
    return {
      technologies: technologies,
      statuses: statuses,
      categories: categories,
      containerSize: chartDiameter,
      radiansPerCategory: radians(360 / categories.length),
      pointerSize: 10,
      labelWidth: chartDiameter * 0.12,
      labelHeight: chartDiameter * 0.04,
      chartDiameter: chartDiameter,
      chartRadius: chartDiameter / 2,
      containerOffset: containerOffset
    }
  },
  methods: {
    getStatusLabelYPos: function(status, i) {
      var interval = this.chartRadius / this.statuses.length
      var offset = interval / 2 - this.labelHeight / 2
      return interval * i + offset  
    },
    getCategoryLabelXPos: function(category, i) {
      const categoryOffset = this.radiansPerCategory / 2,
        angle = this.radiansPerCategory * i + categoryOffset
      return this.chartRadius * Math.cos(angle) + this.chartRadius
    },
    getCategoryLabelYPos: function(category, i) {
      const categoryOffset = this.radiansPerCategory / 2,
        angle = this.radiansPerCategory * i + categoryOffset
      return this.chartRadius * Math.sin(angle) + this.chartRadius
    },
    getCategoryPositionByString: function(category) {
      return this.categories.findIndex(function (element) {
        return element === category
      })
    },
    getStatusPositionByString: function(status) {
      return this.statuses.findIndex(function (element) {
        return element.name === status
      })
    },
    getTechnologyXPos: function (technology, index) {
      const // calculate the angle (radians) 
        categoryPosition = this.getCategoryPositionByString(technology.category),
        categoryOffset = generateRandomNumber(index) * this.radiansPerCategory,
        angle = this.radiansPerCategory * (categoryPosition) + categoryOffset
      const // calculate the radius
        pixelsPerCategory = this.chartRadius / this.statuses.length,
        statusPosition = this.getStatusPositionByString(technology.status),
        sectorOffset = generateRandomNumber(index) * pixelsPerCategory,
        radius = this.chartRadius - (statusPosition * pixelsPerCategory) - sectorOffset
      return radius * Math.cos(angle) + this.chartRadius
    },
    getTechnologyYPos: function (technology, index) {
      const // calculate the angle (radians) 
        categoryPosition = this.getCategoryPositionByString(technology.category),
        categoryOffset = generateRandomNumber(index) * this.radiansPerCategory,
        angle = this.radiansPerCategory * (categoryPosition) + categoryOffset
      const // calculate the radius
        pixelsPerCategory = this.chartRadius / this.statuses.length,
        statusPosition = this.getStatusPositionByString(technology.status),
        sectorOffset = generateRandomNumber(index) * pixelsPerCategory,
        radius = this.chartRadius - (statusPosition * pixelsPerCategory) - sectorOffset
      return radius * Math.sin(angle) + this.chartRadius
    },
    calculateCategoryLineXPos: function (categoryIndex) {
      const angle = (360 / this.categories.length) * categoryIndex
      return this.chartRadius * Math.cos(radians(angle)) + this.chartRadius
    },
    calculateCategoryLineYPos: function (categoryIndex) {
      const angle = (360 / this.categories.length) * categoryIndex
      return this.chartRadius * Math.sin(radians(angle)) + this.chartRadius
    },
    getStatusColor: function (status) {
      return this.statuses.find((item) => item.name === status).color
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    max-width: 600px;
    margin-bottom: 50px;
  }

  svg {
    width: 100%;
    height: auto;
  }

  .status-circle {
    fill: #85B5B4;
    stroke: #FFF;
    stroke-width: 2px;
    opacity: 0.5;
  }

  .category-radius {
    stroke: #FFF;
    stroke-width: 2px;
  }

  .category-label {
    fill: #FFF;
    text-anchor: middle;
  }

  .status-label {
    &__rect {
      fill: #FFF;
    }

    &__text {
      text-anchor: middle;
    }
  }

  .pointer {
    &__text {
      fill: #FFF;
      text-anchor: middle;
      font-size: 1em;
    }
  }

  .pointer:hover {
    cursor: pointer;

    .pointer__circle {
      fill: #000;
    }
  }
</style>
