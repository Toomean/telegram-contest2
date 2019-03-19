<template>
    <div class="chart-tooltip"
        :style="{
            left: posLeft + 'px',
        }"
    >
        <div class="chart-tooltip__date">{{ tooltipData.date }}</div>
        <ul class="chart-tooltip__data-list">
            <li class="chart-tooltip__data-item"
                v-for="(item, index) in tooltipData.items"
                :key="`tooltip-item-${ index }`"
                :style="{
                    color: item.color,
                }"
            >
                <div class="chart-tooltip__data-item-value">
                    {{ item.value }}
                </div>
                <div class="chart-tooltip__data-item-name">
                    {{ item.name }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    posLeft: {
      type: Number,
      default: 0,
    },
    tooltipData: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-tooltip {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(-50%);
    transition: transform .1s;

    padding: .4em .8em;
    border-radius: .5em;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);

    background: #fff;

    text-align: left;

    &__date {
        margin: 0 0 .5em;
    }

    &__data-list {
        margin: 0;
        padding: 0;
        list-style: none;

        display: flex;
    }

    &__data-item {
        &:not(:last-child) {
            margin: 0 1em 0 0;
        }
    }

    &__data-item-value {
        font-weight: bold;
        font-size: 1.15em;
    }

    &__data-item-name {
        font-size: .85em;
    }
}
</style>
