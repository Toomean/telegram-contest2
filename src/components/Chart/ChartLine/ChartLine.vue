<template>
    <g>
        <transition name="line">
            <path v-if="line.visible"
                :class="['line']"
                :style="{
                    fill: 'none',
                    strokeWidth: 3,
                    stroke: line.color,
                }"
                :d="`M${ points.slice(0,2) }L${ points.slice(2) }`"
            ></path>
        </transition>
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
    };
  },

  computed: {
    heightRatio() {
      return 500 / this.max * 0.9;
    },
    points() {
      return this.dates
        .map((date, index) => (
          [index * 10, this.height - this.line.columns[index] * this.heightRatio]
        ))
        .flat();
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
    fill: none;

    transition: d .25s;
}

.line-enter-active, .line-leave-active {
  transition: opacity .25s, transform .25s;
}
.line-enter, .line-leave-to{
  opacity: 0;
  transform: translateY(-50%);
}

.line-fade-enter-active, .line-fade-leave-active {
  transition: opacity .25s;
}
.line-fade-enter, .line-fade-leave-to{
  opacity: 0;
}
</style>
