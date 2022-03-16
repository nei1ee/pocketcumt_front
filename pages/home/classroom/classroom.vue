<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                空教室
            </view>
        </cu-custom>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-title text-orange"></text>选择学期
            </view>
            <view class="action">
                <term-picker @xnm="xnmClick" @xqm="xqmClick"></term-picker>
            </view>
        </view>
        <view class="cu-list menu sm-border">
            <view class="cu-item">
                <view class="content">
                    <button class="cu-btn bg-orange-1 shadow" @click="modalName = 'WeekModal'">第{{thisWeek}}周</button>
                </view>
                <view class="action">
                    <button class="cu-btn bg-orange-1 shadow" @click="modalName = 'DayModal'">星期{{title[thisDay]}}</button>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <button class="cu-btn bg-orange-1 shadow" @click="modalName = 'LocalModal'">博{{thisLocal}}</button>
                </view>
                <view class="action">
                    <button class="cu-btn bg-orange-1 shadow" @click="modalName = 'JcModal'">第{{jcText}}大节</button>
                </view>
            </view>
        </view>
        <view class="padding flex flex-direction">
            <button class="cu-btn bg-orange-1 round shadow-blur lg" @click="getClass">查询</button>
        </view>
        <view class="cu-modal bottom-modal" :class="modalName=='WeekModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName=null">单选</view>
                    <view class="action text-green" @click="modalName=null">确定</view>
                </view>
                <view class="grid col-4 padding-sm bg-gray">
                    <view v-for="(item,index) in 20" class="padding-xs" :key="index">
                        <button class="cu-btn blue block" :class="index+1==thisWeek?'bg-blue':'line-blue'" @click="thisWeek=(index+1)">第{{index+1}}周
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal bottom-modal" :class="modalName=='DayModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName=null">单选</view>
                    <view class="action text-green" @click="modalName=null">确定</view>
                </view>
                <view class="grid col-4 padding-sm bg-gray">
                    <view v-for="(item,index) in 7" class="padding-xs" :key="index">
                        <button class="cu-btn blue block" :class="index==thisDay?'bg-blue':'line-blue'" @click="thisDay=(index)">星期{{title[index]}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal bottom-modal" :class="modalName=='LocalModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName=null">单选</view>
                    <view class="action text-green" @click="modalName=null">确定</view>
                </view>
                <view class="grid col-3 padding-sm bg-gray">
                    <view v-for="(item,index) in 5" class="padding-xs" :key="index">
                        <button class="cu-btn blue block" :class="index+1==thisLocal?'bg-blue':'line-blue'" @click="thisLocal=(index+1)">博{{index+1}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal bottom-modal" :class="modalName=='JcModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName=null">多选</view>
                    <view class="action text-green" @click="modalName=null">确定</view>
                </view>
                <view class="grid col-3 padding-sm bg-gray">
                    <view v-for="(item,index) in jc" class="padding-xs" :key="index">
                        <button class="cu-btn blue lg block" :class="item.checked?'bg-blue':'line-blue'" @click="jcCheckbox(item.value)">{{item.name}}
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <view class='grid col-3 text-center text-bold padding'>
            <view v-for='(item, index) in emptyClassList' :key='index' class="solids padding">
                {{item}}
            </view>
        </view>
        <cu-empty :type="emptyType">
            <view slot="text" class="">
                <view class="margin-bottom-sm">{{emptyMsg}}</view>
                <!-- <button v-if="emptyType=='search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getClass">查询</button> -->
            </view>
        </cu-empty>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                xqm: "",
                xnm: "",
                title: ['日', '一', '二', '三', '四', '五', '六'],
                jcIndex: [3, 4],
                jcText: "3,4",
                thisWeek: 1,
                thisDay: new Date().getDay(),
                thisLocal: 4,
                jc: [{
                    index: 0,
                    value: 3,
                    name: '第一大节',
                    checked: false,
                }, {
                    index: 1,
                    value: 12,
                    name: '第二大节',
                    checked: false,
                }, {
                    index: 2,
                    value: 48,
                    name: '第三大节',
                    checked: true,
                }, {
                    index: 3,
                    value: 192,
                    name: '第四大节',
                    checked: true,
                }, {
                    index: 4,
                    value: 768,
                    name: '第五大节',
                    checked: false,
                }, ],
                jcd: 240,
                modalName: '',
                emptyClassList: [],
                emptyType: "search",
                emptyMsg: "点击上方按钮切查询。",
            };
        },
        created() {
            const value = wx.getStorageSync('start_day')
            let subWeek = parseInt(this.dateMinus(value) / 7) + 1;
            if (!(subWeek >= 1 && subWeek <= 20)) {
                subWeek = 1
            }
            this.thisWeek = subWeek
        },
        methods: {
            xqmClick: function(e) {
                this.xqm = e
            },
            xnmClick: function(e) {
                this.xnm = e
            },
            // 获取今天距离某天相差天数
            dateMinus: function(whichDay) {
                let sdate = new Date(whichDay);
                let now = new Date();
                let days = now.getTime() - sdate.getTime();
                let day = parseInt(days / (1000 * 60 * 60 * 24));
                return day;
            },
            // 节次变化
            jcCheckbox(value) {
                let items = this.jc;
                let jcIndex = [];
                let jcd = 0;
                for (let i = 0, lenI = items.length; i < lenI; ++i) {
                    if (items[i].value === value) {
                        items[i].checked = !items[i].checked;
                        break;
                    }
                }
                for (let i = 0, lenI = items.length; i < lenI; ++i) {
                    if (items[i].checked) {
                        jcIndex.push(items[i].index + 1)
                        jcd += items[i].value
                    }
                }
                this.jc = items
                this.jcd = jcd
                this.jcIndex = jcIndex
                this.jcText = jcIndex.join()
            },
            getClass: function() {
                let postData = {
                    username: wx.getStorageSync('user_info').username,
                    password: wx.getStorageSync('user_info').password,
                    jcd: this.jcd,
                    this_local: this.thisLocal,
                    this_week: this.thisWeek,
                    this_day: this.thisDay === 0 ? 7 : this.thisDay,
                    xnm: this.xnm,
                    xqm: this.xqm,
                }
                this.$req("api/study/classroom/", "post", postData, res => {
                    if (res.code === 10000) {
                        if (res.data.empty_class_list.length) {
                            this.emptyClassList = res.data.empty_class_list
                            this.emptyType = "success"
                            this.emptyMsg = "加载完成"
                        } else {
                            this.emptyType = "success"
                            this.emptyMsg = "未查询到信息"
                        }
                    } else {
                        this.emptyType = "error"
                        this.emptyMsg = res.msg
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

</style>
