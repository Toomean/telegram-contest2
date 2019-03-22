<template>
    <div class="chart-zoom"
        ref="zoom"
    >
        <svg xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <slot />
        </svg>
        <vue-drag-resize
            :x="left"
            :isActive="true"
            :preventActiveBehavior="true"
            :w="width"
            :h="96"
            :axis="'x'"
            :sticks="['ml','mr']"
            v-on:resizing="onResize"
            v-on:dragging="onResize"
            :parentLimitation="true"
        />
    </div>
</template>

<script>
export default {
  data() {
    return {
      width: 200,
      height: 0,
      top: 0,
      left: 0,
    };
  },
  mounted() {
    this.left = this.$refs.zoom.clientWidth - this.width;
  },
  methods: {
    onResize({
      width, height, top, left,
    }) {
      this.width = width;
      this.height = height;
      this.top = top;
      this.left = left;

      this.$emit('scale-change', {
        scale: this.$refs.zoom.clientWidth / width,
        pos: (left / this.width * 100),
      });
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
}
</style>
