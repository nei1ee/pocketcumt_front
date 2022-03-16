<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                添加课程
            </view>
        </cu-custom>
        <view v-if="!showColorPicker">
            <view class="cu-form-group">
                <view class="title">课程名称</view>
                <input placeholder="输入课程名称" v-model="courseItem.kcmc"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">地点</view>
                <input placeholder="输入上课地点(可空)" v-model="courseItem.cdmc"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">教师</view>
                <input placeholder="输入课程教师姓名(可空)" v-model="courseItem.xm"></input>
            </view>
        </view>
        <view v-if="showColorPicker" class="padding-sm bg-white" style="position: fixed;width: 100vw;">
            <color-picker :unitWidth="30" @callBack="pickerColor" />
            <view class="padding flex flex-direction">
                <button class="cu-btn round lg text-white" :style="'background-color:'+courseItem.bg+';'" @click="showColorPicker=false">确认颜色</button>
            </view>
        </view>
        <view v-if="!showColorPicker" class="cu-list menu sm-border">

            <view class="cu-item">
                <view class="content">
                    <text class="cuIcon-colorlens text-red"></text>
                    <text class="text-black">选择背景</text>
                </view>
                <view class="action">
                    <button class="cu-btn" :style="'background-color:'+courseItem.bg+';'" @click="showColorPicker=true">
                        <text class="text-white">效果</text>
                    </button>
                </view>
            </view>
            <view class="cu-bar bg-white margin-top-sm">
                <view class="action">
                    <text class="cuIcon-titles text-green"></text>
                    <text class="text-xl text-bold">课程时间</text>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="text-black">周次</text>
                </view>
                <view class="action">
                    <button class="cu-btn bg-green shadow" @click="modalName='ZcModal'">{{courseItem.zcdd}}</button>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="text-black">节次</text>
                </view>
                <view class="action">
                    <picker mode="multiSelector" :range="jcList" :value="[courseItem.xqj,courseItem.jcs,courseItem.cxjs]"
                        @change="jcChange">
                        <button class="cu-btn bg-green shadow">
                            星期{{xqList[courseItem.xqj]}} {{courseItem.jcs}}-{{(courseItem.jcs+courseItem.cxjs)}}节
                        </button>
                    </picker>
                </view>
            </view>
        </view>
        <view v-if="!showColorPicker" class="margin padding bg-white" style="border-radius:20rpx;">
            <view>
                Tips：<text class="text-blue">添加一次后，可继续添加。</text>如需退出，请点击左上角返回。
            </view>
            <view class="flex flex-direction">
                <button class="cu-btn bg-orange-1 round shadow-blur lg" @click="add">添加</button>
            </view>
        </view>
        <view class="cu-modal bottom-modal" :class="modalName=='ZcModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName = null">单选</view>
                    <view class="action text-green" @click="modalName = null">确定</view>
                </view>
                <view class="grid col-4 padding-sm bg-gray">
                    <view v-for="(item, index) in 20" :key="index" class="padding-xs" wx:key="week">
                        <button class="cu-btn blue block" :class="getZcd(index+1)?'bg-blue':'line-blue'" @click="weekChange(index+1)">
                            第{{index+1}}周
                        </button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import colorPicker from "@/components/color-picker/color-picker";
    export default {
        components: {
            colorPicker
        },
        data() {
            return {
                showColorPicker: false,
                modalName: "",
                courseItem: {
                    kcmc: "", // 课程
                    xm: "", // 教师
                    cdmc: "", // 地点
                    jcs: 3, // 开始节次
                    cxjs: 2, // 持续节次
                    zcd: [2, 3, 4, 6], // 周次
                    zcdd: "2-3,6周", // 周次简称
                    xqj: 2,
                    bg: "#ff0000",
                },
                xqList: ['', '一', '二', '三', '四', '五', '六', '日'],
                jcList: [
                    ["星期数", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", ],
                    ["开始节次", "开始于第1节", "开始于第2节", "开始于第3节", "开始于第4节", "开始于第5节", "开始于第6节", "开始于第7节", "开始于第8节",
                        "开始于第9节", "开始于第10节",
                    ],
                    ["持续节次", "持续1节", "持续2节", "持续3节", "持续4节", "持续5节", "持续6节", "持续7节", "持续8节", ],
                ],
            };
        },
        methods: {
            // 选择颜色
            pickerColor: function(color) {
                this.courseItem.bg = color.hex
                // console.log(color)
            },
            getZcd: function(index) {
                if (this.courseItem.zcd.indexOf(index) != -1) {
                    return true;
                } else {
                    return false;
                }
            },
            // 改变节次
            jcChange: function(e) {
                console.log(e.detail.value)
                const value = e.detail.value
                this.courseItem.xqj = value[0] ? value[0] : 1
                this.courseItem.jcs = value[1] ? value[1] : 1
                this.courseItem.cxjs = value[2] ? value[2] : 1
            },
            // 周次数组转字符串
            zcLToS: function(zcd) {
                let s = [];
                let flag = false
                for (let i = 0; i < zcd.length; i++) {
                    if (i == 0) {
                        s.push(zcd[i])
                    } else if (zcd[i - 1] + 1 == zcd[i]) {
                        flag = true
                    } else if (zcd[i - 1] + 1 != zcd[i]) {
                        let t = s.pop()
                        if (flag) {
                            s.push(t + "-" + zcd[i - 1])
                        } else {
                            s.push(t.toString())
                        }
                        flag = false
                        s.push(zcd[i])
                    } else {
                        s.push(zcd[i])
                    }
                }
                let t = s.pop()
                if (flag) {
                    s.push(t + "-" + zcd[zcd.length - 1])
                } else {
                    s.push(t.toString())
                }
                return s.join(",") + '周'
            },
            // 周次改变
            weekChange: function(index) {
                let zcd = this.courseItem.zcd
                const zxdIndex = zcd.indexOf(index)
                if (zxdIndex != -1) {
                    zcd.splice(zxdIndex, 1);
                } else {
                    zcd.push(index);
                    zcd.sort(function(x, y) {
                        if (x < y) {
                            return -1;
                        } else if (x > y) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                }
                this.courseItem.zcdd = this.zcLToS(zcd)
                this.courseItem.zcd = zcd
            },
            // 添加课程
            add: function() {
                console.log(this.courseItem)
                if (!this.courseItem.kcmc) {
                    uni.showModal({
                        content: "请输入课程名称",
                        showCancel: false
                    })
                } else {
                    let value = uni.getStorageSync('course_list')
                    if (value) {
                        value.push(this.courseItem)
                    } else {
                        value = [this.courseItem]
                    }
                    uni.setStorageSync("course_list", value)
                    uni.showModal({
                        content: "添加成功",
                        showCancel: false
                    })
                }
            }
        }
    }
</script>

<style lang="scss">

</style>
