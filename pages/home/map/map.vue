<template>
    <view>
        <!-- 自定义顶部 -->
        <view class="cu-custom bg-blue-1" :style="style" style="position: absolute;top: 0;z-index: 999;">
            <!-- 顶部左侧打开抽屉 -->
            <view class="cu-left" @click="back">
                <view class="left-text">
                    <text class="cuIcon-back"></text>更多
                </view>
            </view>
            <!-- 顶部切换周数 -->
            <view class="cu-center">
                <text class="center-text">
                    校园地图
                </text>
            </view>
            <view class="cu-right">

            </view>
        </view>
<!--        <cu-custom bgColor="bg-blue-11">
            <view slot="backText" @click="back">
                更多
            </view>
            <view slot="content">
                校园地图
            </view>
        </cu-custom> -->
        <scroll-view scroll-x class="bg-white nav fixed" :style="'width:100%;top:'+CustomBar+'px;'"
            scroll-with-animation :scroll-left="scrollLeft">
            <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item, index) in tabList" :key='index'
                @click="tabSelect(index)">
                {{item}}
            </view>
        </scroll-view>
        <map id="myMap" style="width: 100%;height:100vh;" :latitude="latitude" :longitude="longitude" :markers="markers"
            :include-points="markers" show-location='true' scale='15' bindmarkertap='getInfo' show-compass='true'>
        </map>
    </view>
</template>

<script>
    const locList = require('@/libs/locList.js')
    export default {
        data() {
            return {
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                latitude: 34.214073,
                longitude: 117.145586,
                markers: [],
                includepoints: [],

                TabCur: 0,

                scrollLeft: 0,
                tabList: ['学院楼', '宿舍/食堂', '教学楼/体育场', 'ATM/快递', '校车站点'],
                tabName: ['xyl', 'ssst', 'jxltyc', 'atmkd', 'xczd'],
            };
        },
        created() {
            this.mapCtx = uni.createMapContext('myMap')
            this.markers = locList.xyl
        },
        methods: {
            tabSelect(index) {
                var temp = this.tabName[index]
                this.TabCur = index
                this.scrollLeft = (index - 1) * 60
                this.markers = locList[temp]
            },
            back: function() {
                uni.redirectTo({
                    url: '/pages/index/index?PageCur=home',
                    success: res => {
                        console.log(res)
                    },
                    fail: err => {
                        console.log(err)
                    }
                })
            }
        },
        computed: {
            style() {
                let StatusBar = this.StatusBar;
                let CustomBar = this.CustomBar;
                let value = StatusBar + CustomBar
                let style = `height:${CustomBar}px;`;
                return style
            },
        }
    }
</script>

<style lang="scss" scoped>
    .cu-custom {
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // align-items: ;

        // 顶部左侧打开抽屉
        .cu-left {
            width: 25vw;
            display: flex;
            flex-direction: row;
            // justify-content: center;
            align-items: center;
            padding-left: 20rpx;
            position: relative;

            .left-text {
                position: absolute;
                bottom: 14rpx;
            }
        }

        .cu-center {
            width: 50vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            position: relative;

            .center-text {
                position: absolute;
                bottom: 14rpx;
            }
        }

        .cu-right {
            width: 25vw;
        }
    }
</style>
