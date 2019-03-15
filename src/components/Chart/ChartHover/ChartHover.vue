<template>
    <g class="chart-hover">
        <line
            :x1="x" :x2="x"
            y1="9%" y2="99%"
            :style="{
                stroke: '#ccc',
                strokeWidth: 0.5,
            }"
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
  },
};
</script>

<style>

</style>
