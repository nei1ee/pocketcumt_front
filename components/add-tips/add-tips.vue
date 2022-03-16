<template>
    <view>
        <view class="box" v-if="showTip">
            <view class='arrow'></view>
            <view class='body' @click='okHandler'>
                {{tipsText}}
            </view>
        </view>

        <!-- modal -->
        <view class='modal' v-if="showModel">
            <scroll-view scroll-y style="height:100vh;">
                <image :src="src" mode="widthFix" style='width:100%;'></image>
                <!-- 知道了 -->
                <view class='ok-btn' hover-class='btn-hover' @click="okHandler">
                    <view class="ok-text">我知道了！</view>
                </view>
            </scroll-view>

        </view>
    </view>
</template>

<script>
    const STORAGE_KEY = 'ADD-TIPS-KEY';
    export default {
        name: "add-tips",
        data() {
            return {
                showTip: false,
                showModel: false
            };
        },
        props: {
            // 提示图片路径
            src: {
                type: String,
                default: "",
            },
            // 提示文字
            tipsText: {
                type: String,
                default: '「添加小程序」，下次访问更便捷 ×'
            },
            // 多少秒后关闭
            duration: {
                type: Number,
                default: 5
            }
        },
        created() {
            // 判断是否已经显示过
            let cache = wx.getStorageSync(STORAGE_KEY);
            if (cache) return;
            // 没显示过，则进行展示
            this.showTip = true
            // 关闭时间
            // setTimeout(() => {
            //     this.showTip = false
            // }, this.duration * 1000);
        },
        methods: {
            // 显示全屏添加说明
            showModal() {
                this.showTip = false
                this.showModel = true
            },

            okHandler() {
                this.showModel = false
                this.showTip = false
                uni.setStorage({
                    key: STORAGE_KEY,
                    data: +new Date,
                });
            }
        }
    }
</script>

<style lang="scss">
    .box {
        width: 100vw;
        position: relative;
        // padding-top: -20rpx;

        .arrow {
            position: absolute;
            right: 0;
            width: 0;
            height: 0;
            margin-right: 120rpx;
            border: 20rpx solid transparent;
            border-bottom: 20rpx solid #34b5e2;
        }

        .body {
            position: absolute;
            top: 40rpx;
            right: 0;

            color: white;
            background-color: #34b5e2;
            box-shadow: 0 10rpx 20rpx -10rpx #34b5e2;
            border-radius: 12rpx;
            height: 64rpx;
            padding: 0 20rpx;
            margin-right: 40rpx;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

    }

    .modal {
        position: relative;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 20px;

        .ok-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .ok-text {
                height: 40px;
                width: 120px;
                background: linear-gradient(to bottom right, #1798d9, #8cd3f1);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 40px;

                font-size: 14px;
                color: #fff;
                font-weight: 400;
            }
        }



        .btn-hover {
            opacity: 0.6;
        }
    }

    // .modal>view {
    //     margin: 10px 0;
    //     display: flex;
    //     /* align-items: center; */
    //     flex-direction: column;
    // }

    // .modal>view>text {
    //     font-size: 16px;
    //     font-weight: 400;
    //     margin-bottom: 5px;
    //     color: #333;
    // }

    // .modal>view>image {
    //     border-radius: 10px;
    // }
</style>
