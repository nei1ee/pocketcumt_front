<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">返回</view>
            <view slot="content">通讯电话</view>
        </cu-custom>
        <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
                <view class="cu-item flex-sub" :class="0==current?'blue-1 cur':''" @click="current = 0">
                    常用电话
                </view>
                <view class="cu-item flex-sub" :class="1==current?'blue-1 cur':''" @click="current = 1">
                    学工教务
                </view>
                <view class="cu-item flex-sub" :class="2==current?'blue-1 cur':''" @click="current = 2">
                    校园生活
                </view>
				<view class="cu-item flex-sub" :class="3==current?'blue-1 cur':''" @click="current = 3">
				    教师电话
				</view>
            </view>
        </scroll-view>
        <view v-if='current == 0' class='margin-top-sm margin-bottom-sm'>
            <view class="cu-list menu card-menu sm-border">
                <view class="cu-item" v-for="(item, index) in tels.cytel" :key="index">
                    <view class="content">
                        <text class="cuIcon-dianhua text-green"></text>
                        <text class="text-grey">{{item.local}}</text>
                    </view>
                    <view class="action">
                        <button class="cu-btn round bg-orange-1 shadow" @click="makeCall(item.tel)">
                            {{item.tel}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="current == 1" class='margin-top-sm margin-bottom-sm'>
            <view class="cu-list menu card-menu sm-border">
                <view class="cu-item" v-for="(item, index) in tels.xgtel" :key='index'>
                    <view class="content">
                        <text class="cuIcon-dianhua text-green"></text>
                        <text class="text-grey">{{item.local}}</text>
                    </view>
                    <view class="action">
                        <button class="cu-btn round bg-orange-1 shadow" @click="makeCall(item.tel)">
                            {{item.tel}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="current == 2" class='margin-top-sm margin-bottom-sm'>
            <view class="cu-list menu card-menu sm-border">
                <view class="cu-item" v-for="(item, index) in tels.shtel" :key="index">
                    <view class="content">
                        <text class="cuIcon-dianhua text-green"></text>
                        <text class="text-grey">{{item.local}}</text>
                    </view>
                    <view class="action">
                        <button class="cu-btn round bg-orange-1 shadow" @click="makeCall(item.tel)">
                            {{item.tel}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="current == 3" class='margin-bottom-sm'>
            <view class="cu-bar bg-white solid-bottom">
                <view class="action">
                    <text class="cuIcon-title text-orange"></text>选择学期
                </view>
                <view class="action">
                    <term-picker @xnm="xnmClick" @xqm="xqmClick"></term-picker>
                </view>
            </view>
            <view class="cu-bar search bg-white">
                <view class="search-form round">
                    <text class="cuIcon-search"></text>
                    <input type="text" placeholder="请输入教师姓名" v-model="teaName" confirm-type="search"></input>
                </view>
                <view class="action">
                    <button class="cu-btn bg-orange-1 shadow-blur round" @click="getTea">查询</button>
                </view>
            </view>
            <scroll-view scroll-y>
                <view class="animation-slide-bottom margin list-container" v-if="teacherTelList.length">
                    <view class="list-head bg-blue-1">
                        <view class="flex-sub text-left">
                            课程名/姓名
                        </view>
                        <view class="flex-sub text-center">
                            教室
                        </view>
                        <view class="flex-sub text-right">
                            联系方式
                        </view>
                    </view>
                    <view class="list-item text-black" v-for='(item, index) in teacherTelList' :key='index' :class="index%2?'bg-gray':'bg-white'">
                        <view class="list-subitem">
                            <text class="text-bold">{{item.kcmc}}</text>
                            <text></text>
                        </view>
                        <view class="list-subitem margin-top-sm">
                            <view class="flex-sub text-left">
                                {{item.xm}}
                            </view>
                            <view class="flex-sub text-center">
                                地点：{{item.cdmc}}
                            </view>
                            <view class="flex-sub text-right">
                                <button class="cu-btn bg-orange-1 round shadow sm" @click="makeCall(item.jslxdh)">{{item.jslxdh}}</button>
                            </view>
                        </view>
                    </view>
                    <view class="list-head bg-blue-1">
                    </view>
                </view>
                <cu-empty :type="emptyType">
                    <view slot="text" class="">
                        <view class="margin-bottom-sm">{{emptyMsg}}</view>
                        <!-- <button v-if="emptyType=='search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getExam">查询</button> -->
                    </view>
                </cu-empty>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                xqm: "",
                xnm: "",
                teaName: "",
                teacherTelList: [],
                emptyType: "search",
                emptyMsg: "点击最上方按钮切换学期",
                current: 0,
                tels: {
                    cytel: [{
                            local: '宿舍电力(24小时）',
                            tel: '83592396'
                        },
                        {
                            local: '校医院24h',
                            tel: '83592250'
                        },
                        {
                            local: '杏一服务中心',
                            tel: '83592396'
                        },
                        {
                            local: '校车',
                            tel: '83885871'
                        },
                        {
                            local: '南湖菜鸟驿站',
                            tel: '83592392'
                        },
                        {
                            local: '报警求助',
                            tel: '83590110'
                        },
                        {
                            local: '图书馆',
                            tel: '83592099'
                        },
                        {
                            local: '水电中心',
                            tel: '83883872'
                        },
                    ],
                    xgtel: [{
                            local: '学生管理科',
                            tel: '83590186'
                        },
                        {
                            local: '资助管理办公室',
                            tel: '83590191'
                        }, {
                            local: '学生创业教育与发展知道',
                            tel: '83590058'
                        }, {
                            local: '饮食服务',
                            tel: '83592336'
                        }, {
                            local: '公寓管理',
                            tel: '83590327'
                        },
                    ],
                    shtel: [{
                            local: '杏一服务中心',
                            tel: '83592396'
                        },
                        {
                            local: '学生事务综合服务中心',
                            tel: '83590123'
                        },
                        {
                            local: '宿舍直饮水',
                            tel: '83592700'
                        },
                        {
                            local: '校车',
                            tel: '83885871'
                        },
                        {
                            local: '南湖菜鸟驿站1',
                            tel: '83592392'
                        },
                        {
                            local: '南湖菜鸟驿站2',
                            tel: '15351639792'
                        },
                        {
                            local: '图书馆',
                            tel: '83592099'
                        },
                    ],
                },
            }
        },
        methods: {
            xqmClick(e) {
                this.xqm = e
            },
            xnmClick(e) {
                this.xnm = e
            },
            makeCall(tel) {
                uni.makePhoneCall({
                    phoneNumber: tel
                })
            },
            getTea() {
                let value = uni.getStorageSync('user_info')
                if (!this.teaName) {
                    uni.showModal({
                        content: '请输入教师姓名！',
                        showCancel: false
                    })
                } else if (!value) {
                    uni.showModal({
                        content: '请登录后再使用此功能！',
                        showCancel: false
                    })
                } else {

                    let postData = {
                        username: value.username,
                        password: value.password,
                        xnm: this.xnm,
                        xqm: this.xqm,
                        tea_name: this.teaName,
                    }
                    this.$req('api/study/teacher_tel/', "post", postData, res => {
                        if (res.code === 10000) {
                            if (res.data.teacher_tel_list.length) {
                                this.teacherTelList = res.data.teacher_tel_list
                                this.emptyType = "success"
                                this.emptyMsg = "加载完成"
                            } else {
                                this.emptyType = "success"
                                this.emptyMsg = "未查询到信息"
                                this.teacherTelList = []
                            }
                        } else {
                            this.emptyType = "error"
                            this.emptyMsg = res.msg
                            this.teacherTelList = []
                        }
                    })
                }

            },
        }
    }
</script>

<style>

</style>
