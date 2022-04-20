<template>
    <div>
        <div class="echart" id="mychart" style="width: 100%;height: 320px;margin-left: 10px"></div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import * as echarts from "echarts";

    export default {
        name: "lineChart",
        components: {},
        data() {
            return {
                xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
                yData: [23, 24, 18, 25, 27, 28, 25], //数据
            };
        },
        computed: {
            ...mapGetters([
                'xdata',
                'ydata',
            ])
        },
        async mounted() {
            this.initEcharts();
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([]),
            initEcharts() {
                // 基本柱状图
                const option = {
                    xAxis: {
                        data: this.xdata,
                        axisLabel: {
                            show: false
                        },
                    },
                    yAxis: {},
                    series: [
                        {
                            type: "bar", //形状为柱状图
                            data: this.ydata,

                        }
                    ],
                    tooltip:{
                        trigger:'axis',

                    }
                };
                const myChart = echarts.init(document.getElementById("mychart"));
                myChart.setOption(option);
                //随着屏幕大小调节图表
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            }
        },
    }
</script>

<style scoped>

</style>
