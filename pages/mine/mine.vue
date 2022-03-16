<template>
    <view>
        <view class="top-container">
            <image src="../../static/bg_img/bg.png" mode="scaleToFill" class="top-bg"></image>
            <view class="info-container animation-slide-left" :style="style">
                <image :src="wxInfo?wxInfo.avatarUrl:'../../static/logo.png'" class="wxavatar round solids" mode="scaleToFill"></image>
                <view class="info">
                    <view>
                        <text class="text-lg">{{ userInfo?userInfo.user_name:'口袋矿大' }}</text>
                        <text class="margin-left-sm">{{ userInfo?userInfo.username:'游客模式' }}</text>
                    </view>
                    <view class="margin-top-xs">
                        {{ userInfo?userInfo.user_college:'pocket-cumt' }}
                    </view>
                </view>
            </view>
            <image src="https://cdn.nlark.com/yuque/0/2019/gif/280373/1570670848649-assets/web-upload/3dbaa72a-062b-470f-9b9d-058ff8f85ab8.gif"
                mode="scaleToFill" class="gif-wave"></image>
        </view>
        <view class="margin-top-sm">
            <view class="cu-list menu card-menu sm-border">
                <view class="cu-item">
                    <view class="content">
                        <text class="cuIcon-myfill orange-1" style='font-size:20px;'></text>
                        <text class="text-black">班级</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{userInfo?userInfo.user_class:'游客模式'}}</text>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text class="cuIcon-emojifill orange-1" style='font-size:20px;'></text>
                        <text class="text-black">专业</text>
                    </view>
                    <view class="action">
                        <text class="text-grey text-sm">{{userInfo?userInfo.user_profession:'游客模式'}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="margin-top-sm">
            <view class="cu-list menu card-menu sm-border">
                <view class="cu-item arrow" @click='about'>
                    <view class="content">
                        <text class="cuIcon-infofill orange-1" style='font-size:20px;'></text>
                        <text class="text-black">关于/反馈</text>
                    </view>
                </view>
                <view class="cu-item arrow" @click='update'>
                    <view class="content">
                        <text class="cuIcon-formfill orange-1" style='font-size:20px;'></text>
                        <text class="text-black">更新日志</text>
                    </view>
                </view>
                <view class="cu-item arrow" @click='logout'>
                    <view class="content">
                        <text class="cuIcon-settingsfill orange-1" style='font-size:20px;'></text>
                        <text class="text-black">登录/切换账号</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="text-center text-grey padding-sm text-sm margin-top-sm">
            <view>Copyright © 2018-{{year}} All Rights Reserved.</view>
            <view>徐州肆构科技有限公司&物联网实验室版权所有</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "mine",
        data() {
            return {
                userInfo: {},
                wxInfo: {},
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                year: new Date().getFullYear()
            }
        },
        computed: {
            style() {
                let StatusBar = this.StatusBar;
                let CustomBar = this.CustomBar;
                let style = `padding-top:${CustomBar}px;`;
                return style
            }
        },
        created() {
            // this.init()
        },
        methods: {
            init: function() {
                uni.getUserInfo({
                    success: function(res) {
                        // console.log(res.userInfo)
                        //性别 0：未知、1：男、2：女
                        uni.setStorageSync("wx_info", res.userInfo)
                    }
                })
                this.userInfo = uni.getStorageSync("user_info")
                this.wxInfo = uni.getStorageSync("wx_info")
            },
            about() {
                uni.navigateTo({
                    url: "../mine/about/about",
                    fail: res => {
                        console.log(res)
                    }
                })
            },
            update() {
                uni.navigateTo({
                    url: "../mine/update/update",
                    fail: res => {
                        console.log(res)
                    }
                })
            },
            question: function() {

            },
            // 赞赏
            support() {
                uni.previewImage({
                    urls: ["https://gitee.com/pandalzy/cloud_img/raw/master/imgs/support.jpg"]
                })
            },
            logout() {
                uni.showModal({
                    content: "是否切换账号？(此操作会清空信息缓存)",
                    success: res => {
                        if (res.confirm) {
                            uni.clearStorageSync()
                            uni.navigateTo({
                                url: "../login/login"
                            })
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .top-container {
        height: 350rpx;
        width: 100vw;
        position: relative;

        .top-bg {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            // mix-blend-mode: screen;
            height: 350rpx;
        }

        .info-container {
            width: 100vw;
            height: 350rpx;
            color: #fff;

            display: flex;
            flex-direction: row;
            // justify-content: center;
            align-items: center;

            z-index: 10;

            // 头像部分
            .wxavatar {
                width: 150rpx;
                height: 150rpx;
                margin-left: 100rpx;
                z-index: 10;
            }

            .info {
                margin-left: 50rpx;
            }
        }

        // 波浪
        .gif-wave {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 99;
            mix-blend-mode: screen;
            height: 100rpx;
        }

    }
</style>
