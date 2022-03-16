<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                关于
            </view>
        </cu-custom>
        <view class="cu-card case no-card">
            <view class="cu-item shadow">
                <view class="image">
                    <image src="../../../static/bg_img/iot.png" mode="widthFix"></image>
                    <view class="cu-tag bg-blue">CUMT</view>
                </view>
                <view class="cu-list menu-avatar">
                    <view class="padding-sm" style='text-indent:2em'>
                        物联网与大数据实验室，是以中国矿业大学大学生创新教育基地为基础建设的一个面向全校学生，致力于影响淮海经济区乃至全国的科技类创新训练团队。
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-bar bg-white margin-top-xs">
            <view class="action" @click="getQQ">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">QQ交流群<text class="text-blue">736657145(点击复制)</text></text>
            </view>
        </view>
        <view class="cu-bar bg-white margin-top-xs">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">隐私安全</text>
            </view>
        </view>
        <view class="cu-card case no-card padding-bottom bg-white">
            <view class="cu-item shadow padding">
                <view style="text-indent:2em;">
                    口袋矿大从开发以来就一直将用户的个人信息当作重中之重，坚持个人信息本地化保存，不传输至软件服务器，所以用户不需要担心这类问题。
                </view>
                <!--             <view style="text-indent:2em;">
                    建立在不涉及软件机密的基础之上，我们会将部分涉及用户信息本地存储和使用的代码进行公开，以供大家查阅。有必要的同学可以通过客服咨询，口袋矿大继续在你身边～
                </view> -->
            </view>
        </view>
        <view class="cu-bar bg-white margin-top-xs">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">相关人员</text>
            </view>
        </view>
        <view class="cu-card case no-card padding-bottom bg-white">
            <view class="cu-item shadow">
                <view class="cu-list menu-avatar">
                    <view class="padding-sm margin-left">
                        <view class="cu-capsule radius">
                            <view class="cu-tag bg-blue">指导</view>
                            <view class="cu-tag line-blue">黄耀文</view>
                            <view class="cu-tag line-blue">尹仕杰</view>
                            <view class="cu-tag line-blue">王鑫宇</view>
                        </view>
                    </view>
                    <view class="padding-sm margin-left">
                        <view class="cu-capsule radius">
                            <view class="cu-tag bg-blue">By</view>
                            <view class="cu-tag line-blue">李治远</view>
                            <view class="cu-tag line-blue">李治国</view>
                            <view class="cu-tag line-blue">胡雅静</view>
                            <view class="cu-tag line-blue">N+科技工作室</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'about',
        data() {
            return {
                show: false,
            }
        },
        methods: {
            getQQ: function(e) {
                uni.setClipboardData({
                    data: '736657145',
                    success(res) {

                    }
                })
            },
        }
    }
</script>

<style>

</style>
