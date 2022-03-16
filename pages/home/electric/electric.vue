<template>
    <view>
        <cu-custom bgColor="bg-blue-1" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                宿舍电量
            </view>
        </cu-custom>
        <view v-if="!ifBind" class="margin-sm padding-sm bg-white" style="border-radius:20rpx;">
            <view class="cu-list menu sm-border">
                <view class="cu-item">
                    <view class="content">
                        <text>生活区</text>
                    </view>
                    <view class="action">
                        <picker @change="roomChange" :value="roomIndex" :range="room">
                            <view class="picker-height">
                                {{room[roomIndex]}}
                                <text class="cuIcon-right text-grey"></text>
                            </view>
                        </picker>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text>楼栋</text>
                    </view>
                    <view class="action">
                        <picker @change="numChange" :value="numIndex" :range="number">
                            <view class="picker-height">
                                {{number[numIndex]}}
                                <text class="cuIcon-right text-grey"></text>
                            </view>
                        </picker>
                    </view>
                </view>
                <view class="cu-form-group">
                    <view class="title">宿舍号</view>
                    <input v-model='dormName' placeholder="请输入宿舍号"></input>
                </view>
            </view>
            <view class="padding flex flex-direction">
                <button class="cu-btn bg-orange-1 round shadow-blur lg" @click="bindDorm">绑定宿舍信息</button>
            </view>
            <view class="margin-sm padding-sm solids" style="border-radius:20rpx;">
                <view class="text-bold text-lg">
                    <text class="cuIcon-warnfill text-yellow"></text>
                    <text>宿舍号输入规则</text>
                </view>
                <view>1.桃1楼直接输入房间号，如:2031</view>
                <view>2.研究生1、2楼输入单元号-房间号，如:3-501</view>
                <view>3.其他楼栋，输入区域和房间号，如:B4051</view>
            </view>
        </view>
        <view v-else class="margin-sm padding-sm bg-white" style="border-radius:20rpx;">
            <view class="container">
                <view class="wave"></view>
                <view class="dushu text-xxl text-bold">
                    {{dushu}}(度)
                </view>
            </view>
<!--            <view class="padding flex flex-direction">
                <button class="cu-btn bg-blue-1 round shadow-blur lg" @click="search">更新</button>
            </view> -->
            <view class="padding flex flex-direction">
                <button class="cu-btn bg-orange-1 round shadow-blur lg" @click="ifBind = false">更改绑定宿舍信息</button>
            </view>
            <view class="margin-sm padding-sm solids" style="border-radius:20rpx;">
                <view class="text-bold text-lg">
                    <text class="cuIcon-warnfill text-yellow"></text>
                    <text>注意</text>
                </view>
                <view>晚上23点到早上5点圈存机缴费业务暂停</view>
                <view>充值成功后用电量实时增加，微信查询结果一个小时内同步。</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 是否绑定
                ifBind: false,
                room: ['杏苑', '竹苑', '松苑', '桃苑', '梅苑', '研究生'],
                roomIndex: 0,
                number: ['杏1楼', '杏2楼', '杏3楼'],
                numIndex: 0,
                dormName: '',
                dushu: 'NaN'
            }
        },
        created() {
            this.ifBind = this.judgeBind()
        },

        methods: {
            // 获取楼栋
            getBuilding(value) {
                let temp = []
                switch (parseInt(value)) {
                    case 0:
                        temp = ['杏1楼', '杏2楼', '杏3楼'];
                        break;
                    case 1:
                        temp = ['竹1楼', '竹2楼', '竹3楼', '竹4楼'];
                        break;
                    case 2:
                        temp = ['松1楼', '松2楼', '松3楼', '松4楼'];
                        break;
                    case 3:
                        temp = ['桃1楼', '桃2楼', '桃3楼', '桃4楼', '桃5楼'];
                        break;
                    case 4:
                        temp = ['梅1楼', '梅2楼', '梅3楼'];
                        break;
                    case 5:
                        temp = ['研1', '研2', '研3'];
                        break;
                }
                return temp
            },
            // 判断是否绑定
            judgeBind() {
                const value = uni.getStorageSync("dorm")
                if (value) {
                    this.roomIndex = value.row
                    this.numIndex = value.column
                    this.dormName = value.dorm
                    this.number = this.getBuilding(value.row)
                    this.search()
                    return true
                }
                return false
            },

            // 生活区变更
            roomChange(e) {
                this.roomIndex = e.detail.value
                this.number = this.getBuilding(e.detail.value)
            },
            // 楼栋选择
            numChange(e) {
                this.numIndex = e.detail.value
            },
            // 绑定宿舍信息
            bindDorm() {
                if (this.dormName) {
                    uni.setStorageSync('dorm', {
                        row: this.roomIndex,
                        column: this.numIndex,
                        dorm: this.dormName
                    })
                    this.ifBind = true
                    this.search()
                } else {
                    uni.showModal({
                        content: "请输入宿舍号",
                        showCancel: false
                    })
                }

            },
            // 查询电量
            search() {
                const value = uni.getStorageSync("dorm")
                this.$req("api/mirco/dorm/", "post", value, res => {
                    if (res.code === 20000) {
                        this.dushu = res.data.dushu
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: res.msg,
                            showCancel: false,
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .container {
        position: relative;
        width: 300rpx;
        height: 300rpx;
        margin: 0 auto;
        overflow: hidden;

        .wave {
            position: relative;
            width: 300rpx;
            height: 300rpx;
            background-color: rgb(118, 218, 255);
            border-radius: 50%;
            border: 2px solid #f1f1f1;

            &::before,
            &::after {
                content: "";
                position: absolute;
                width: 600rpx;
                height: 600rpx;
                top: 0;
                left: 50%;
                background-color: rgba(255, 255, 255, .4);
                border-radius: 45%;
                transform: translate(-50%, -70%) rotate(0);
                animation: rotate 6s linear infinite;
                z-index: 10;
            }

            &::after {
                border-radius: 47%;
                background-color: rgba(255, 255, 255, .7);
                transform: translate(-50%, -70%) rotate(0);
                animation: rotate 10s linear -5s infinite;
                z-index: 20;
            }
        }


        @keyframes rotate {
            50% {
                transform: translate(-50%, -73%) rotate(180deg);
            }

            100% {
                transform: translate(-50%, -70%) rotate(360deg);
            }
        }

        .dushu {
            position: absolute;
            top: 150rpx;
            left: 150rpx;
            z-index: 99;
            transform: translate(-50%, -50%);
        }
    }
</style>
