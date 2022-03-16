<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                加权:{{vjq}}-绩点:{{vjd}}
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
        <!-- 主体展示页面 -->
        <view class="animation-slide-bottom margin list-container" v-if="gradeList.length">
            <view class="list-head bg-blue-1">
                <view class="">
                    课程名（点击查看详情分数）
                </view>
                <view class="">
                    选中/总评
                </view>
            </view>
            <view class="list-item text-black" v-for='(item, index) in gradeList' :key='index' :class="index%2?'bg-gray':'bg-white'">
                <view class="list-subitem">
                    <text class="text-bold">{{item.kc}}</text>
                    <switch class="cyan sm" @click="choChange(index)" :checked='choFlag[index]'></switch>
                </view>
                <view class="list-subitem margin-top-sm">
                    <view class="flex-sub text-left">
                        学分：{{item.xf}}
                    </view>
                    <view class="flex-sub text-center">
                        绩点：{{item.jd}}
                    </view>
                    <view class="flex-sub text-right">
                        <button class="cu-btn bg-orange-1 round shadow sm" @click="detailGrade(item.jxb_id,item.xnm,item.xqm,item.kc)">成绩：{{item.cj}}</button>
                    </view>
                </view>
            </view>
            <view class="list-head bg-blue-1">
            </view>
        </view>
        <!-- 提示区域 -->
        <cu-empty :type="emptyType">
            <view slot="text" class="">
                <view class="margin-bottom-sm">{{emptyMsg}}</view>
                <button v-if="emptyType=='search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getGrade">查询</button>
            </view>
        </cu-empty>
    </view>
</template>

<script>
    import termPicker from '@/components/term-picker/term-picker'
    export default {
        data() {
            return {
                xqm: "",
                xnm: "",
                vjq: 'NaN',
                vjd: 'NaN',
                gradeList: [],
                choFlag: [],
                emptyType: "search",
                emptyMsg: "点击最上方按钮切换学期，或点击下方按钮直接查询。",
            }
        },
        components: {
            termPicker
        },
		mounted() {
			this.getGrade()
		},
        methods: {
            xqmClick(e) {
                this.xqm = e
            },
            xnmClick(e) {
                this.xnm = e
            },
            confirmClick: function() {
                this.getGrade()
            },
            getGrade: function() {
                let postData = {
                    username: uni.getStorageSync('user_info').username,
                    password: uni.getStorageSync('user_info').password,
                    xnm: this.xnm,
                    xqm: this.xqm,
                }
                this.$req("api/study/grade/", "post", postData, res => {
                    if (res.code === 10000) {
                        const gradeLength = res.data.grade_list.length
                        if (gradeLength) {
                            this.gradeList = res.data.grade_list
                            this.choFlag = new Array(gradeLength).fill(true)
                            this.emptyType = "success"
                            this.emptyMsg = "加载完成"
                            this.calcu()
                        } else {
                            this.emptyType = "success"
                            this.emptyMsg = "未查询到信息"
                            this.gradeList = []
                        }
                    } else {
                        this.emptyType = "error"
                        this.emptyMsg = res.msg
                        this.gradeList = []
                    }
                })
            },
            // 查看详情分数
            detailGrade: function(jxb_id, xnm, xqm, kc) {

                this.$req('api/study/detail_grade/', 'post', {
                    username: wx.getStorageSync('user_info').username,
                    password: wx.getStorageSync('user_info').password,
                    jxb_id: jxb_id,
                    xnm: xnm,
                    xqm: xqm === '3' ? '1' : '2',
                }, function(res) {
                    if (res.code === 10000) {
                        let str = ''
                        for (let i in res.data.detail_grade) {
                            str += res.data.detail_grade[i].xmblmc + '：' + res.data.detail_grade[i].xmcj +
                                '\n'
                        }
                        uni.showModal({
                            title: kc,
                            content: str.substring(0, str.length - 1),
                            showCancel: false,
                        })
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: res.msg,
                            showCancel: false,
                        })
                    }
                })
            },
            // 是否选中课程
            choChange: function(index) {
                this.choFlag[index] = !this.choFlag[index]
                this.calcu()
            },
            // 计算加权与绩点
            calcu: function() {
                let sumxf = 0;
                let vjq = 0;
                let vjd = 0;
                let count = 0;
                for (let i = 0; i < this.gradeList.length; i++) {
                    if (this.choFlag[i]) {
                        count++;
                        sumxf += parseFloat(this.gradeList[i].xf);
                        switch (this.gradeList[i].cj) {
                            case '优秀':
                                vjq += 90 * parseFloat(this.gradeList[i].xf);
                                break;
                            case '良好':
                                vjq += 85 * parseFloat(this.gradeList[i].xf);
                                break;
                            case '中等':
                                vjq += 75 * parseFloat(this.gradeList[i].xf);
                                break;
                            case '合格':
                                vjq += 80 * parseFloat(this.gradeList[i].xf);
                                break;
                            case '及格':
                                vjq += 60 * parseFloat(this.gradeList[i].xf);
                                break;
                            case '不及格':
                            case '不合格':
                                vjq += 50 * parseFloat(this.gradeList[i].xf);
                                break;
                            default:
                                vjq += parseFloat(this.gradeList[i].cj) * parseFloat(this.gradeList[i].xf);
                        }

                        vjd += parseFloat(this.gradeList[i].jd) * parseFloat(this.gradeList[i].xf);
                    }
                }
                // console.log(sumxf, vjq, vjd)
                if (count) {
                    this.vjq = (vjq / sumxf).toFixed(2)
                    this.vjd = (vjd / sumxf).toFixed(2)
                } else {
                    this.vjq = 'NaN'
                    this.vjd = 'NaN'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
