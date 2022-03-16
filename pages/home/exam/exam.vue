<template>
    <view>
        <cu-custom bgColor="bg-blue-1" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                考试查询
            </view>
        </cu-custom>
        <view class="bg-blue-1">
            <view class="cu-bar bg-white solid-bottom">
                <view class="action">
                    <text class="cuIcon-title text-orange"></text>选择学期
                </view>
                <view class="action">
                    <term-picker @xnm="xnmClick" @xqm="xqmClick" @confirm="confirmClick"></term-picker>
                </view>
            </view>
        </view>
        <view class="animation-slide-bottom margin list-container" v-if="examList.length">
            <view class="list-head bg-blue-1">
                <view class="">
                    课程名/地点
                </view>
                <view class="">
                    时间
                </view>
                <view class="">
                    剩余时间
                </view>
            </view>
            <view class="list-item text-black" v-for='(item, index) in examList' :key='index' :class="index%2?'bg-gray':'bg-white'">
                <view class="">
                    <text class="text-bold">{{item.kcmc}}</text>
                </view>
                <view class="list-subitem margin-top-sm">
                    <view class="">
                        <text class="cuIcon cuIcon-locationfill text-green"></text>{{item.cdbh}}
                    </view>
                    <view class="">
                        {{item.kssj}}
                    </view>
                    <view class="">
                        <text class="orange-1">{{item.rday}}</text>
                    </view>
                </view>
            </view>
            <view class="list-head bg-blue-1">
            </view>
        </view>
        <cu-empty :type="emptyType">
            <view slot="text" class="">
                <view class="margin-bottom-sm">{{emptyMsg}}</view>
                <button v-if="emptyType=='search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getExam">查询</button>
            </view>
        </cu-empty>
    </view>
</template>

<script>
    import termPicker from '@/components/term-picker/term-picker'
    import cuEmpty from "@/components/cu-empty/cu-empty"
    export default {
        data() {
            return {
                xqm: "",
                xnm: "",
                examList: [],
                emptyType: "search",
                emptyMsg: "点击最上方按钮切换学期，或点击下方按钮直接查询。",
            }
        },
        mounted() {
			this.getExam()
        },
        components: {
            termPicker,
            cuEmpty,
        },
        methods: {
            xqmClick: function(e) {
                this.xqm = e
            },
            xnmClick: function(e) {
                this.xnm = e
            },
            confirmClick: function() {
                this.getExam()
            },
            getExam: function() {
                let postData = {
                    username: uni.getStorageSync('user_info').username,
                    password: uni.getStorageSync('user_info').password,
                    xnm: this.xnm,
                    xqm: this.xqm,
                }
                this.$req("api/study/exam/", "post", postData, res => {
                    if (res.code === 10000) {
                        if (res.data.exam_list.length) {
                            this.examList = res.data.exam_list
                            this.emptyType = "success"
                            this.emptyMsg = "加载完成"
                        } else {
                            this.emptyType = "success"
                            this.emptyMsg = "未查询到信息"
                            this.examList = []
                        }
                    }else{
                        this.emptyType = "error"
                        this.emptyMsg = res.msg
                        this.examList = []
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
