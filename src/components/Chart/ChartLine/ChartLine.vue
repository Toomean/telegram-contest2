<template>
    <g v-if="line.visible">
        <path
            :class="['line']"
            :style="{
                fill: 'none',
                strokeWidth: 3,
                stroke: line.color,
            }"
            :d="`M${ points.slice(0,2) }L${ points.slice(2) }`"
        ></path>
    </g>
</template>

<script>
export default {
  props: {
    line: {
      type: Object,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      height: 500,
      heightRatio: 500 / this.max * 0.9,
    };
  },

  computed: {
    points() {
      return this.dates
        .map((date, index) => (
          [index * 10, this.height - this.line.columns[index] * this.heightRatio]
        ))
        .flat();
    },
  },

  mounted() {
    // console.log('line: ', this.line.columns);
    // console.log('dates: ', this.dates);
    // console.log('points: ', this.points);
  },
};
</script>

<style lang="scss" scoped>
.line {
    fill: none;
}
</style>
