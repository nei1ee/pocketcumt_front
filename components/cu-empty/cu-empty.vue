<template>
    <view class="empty-container animation-slide-bottom">
        <image :src="imageSrc" mode="aspectFill" class="empty-image"></image>
        <view class="empty-text">
            <slot name='text'>提示</slot>
        </view>
    </view>
</template>

<script>
    const PRESETS = ['error', 'ques', 'default'];
    export default {
        name: "cu-empty",
        data() {
            return {
            };
        },
        props: {
            type: {
                type: String,
                default: "default",
            },
        },
        created() {},
        computed: {
            imageSrc() {
                return `/static/empty_image/${this.type}.png`
                // if (PRESETS.indexOf(this.type) !== -1) {
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .empty-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .empty-image {
            width: 200rpx;
            height: 200rpx;
        }

        .empty-text {
            padding: 20rpx 60rpx;
            color: #8799a3;
            text-align: center;
        }
    }
</style>
