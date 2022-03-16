<template>
    <view>
        <swiper class="cu-swiper" autoplay :interval="3000" circular @change="swiperChange">
            <swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index" @click="clickImg(item)">
                <image class="item-img bg-white shadow" :src="item[urlKey]" lazy-load mode="aspectFill"></image>
            </swiper-item>
        </swiper>
        <view class='dots'>
            <block v-for="(item, index) in imgList" :key="index">
                <view class='dot' :class="index == currentIndex ?'active':''"></view>
            </block>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                currentIndex: 0,
            };
        },
        props: {
            imgList: {
                type: Array,
                default () {
                    return []
                }
            },
            urlKey: {
                type: String,
                default: "image"
            },
        },
        methods: {
            swiperChange(e) {
                this.currentIndex = e.detail.current
            },
            clickImg(item) {
                this.$emit('selected', item, this.currentIndex)
            }
        }
    }
</script>

<style lang="scss">
    .cu-swiper {
        height: 305rpx;
        .swiper-item {
            .item-img {
                height: 290rpx;
                margin: 0 30rpx;
                margin-bottom: 15rpx;
                width: calc(100vw - 60rpx);
                border-radius: 20rpx;
            }
        }
    }

    .dots {
        width: 100vw;
        // padding-top: 15rpx;
        padding-bottom: 10rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .dot {
            width: 8rpx;
            height: 8rpx;
            border-radius: 30rpx;
            margin: 0 5rpx;
            background-color: white;
        }

        .active {
            width: 40rpx;
            background-color: coral;
            
        }
    }
</style>
