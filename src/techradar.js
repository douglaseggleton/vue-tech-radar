import * as d3 from 'd3'
import { categories, technologies, statuses } from './data'
import * as seedrandom from 'seedrandom'

// CONFIG
var container = 700
var size = 600
var baseColor = '#85B5B4'
var strokeWidth = 2
var strokeColour = '#FFFFFF'
var pointSize = 15

var random = seedrandom.default('')
var numberCache = {}

function radians(degrees) {
  return degrees * Math.PI / 180
}

function getStatusPositionByString(status) {
  return statuses.findIndex(function (element) {
    return element.name === status
  })
}

function getCategoryPositionByString(category) {
  return categories.findIndex(function (element) {
    return element === category
  })
}

function getTechnologyPositionByString(technology) {
  return technologies.findIndex(function (element) {
    return element.name === technology
  })
}

function getRadiansPerCategory() {
  return radians(360 / categories.length)
}

function generateRandomNumber(i) {
  return numberCache[i] ? numberCache[i] : (numberCache[i] = random())
}

var radar = d3.select('#radar')
  .append('svg')
  .attr('width', container)
  .attr('height', container)
  .attr('margin', 'auto')

radar.selectAll('circle')
  .data(statuses)
  .enter()
  .append('circle')
  .attr('stroke', strokeColour)
  .attr('stroke-width', strokeWidth)
  .attr('fill', baseColor)
  .attr('opacity', '0.4')
  .attr('r', function (d, i) {
    return ((size / 2) / statuses.length) *      (statuses.length - i)
  })
  .attr('cx', container / 2)
  .attr('cy', container / 2)

radar.selectAll('line')
  .data(categories)
  .enter()
  .append('line')
  .attr('x1', function (data, i) {
    var deg = (360 / (categories.length)) * i
    return (container / 2) + (size / 2) * Math.cos( deg * Math.PI/180)
  })
  .attr('y1', function (data, i) {
    var deg = (360 / (categories.length)) * i
    return (container / 2) + (size / 2) * Math.sin(deg * Math.PI/180)
  })
  .attr('x2', container / 2)
  .attr('y2', container / 2)
  .attr('stroke', strokeColour)
  .attr('stroke-width', strokeWidth)

var labelWidth = size * 0.12
var labelHeight = size * 0.04
var labelRadius = 5

radar.selectAll('rect')
  .data(statuses)
  .enter()
  .append('rect')
  .attr('x', function() {
    return container / 2 - labelWidth / 2
  })
  .attr('y', function (d, i) {
    var interval = size / 2 / statuses.length
    var offset = interval / 2 - labelHeight / 2
    var containerOffset = (container - size) / 2
    return interval * i + offset + containerOffset  
  })
  .attr('height', labelHeight)
  .attr('width', labelWidth)
  .attr('fill', 'white')
  .attr('rx', labelRadius)

radar.selectAll('text')
  .data(statuses)
  .enter()
  .append('text')
  .text(function (data) {
    return data.name
  })
  .attr('text-anchor', 'middle')
  .attr('y', function (d, i) {
    var interval = size / 2 / statuses.length
    var offset = interval / 2 - labelHeight / 2
    var containerOffset = (container - size) / 2
    return interval * i + offset + labelHeight * 0.7 + containerOffset  
  })
  .attr('fill', function (d) {
    return d.color
  })
  .attr('font-size', size * 0.023)
  .attr('x', container / 2)

var points = radar.append('g')

points.selectAll('circle')
  .data(technologies)
  .enter()
  .append('circle')
  .attr('fill', function (d) {
    return statuses[getStatusPositionByString(d.status)].color
  })
  .attr('r', pointSize)
  .attr('cx', function (d) {
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d.category),
      categoryOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * radiansPerCategory,
      angle = radiansPerCategory * (categoryPosition) + categoryOffset
    const // calculate the radius
      pixelsPerCategory = (size / 2) / statuses.length,
      statusPosition = getStatusPositionByString(d.status),
      sectorOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * pixelsPerCategory,
      radius = (size / 2) - (statusPosition * pixelsPerCategory) - sectorOffset
    const x = radius * Math.cos(angle)
    return x + container / 2
  })
  .attr('cy', function(d) {
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d.category),
      categoryOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * radiansPerCategory,
      angle = radiansPerCategory * (categoryPosition) + categoryOffset
    const // calculate the radius
      pixelsPerCategory = (size / 2) / statuses.length,
      statusPosition = getStatusPositionByString(d.status),
      sectorOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * pixelsPerCategory,
      radius = (size / 2) - (statusPosition * pixelsPerCategory) - sectorOffset
    const y = radius * Math.sin(angle)
    return y + container / 2
  })




points.selectAll('text')
  .data(technologies)
  .enter() 
  .append('text')
  .text(function (d, i) {
    return i
  })
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .attr('font-size', size * 0.02)
  .attr('x', function (d) { 
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d.category),
      categoryOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * radiansPerCategory,
      angle = radiansPerCategory * (categoryPosition) + categoryOffset
    const // calculate the radius
      pixelsPerCategory = (size / 2) / statuses.length,
      statusPosition = getStatusPositionByString(d.status),
      sectorOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * pixelsPerCategory,
      radius = (size / 2) - (statusPosition * pixelsPerCategory) - sectorOffset
    const x = radius * Math.cos(angle)
    return x + container / 2
  })
  .attr('y', function(d) {
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d.category),
      categoryOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * radiansPerCategory,
      angle = radiansPerCategory * (categoryPosition) + categoryOffset
    const // calculate the radius
      pixelsPerCategory = (size / 2) / statuses.length,
      statusPosition = getStatusPositionByString(d.status),
      sectorOffset = generateRandomNumber(getTechnologyPositionByString(d.name)) * pixelsPerCategory,
      radius = (size / 2) - (statusPosition * pixelsPerCategory) - sectorOffset
    const y = radius * Math.sin(angle)
    return y + container / 2 + pointSize * 0.3
  })

radar.selectAll('.category-label')
  .data(categories)
  .enter()
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('class', 'category-label')
  .attr('fill', strokeColour)
  .text(function (d) {
    return d
  })
  .attr('x', function(d) {
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d),
      categoryOffset = radiansPerCategory / 2,
      angle = radiansPerCategory * categoryPosition + categoryOffset
    const // calculate the radius
      radius = size / 2
    const x = radius * Math.cos(angle)
    return x + container / 2
  })
  .attr('y', function(d) {
    const // calculate the angle (radians) 
      radiansPerCategory = getRadiansPerCategory(),
      categoryPosition = getCategoryPositionByString(d),
      categoryOffset = radiansPerCategory / 2, // middle of the sector
      angle = radiansPerCategory * categoryPosition + categoryOffset
    const // calculate the radius
      radius = size / 2
    const y = radius * Math.sin(angle)
    return y + container / 2
  })