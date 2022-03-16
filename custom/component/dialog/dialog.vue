<template>
    <view class="cu-modal" :class="ifShow?'show':''">
        <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
                <view class="content">{{ title }}</view>
                <view class="action" @click="hideModal">
                    <text class="cuIcon-close text-red"></text>
                </view>
            </view>
            <view class="padding-xl">
                {{ content }}
            </view>
            <view class="cu-bar bg-white justify-end">
                <view class="action">
                    <button v-if="showCancel" class="cu-btn line-green text-green" @click="hideModal">{{ cancelText }}</button>
                    <button class="cu-btn bg-green margin-left" @click="hideModal">{{ confirmText }}</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "dialog",
        data() {
            return {

            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "标题"
            },
            content: {
                type: String,
                default: "内容"
            },

            confirmText: {
                type: String,
                default: "确认"
            },
            showCancel: {
                type: Boolean,
                default: true
            },
            cancelText: {
                type: String,
                default: "取消"
            },
        },
        computed:{
            ifShow(){
                return this.show
            }
        },
        methods: {
            showModal(e) {
                this.ifShow = false
            },
            hideModal(e) {
                this.ifShow = false
            },
        }
    }
</script>

<style>

</style>
