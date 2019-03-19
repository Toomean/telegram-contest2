<template>
    <g class="chart-hover">
        <line
            class="chart-hover__line"
            :x1="0" :x2="0"
            y1="9%" y2="99%"
            :style="{
                stroke: '#ccc',
                strokeWidth: 0.25,
                transform: 'translate(' + hoveredIndex * 10 + 'px, 0)',
            }"
        />
        <line
            v-for="(column, index) in xAxisColumns"
            :key="`x-axis-line-${ index }`"
            :x1="index * 10" :x2="index * 10"
            y1="9%" y2="99%"
            :style="{
                stroke: 'transparent',
                strokeWidth: 9,
            }"
            @mouseover="onLineMouseOver(index)"
        />
    </g>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      required: true,
    },
    xAxis: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hoveredIndex: null,
    };
  },
  computed: {
    xAxisColumns() {
      return this.xAxis
          && this.xAxis.columns;
    },
  },
  mounted() {
    console.log(this.xAxisColumns);
  },
  methods: {
    onLineMouseOver(index) {
      this.hoveredIndex = index;
      this.$emit('x-hover', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-hover {
    &__line {
        transition: .25s;
    }
}
</style>
