<template>
    <view>
        <course v-show="PageCur=='course'" ref="course"></course>
        <home v-show="PageCur=='home'" ref="home"></home>
        <mine v-show="PageCur=='mine'" ref="mine"></mine>
        <view class="cu-bar tabbar bg-white shadow foot">
            <view class="action" @click="NavChange" data-cur="course">
                <view class='cuIcon-cu-image' :class="PageCur=='course'?'animation-scale-up':''">
                    <image :src="'/static/tabbar/course' + [PageCur=='course'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='course'?'text-black':'text-gray'">课表</view>
            </view>
            <view class="action" @click="NavChange" data-cur="home">
                <view class='cuIcon-cu-image' :class="PageCur=='home'?'animation-scale-up':''">
                    <image :src="'/static/tabbar/home' + [PageCur == 'home'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='home'?'text-black':'text-gray'">功能</view>
            </view>
            <view class="action" @click="NavChange" data-cur="mine">
                <view class='cuIcon-cu-image' :class="PageCur=='mine'?'animation-scale-up':''">
                    <image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='mine'?'text-black':'text-gray'">我的</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                PageCur: 'course'
            }
        },
        methods: {
            NavChange: function(e) {
                this.PageCur = e.currentTarget.dataset.cur
                this.indexInit()
            },
            indexInit: function() {
                switch (this.PageCur) {
                    case "course":
                        this.$refs.course.init();
                        break;
                    case "home":
                        this.$refs.home.init();
                        break;
                    case "mine":
                        this.$refs.mine.init();
                        break;

                }
            }
        },
        onLoad(options) {
            if (options.PageCur) {
                this.PageCur = options.PageCur
            }
        },
        onShow: function() {
            this.indexInit()
        },
        onShareAppMessage: function(res) {
            return {
                title: '口袋矿大',
                path: '/pages/index/index?PageCur=' + this.PageCur
            }
        }
    }
</script>

<style>

</style>
