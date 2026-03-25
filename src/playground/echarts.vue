<template>
    <div class="echarts" ref="echarts">
        232
    </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';


import dataJson from './data.json'
export default {
    name: 'echarts',

    mounted() {
        this.getOption()
    },


    methods: {
        formatTimeBy(time) { 
            var d = new Date(time)
            var y = d.getFullYear()
            var m = d.getMonth() + 1
            var day = d.getDate()

            return `${y}-${m}-${day}`
        },
        getOption() {
            const echartDom = this.$refs.echarts
            const myChart = echarts.init(echartDom);
            console.log({
                dataJson
            })

            const time = dataJson.map(item => this.formatTimeBy(item.accidentTime))
            console.log({
                time
            })
            const option = {
                visualMap: [{
                    bottom: 1000,
                    calculable: false,
                    // dimension: 3,
                    // max: 100,
                    inRange: {
                        color: ['orange'],
                        // symbolSize: [1, 50]
                    },
                    textStyle: {
                        color: '#000'
                    }
                }],
                grid3D: {
                    show: true,
                    boxWidth: 90,
                    boxHeight: 90,
                    boxDepth: 90,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            opacity: .3,
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        margin: 5,
                        textStyle: {
                            color: '#eee',
                            fontSize: 10
                        }
                    },
                    axisTick: {
                        show: false,
                        length: 0,
                        lineStyle: {
                            color: '#eee',
                            opacity: 0,
                            width: 0
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#eee'],
                            opacity: .5,
                            width: 1
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['transparent']
                        }
                    },
                    axisPointer: {
                        show: true,
                        lineStyle: {
                            color: 'orange',
                            opacity: 1,
                            width: 1
                        },
                        label: {
                            show: true,
                            margin: 8,
                            textStyle: {
                                color: 'red',
                                fontSize: 20
                            }
                        }
                    }
                },
                tooltip: {},
                xAxis3D: {
                    show: false,
                    splitNumber: 5,
                     minInterval: 100,
                    name: '',
                    type: 'category',
                    data: ['200', '400', '600', '800', '1000', '1200', '1400']
                },
                yAxis3D: {
                    show: false,
                    name: '',
                    type: 'category',
                    data: ['08-10', '08-11', '08-12', '08-13', '08-14', '08-15', '08-16']
                },
                zAxis3D: {
                    show: false,
                    name: '',
                    type: 'value'
                },
                series: [{
                    type: 'scatter3D',
                    symbolSize: 10,
                    coordinateSystem: 'cartesian3D',
                    data: [
                        ['200', '08-10', 30, 200, 400],
                        ['600', '08-16', 10, 9, 9],
                        ['600', '08-15', 10, 9, 9],
                        ['400', '08-15', 10, 9, 9],
                        ['200', '08-12', 10, 9, 9],
                        ['300', '08-14', 10, 9, 9],
                        ['500', '08-13', 10, 9, 9],
                        ['700', '08-12', 10, 9, 9],
                        ['800', '08-16', 10, 9, 9],
                    ],
                    itemStyle: {
                        opacity: 1
                    }
                }]
            }
            myChart.setOption(option)
        }
    }
}
</script>


<style scoped lang="scss">
.echarts {
    width: 600px;
    height: 600px;
    outline: 1px solid red;

}
</style>