<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                馆藏信息
            </view>
        </cu-custom>
        <view class="cu-bar bg-white">
            <view class="action sub-title">
                <text class="text-bold text-green">{{bookTitle}}</text>
                <text class="bg-green" style="width:6rem"></text>
                <!-- last-child选择器-->
            </view>
        </view>
        <view style='width:100%;' class="margin-top-sm" v-for="(item, index) in detailList" :key='index'>
            <view class="cu-list menu card-menu margin-bottom-sm sm-border">
                <view class="cu-item">
                    <view class="content">
                        <text class="text-black">位置</text>
                    </view>
                    <view class="action">
                        <text class="text-black">{{item.locationName}}</text>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text class="text-black">检书号</text>
                    </view>
                    <view class="action">
                        <text class="text-black">{{item.callNo}}</text>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text class="text-black">状态</text>
                    </view>
                    <view class="action">
                        <text class="text-black">{{item.processType}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                detailList: [],
                bookTitle: '',
            };

        },
        created() {

        },
        onLoad(options) {
            this.$req('api/library/detail/', 'post', {
                book_id: options.id
            }, res => {
                if (res.code == 20000) {
                    this.detailList = res.data.results
                    this.bookTitle = options.title
                } else {
                    uni.showModal({
                        title: '提示',
                        content: res.msg,
                        showCancel: false,
                    })
                }
            })
        }
    }
</script>

<style lang="scss">

</style>
