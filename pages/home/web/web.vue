<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: "",
            }
        },
        methods: {
            
        },
        onLoad(e) {
            this.url = e.url
            console.log(e)
        }
    }
</script>

<style>

</style>
