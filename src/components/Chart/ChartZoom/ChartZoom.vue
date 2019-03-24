<template>
    <div
        class="chart-zoom"
        :class="{ 'chart-zoom--night': activeColorMode === 'night' }"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <slot />
        </svg>
        <vue-drag-resize
            :isActive="zoomOptions.isActive"
            :preventActiveBehavior="zoomOptions.preventActiveBehavior"
            :parentLimitation="zoomOptions.parentLimitation"
            :axis="zoomOptions.axis"
            :sticks="zoomOptions.sticks"

            :parentW="applicationWidth"
            :x="left"
            :w="width"
            :h="zoomVdrHeight"

            v-on:resizing="onResize"
            v-on:dragging="onResize"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    zoomVdrWidth: {
      type: Number,
      required: true,
    },
    zoomVdrHeight: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      width: this.zoomVdrWidth,
      left: 0,
    };
  },
  computed: {
    ...mapGetters([
      'applicationWidth',
      'zoomOptions',
      'activeColorMode',
    ]),
  },
  watch: {
    applicationWidth(value) {
      this.initZoom(value);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initZoom(this.applicationWidth);
    });
  },
  methods: {
    onResize({ width, left }) {
      this.width = width;
      this.left = left;

      this.$emit('scale-change', { width, left });
    },
    initZoom(value) {
      this.left = value - this.zoomVdrWidth;

      const { left, width } = this;

      this.$emit('scale-init', { width, left });
    },
  },
};
</script>

<style lang="scss">
.chart-zoom {
    position: relative;
    height: 6em;
    margin: 1em 0 0;

    overflow: hidden;

    .vdr {
        &.active {
            &:before {
                outline: none;
                border: 1px solid rgba(135, 171, 196, .4);
                left: 8px;
                right: 8px;

                width: auto;

                box-sizing: border-box;
            }
        }
    }

    .vdr-stick {
        top: 0 !important;

        height: 100% !important;
        margin: 0 !important;
        border: none;
        background: rgba(135, 171, 196, .4);
        box-shadow: none;

        &.vdr-stick-ml,
        &.vdr-stick-mr {

            &::before {
                transition: background-color .2s;

                content: '';
                position: absolute;
                top: 0;
                width: 100vw;
                height: 100%;

                background: rgba(245, 249, 251, .8);
            }
        }

        &.vdr-stick-ml {
            left: 0 !important;

            &::before {
                right: 100%;
            }
        }

        &.vdr-stick-mr {
            right: 0 !important;

            &::before {
                left: 100%;
            }
        }
    }

    &--night {
        .vdr-stick {
            &.vdr-stick-ml,
            &.vdr-stick-mr {
                &::before {
                    background: rgba(245, 249, 251, .05);
                }
            }
        }
    }
}
</style>
