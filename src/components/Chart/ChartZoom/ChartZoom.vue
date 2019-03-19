<template>
    <div class="chart-zoom">
        <div class="chart-zoom__left">

        </div>
        <div class="chart-zoom__window">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <slot />
            </svg>
        </div>
        <div class="chart-zoom__right">

        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.chart-zoom {
    position: relative;
    margin: 1em 0;
    height: 5em;
    background: #f5f9fb;

    &__left,
    &__right {
        position: absolute;
        top: 0;
        left: 0;

        width: .5em;
        height: 100%;

        background: #ddeaf3;

        cursor: ew-resize;
    }

    &__right {
        left: 100%;
        transform: translateX(-100%);
    }

    &__window {
        height: 100%;
    }
}
</style>
