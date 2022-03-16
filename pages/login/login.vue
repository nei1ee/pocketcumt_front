<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                登录
            </view>
        </cu-custom>
        <view class="margin padding-sm bg-white" style="border-radius:20rpx;">
            <view class="cu-card case no-card">
                <view class="cu-item shadow">
                    <view class="image" style='padding:30rpx 30rpx;'>
                        <image src="../../static/bg_img/cumt.png" mode="widthFix"></image>
                    </view>
                </view>
            </view>
            <view class="margin padding-sm">
                <view class="cu-form-group text-right">
                    <view class="title">账号</view>
                    <input placeholder="学号/工号" v-model="form.username"></input>
                    <text class="cuIcon-myfill text-blue"></text>
                </view>
                <view class="cu-form-group text-right">
                    <view class="title">密码</view>
                    <input placeholder="统一认证密码" type='password' v-model="form.password"></input>
                    <text class="cuIcon-emojifill text-orange"></text>
                </view>
            </view>
            <view v-if="captcha_path" class="margin padding-sm">
                <view class="cu-form-group text-right">
                    <image :src="captcha_path" style="width:72px;height:32px;" mode='aspectFit'></image>
                    <input placeholder="验证码" v-model='captcha'></input>
                </view>
            </view>
            <view class="padding flex flex-direction">
                <button class="cu-btn bg-orange-1 round shadow-blur lg" open-type="getUserInfo" @click="login">统一认证登录</button>
            </view>
            <view class="margin padding solids" style="border-radius:20rpx;">
                <view>
                    账号为学号，<text class="text-red">密码为统一身份认证密码(VPN密码)</text>，初始密码为身份证后六位
                </view>
                <view>
                    研究生暂不支持登录
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        req,
        rootUrl
    } from '../../utils/util.js'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                cookies: "",
                captcha_path: "",
                captcha: '',
                showDialog: false,
                res: {}
            }
        },
        methods: {
            login() {
                if (!this.form.username || !this.form.password) {
                    uni.showModal({
                        content: "请输入账号或密码！",
                        showCancel: false
                    })

                } else {
                    // 查看是否授权
                    uni.getSetting({
                        success: res => {
                            console.log(res)
                            if (res.authSetting['scope.userInfo']) {
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                uni.getUserInfo({
                                    success: res => {
                                        console.log(res.userInfo)
                                        //性别 0：未知、1：男、2：女
                                        uni.setStorageSync('wx_info', res.userInfo)
                                    }
                                })
                                let postData = this.form
                                if (this.cookies) {
                                    postData['cookies'] = this.cookies
                                    postData['captcha'] = this.captcha
                                }
                                this.$req("api/study/login/", "post", postData, res => {
                                    if (res.code !== 10000) {
                                        if (res.data['cookie']) {
                                            let img_path = rootUrl + 'media/captcha/' + this.form.username +
                                                '.png?v=' + new Date().getTime()
                                            this.captcha_path = img_path
                                            this.cookies = res.data['cookie']
                                        }
                                        uni.showModal({
                                            content: res.msg,
                                            showCancel: false
                                        })
                                    } else {
                                        let user_info = res.data
                                        user_info['password'] = this.form.password
                                        uni.setStorageSync('user_info', user_info)
                                        uni.navigateBack(-1)
                                    }
                                })
                            } else {
                                uni.showModal({
                                    content: "请允许获得您的公开信息",
                                    showCancel: false
                                })
                            }
                        },
                        fail: err => {
                            console.log(err)
                        }
                    })
                }
            }
        }
    }
</script>

<style>

</style>
