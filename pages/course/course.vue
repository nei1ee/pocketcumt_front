<template>
    <view>
        <!-- fixed头部 -->
        <view style="position:fixed;top:0;z-index: 99;" class="bg-white shadow">
            <!-- 自定义顶部 -->
            <view class="cu-custom bg-blue-1" :style="style">
                <!-- 顶部左侧打开抽屉 -->
                <view class="cu-left">
                    <view class="bg-orange-1 left-rectangle"></view>
                    <button class="cu-btn cuIcon bg-orange-2 shadow left-round" @click="modalName = 'DrawerModal'">
                        {{tureWeek}}
                    </button>
                </view>
                <!-- 顶部切换周数 -->
                <view class="cu-center">
                    <button class="cu-btn round bg-green shadow week-btn" @click="modalName = 'ZcModal'">
                        第{{weekIndex+1}}周-周{{title[thisDay-1]}}
                    </button>
                </view>
                <view class="cu-right">

                </view>
            </view>
            <!-- 添加小程序提示 -->
            <add-tips src="/static/fav.jpg" :top="CustomBar" :duration="5"></add-tips>
            <!-- 课程上方星期 -->
            <view class="flex text-xs blue-1">
                <view style='width:10.4vw;' class="flex justify-center align-center">{{month}}</view>
                <view style='width:89.6vw;height:35rpx;' class="flex">
                    <view v-for="(item, index) in title" :key='index' class="flex justify-center align-center flex-sub"
                        :class="index==thisDay-1?'bg-gray orange-1':''">
                        周{{item}}
                    </view>
                </view>
            </view>
            <!-- 课程上方日期 -->
            <view class="flex text-xs blue-1">
                <view style='width:10.4vw;' class="flex justify-center align-center">月</view>
                <view style='width:89.6vw;height:35rpx' class="flex">
                    <view v-for="(item, index) in dayArray" :key='index' class="flex justify-center align-center flex-sub"
                        :class="index==thisDay-1?'bg-gray orange-1':''">
                        {{item}}日
                    </view>
                </view>
            </view>
        </view>
        <!-- 占位 -->
        <view :style="'height:calc('+ CustomBar+'px + 70rpx);'"></view>
        <!-- 课程区域 -->
        <scroll-view scroll-y="true" :style="marginHeight" style="width: 100vw;">
            <view :style="'background-image: url('+bacimg+');width: 100vw;'" class="padding-top-xs padding-bottom-sm flex course-bg"
                :class="bacimg?'':'bg-white'">
                <!-- 课程左侧时间 -->
                <view class='text-xs blue-1'>
                    <view v-for="(item, index) in sksj" :key='index' class='flex justify-center align-center' style='height:120rpx;flex-direction:column;width:10.4vw;'>
                        <view>{{index+1}}</view>
                        <view class="text-grey">{{item.s}}</view>
                        <view class="text-grey">{{item.e}}</view>
                    </view>
                </view>
                <!-- 课程水平分割线 -->
                <view v-for="(item, index) in 11" :key='index'>
                    <view style="width:89.6vw;position:absolute;border-bottom:1rpx solid lightgray;z-index: 0;" :style="'margin-top:'+(index+1)*120+'rpx;'">
                    </view>
                </view>
                <!-- 课程主体区域 -->
                <view v-for="(item, index) in courseList" :key='index'>
                    <view v-for="(subitem, subindex) in item.zcd" :key="subindex">
                        <view v-if='subitem===weekIndex+1'>
                            <view class="kcb-item radius" @click="showDetail(index)" :style="'margin-left:'+((item.xqj-1)*12.8+0.4)+'vw;margin-right:0.4vw;margin-top:'+((item.jcs-1)*120+5)+'rpx;height:'+(item.cxjs*120-5)+'rpx;background-color:'+item.bg+';width:12vw;z-index: 9;'">
                                <view class="text-white padding-xs" style="font-size:22rpx;">
                                    <view style="line-hight:24rpx;max-height:150rpx;overflow:hidden;">
                                        {{item.kcmc}}
                                    </view>
                                    <view>@{{item.cdmc}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <!-- 侧边栏设置 -->
        <view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModal'?'show':''" @click="modalName = null">
            <view class="cu-dialog basis-lg bg-gradual-blue text-black" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
                <view class="margin-top-xl margin-bottom-xl shadow-lg">
                    <view class="text-center text-white text-xl padding-bottom solids-bottom margin-bottom">
                        <view>开学第
                            <text class="text-sl padding-left-sm padding-right-sm">{{tureWeek}}</text>周
                        </view>
                    </view>
                    <view class="cu-list menu sm-border card-menu margin-top margin-bottom">
                        <view class="cu-item arrow">
                            <view class="content" @click="addCourse">
                                <view><text class="cuIcon-add text-green padding-right-sm"></text>添加课程</view>
                            </view>
                        </view>
                        <view class="cu-item arrow" @click="modalName = 'XqModel'">
                            <view class="content">
                                <view><text class="cuIcon-refresh text-cyan padding-right-sm"></text>导入课表</view>
                            </view>
                        </view>
                        <view class="cu-item arrow" @click="bacChange">
                            <view class="content">
                                <view><text class="cuIcon-pic text-brown padding-right-sm"></text>自定义背景</view>
                            </view>
                        </view>
                        <view class="cu-item arrow" @click="cancelImg">
                            <view class="content">
                                <view>
                                    <text class="cuIcon-close text-red padding-right-sm"></text>取消自定义
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="cu-list menu sm-border card-menu margin-top margin-bottom">
                        <view class="cu-item arrow" @click="setStartDay">
                            <view class="content flex">
                                <text class="cuIcon-settings text-grey"></text>
                                设置开学日期
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 周次model -->
        <view class="cu-modal bottom-modal" :class="modalName=='ZcModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-blue" @click="modalName = null">单选</view>
                    <view class="action text-green" @click="modalName = null">确定</view>
                </view>
                <view class="grid col-4 padding-sm bg-gray">
                    <view v-for="(item, index) in 20" :key="index" class="padding-xs" wx:key="week">
                        <button class="cu-btn blue block" :class="weekIndex==index?'bg-blue':'line-blue'" @click="weekChange(index)">
                            第{{index+1}}周
                        </button>
                    </view>
                </view>
            </view>
        </view>
        <!-- 学期选择 -->
        <term-picker @xnm="xnmClick" @xqm="xqmClick" @yearArray="coYearClick" pickerType="course"></term-picker>
        <view class="cu-modal" :class="modalName=='XqModel'?'show':''">
            <view class="cu-dialog">
                <view class="bg-white margin-sm">
                    <view class="text-left text-bold text-xl padding-sm">
                        学年选择
                    </view>
                    <view class="grid col-3 bg-white">
                        <view v-for="(item, index) in yearArray" :key="index" class="padding-xs">
                            <button class="cu-btn blue block" :class="item.value==xnm?'bg-blue':'line-blue'" @click="xnm = item.value">
                                {{item.title}}
                            </button>
                        </view>
                    </view>
                    <view class="text-left text-bold text-xl padding-sm">
                        学期选择
                    </view>
                    <view class="grid col-3 bg-white">
                        <view class="padding-xs" v-for="(item, index) in termArray" :key="index">
                            <button class="cu-btn blue block" :class="item.value==xqm?'bg-blue':'line-blue'" @click="xqm = item.value">
                                {{item.title}}
                            </button>
                        </view>
                    </view>
                </view>
                <view class="cu-bar bg-white">
                    <view class="action margin-0 flex-sub text-gray solid-left" @click="modalName = null">取消</view>
                    <view class="action margin-0 flex-sub text-green solid-left" @click="getCourse">确定</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import addTips from "@/components/add-tips/add-tips"
    import termPicker from '@/components/term-picker/term-picker'
    export default {
        data() {
            return {
                yearArray: [],
                termArray: [],
                xqm: "",
                xnm: "",
                CustomBar: this.CustomBar,
                StatusBar: this.StatusBar,
                modalName: "",
                weekIndex: 0, // 周数索引
                tureWeek: 0, // 真实周数
                dayArray: [], // 存放本周日期
                month: 1, //存放当前月
                title: ['一', '二', '三', '四', '五', '六', '日'],
                thisDay: 1, //今天周几
                bacimg: "",
                baseImg: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QC8RXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAApmgAwAEAAAAAQAABJ6kBgADAAAAAQAAAAAAAAAA/+EJIWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/PgD/wAARCASeApkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBAMDAwQGBAQEBAYHBgYGBgYHCAcHBwcHBwgICAgICAgICgoKCgoKDAwMDAwNDQ0NDQ0NDQ0N/9sAQwECAgIDAwMGAwMGDgkICQ4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4O/90ABAAq/9oADAMBAAIRAxEAPwD9vKKKK0PylsKKKKCQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKaGB4pc0ALRRRRYdgooooEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigaEJAGTwK8p+K/xOT4c6XYppdhJrniTXrn7BoWjwtta6uCNxLtz5cEK/PNJj5VHqRTvi78V9H+EXhN/EOpW02o3lzOtjpWmWmDPe3knEcMeen953PCqCa+YPA/hT46/Ej4qad8WfHPiHTPDq6NYvaxaHpNkt0Et7mUSSQvd3JIErhQskqLnHC4FZ1JdEfQ5PlHt5KrV0ie7eHfDXxihik17xZ4z+26w0LPHo1hbwWukJKQdkPmmKW6aMNw0hfcRyFFZEnxC/aE8OAXPij4eaZrtmMNK3hXUzJcxr/Fttr2OLzSOwVwT25r3wc8kYrPOraR/ag0M3tt/aJh+0/Y/MTz/KzjzPKzvKZ43Yx70lc+oq5XhZachifD74peDPiZY3N14Zu3+1ae4i1DTbuJ7e+s5D/Bc20gEkZPY4KnsTXoQ55HevlD44eCfiCNd0P4p/BvS9PuPFWgswvRLO9tNqNiSN1g2FMUwkGdhlK+WwUqRXtHw0+KXhv4p6RNqWgie1u7Cc2mqaVep5V5YXKjLQ3EROVPdWGVYcqTWkal1Znymb5O8O/aUvhPSaKQHnFLVNNbngBRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApp+8pzgDvTqHB2nGfXiguG6uflJr2qeOvjj8bpPD3xDaO30v4cXM98+nRWzWzx3M8zx2cDzby1xG1vElwX+XO4KOM19c3g+KT/DPUI/g1JpMXik6hF5L6yGNsIWZfOzsBO/y87e344NeA60Ne0L9ojxRpjrsXxRrT37SygtmwsNNtVjROgGZpAM84APc19R/Da/jhvp9LkOBcIJI/wDfXOR/3yf0rCC1kfp+EUPq8OVaWOI+P3xU8a/D+DwdoPgm2huPE/iPUBta5jxp7w2sfmXkMkpO6N5FP7nAL8EgcVf+DMXhj4p/Yf2i9Q8H2OkeLdTtZtJiu4pzdXAsoZWj8tn2ogJkVhgLnaByeg9Q+Ifw78L/ABN0H+wPFEMzRxzpdWtzayGG5triP7k0Ey8xuvTOCCCQQQav+BvBui/D3wpp3g3w6sy6fpcZjgM0hklO52kd3kwMs7szMcDk1z06Vb27lKXu9j1ZV6P1dRjH3u5y3hP4y+AfHHivUvB3hq5u7u+0mWaGeX7HcLaGS3bZMsd0yeS7Rv8AKQG61598QtDm8IfGv4f/ABI8Jwslx4m1P/hFvEcMS/u7u0lgklgmmA/5aW0sfyyHkKSuccV7j4c8JeHfCK38fhyySxj1O9k1G6jjZyj3Mv8ArJQjMVUueW2gAnnGa4f4h+JLzw/46+GMFtKyxa34in0yeIdHjksLhwSPVGTKnqK3jdaPueXjUnQkl2Pd4TmNT/n8fr1pzU2LGwYGB6U5veul7n5hIbRSE/pQCD0OfpRyshLWwtFP2imng0gasJRRRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9D9vKKK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jAgusf8ALPUbPiG6ibvkBx/CwNClNO5niuH6E4/utGetUV4L8Pvi5qlz4lf4VfFfTYvDfjy2iMsMMbMbHVYEHN1pkrcuv9+E/vI+4I5r30HIzjFbJpq58hisHUoTcJoZRSnrSUHKFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//9L9vKKKK0PycKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopQM07aKBpDKKftFMoBoKKKKBBRRRQAuTSZNFFABRRRQAUuTSUUAFFFFABRRRQAU8AYo2ig8DiguMRp4+lcv4t8Y+GvAvh+78U+LdSg0nSbCPzLi6uW2Ko7AZ+8xPAUZYngDJrhPit8aPD3wvhtNNkt59c8T6wxi0Xw7po829vZO2FHEUIP35nwij1PFcr4D+APiHxtr9p8Tv2j54NW1u0fz9H8MWp36PoxPKnY3F3eL/FPICA33BgZqJVHblie5luTVK79pPSJyFnD8V/2ogTatf/Dn4WXHymfBh17XIuh8sHnT7Rx/ER5rDpjrX2H4D+H/AIP+G3hq18I+CdJttH0qzGI7e3XAZj953b70jueWdiWJ5JrsI4VQgL06dOwqfaKUNNz7OhQhSjywVhAoFOoooNgwKay5GKdRQB4/8X/g/wCHPi74bGi6uZbG+s5Rd6Tq9mdt5p92v3Li3k6hgfvL9114NeMfCn4neIY9evPg18YFhsvHmjQCWGeMbLbWrFcKl/Zg/wAWP9fEMmNvavsYjivjf9tXTvDln8IZfHlzPNp3ijwzeQTeFdQswBdLqk8qwwQJn/WR3DNtmjPDJk4yM1m58juceNwUMTBxkte59FIQwyOc0HrXiPwO+LFx8S9AurPxFZf2P4x8N3P9meJtIY/Na3ijJdP70E4w8TdCDjtXtxPIroi+aPMfnuJw0qM3Tl0EooooOUKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9P9vKKKK0PycKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKXBoANpo2mndq5zxT4s8PeDNGuPEPijUIdN021A824nOFBbhVAALM7HhVUEk9KLpbmsabk+WKuzoAeaPNj9fb8fSvl66+LvxC8daxaeFPhj4ZvdAGoWr3/wDwkXie38uCKzV/L82GzVzLLNIxzFHKU4+Zhitm3+G/xKeSW21b4oa3NYyIjO1rDawXTzdZNsgiKwRdAiRqT/ec8VCqrax7lDh/ESjedkfRPmKKjU5JPGK+brj4FSyMJLL4jeP7ScciZdX8wZ945ISh57YqzoGseNvhjq0Wn/FXxbp+t+GtRf7Pp2t30cdjeQXPVLe7KYt5RKAdko2HdgMOQaHNJ2aKxPD9WnT54u9j6MAzS7TTEkjKBw4KsAwORggjIxjjGKkyD3qzwHCzsxuCKSnkjFMoJasFFFFBIUUUUAFFFFABRRRQAoGaXaaBweaazhcnI4GaC4xuOLhev6V82fED4ya5d+KpPhF8D7GLxF46ZQ17czH/AIluiRP0n1CRergHMduvzv3AFYHiH4g+Mfjd4kvfhj8ArlrPTbCU23ibxyF3wWR/jtNMJ+W4vccFxlIup5r6e+Ffwo8G/CHwxF4X8GWX2a33Ge5uJCXubu4f/WXFzM3zyyueSWPHQYHFZyfM7R2PrMqyVpKtiF8jjfg78A9E+GM134o1W8m8UeN9YUf2v4l1Hm4m7+VCvK29sp+5EmAO+TX0DtpKkoSsfVabIKKKKBBRRQelABUFxcw2kTT3DrHGg3M7EAKO5JOAAO5JrH8R+IdI8K6Hf+JNeukstO0y2ku7qeT7scUS7nY+wAr87fjb+0Va/tD/AAo1v4UfA3wz4w1nWPGNtHYW1+dLuLKxggmkQyXEt3NsUReUGII+8DWc6iiVGDZ75+1B8a9H8J/CLWbHwhrdvP4u8Rxf2L4ctbCeOW6lvr1hDG0SRMzfu9xdmxhQMmue8B/sc+G9Gn8L614w8VeLfFFx4feDUV0vWtVkvNPXU44wGuBE65Yo5YoC2B1r074afsw/A34X3dn4g8K+CtH0/Xbe3SI6jDDmUNsAdo2csULnOSuCa+gEXHOOTUqPNqwlJJWifEP7RmmS/B/xvpH7T+hRv9kt/K0PxzbR5xcaRM4WG8YDjzbCTB3H/lmSDxX05bTwXsEd3byLLFKivG6H5WRgGVh7EHI9jXTeKPD+keKvD2peG9egW507VbSWyuomGQ8U6GNxz6g/nXyH+ylrepL4E1T4X+Irg3Ot/DHWbjwpdyk7jJFb4kspSfV7V0z9Kum3GTj3Pm8/walSVdbo+oKKPaitz4oKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//U/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFHWn0wdafQXEjcnY2BnAzXw/49nh8dfF7WP7XuI7iz8EyQ2enaZuVkjuZoFmlvZY/+erB9kLMPlVWIwTmuE/bG8WePfCnim61N9Y8S6L4dtfDayaC2gSSQwXOttcbDDeTRK207THsSTAI3YOavfDHwYng3w0lvf3Lajr18Re69qM7eZcXV9KN0jyv1JXO1VOAFAwMGsJScpuB9pkuUqMFiW7n3RYDbZW4zk+UmT6/KKtdTmvHv7R+LkfxU0OwstO02X4dXGgu97fE4vYtST/VIo3gNE64GAvrzwKseOfjh8OPhv4x8PeDPGmqQ6VdeJIbq5trm6kjjt41tApImkdl8syF8RdQxB54q1UhFXlofSypt25dT1yqGqaZpmsafc6ZrNlBfWV1EYp7e4RZIpEPBDowIYfWvMfEvhPU/H/iPwJ478I+OLzTNG0K5kvriy04rLZ61DMgVElcNtKKRkMAw5OBnmvWhwfanzXRLSTsz4r8Q+Gvjh8FfDvjGb4eeKNJ0rwF4atJtb0i21i3bULlVSEyTaertIoit45FIiLbmG8AcCvsXwLrtz4o8F6B4lvIBbT6tpdpfywrnEb3EKSMnPOFLEV5H8ffh3r3xK8ATaD4cvlhuoZ473+z5wRaakIDv+w3hXEghmKgbkIIPXIyK7f4OfELSvih4C07xXplq2nswezvNOkxvsru1Ywz2rAf88XUgdMqVNTSfLM+Z4hw8PZxqQilr0PT6KUsvTPNM3qenat0m0fHyi2x1FSYFMPWpIasJRRRQIKKKKACnr0oGMc1WvL2z060mv7+aO2tbaNpZppWCpGijLMzHgKBySaenU1hTk3ZDrieK3he4nkSKKJS7yOQqqqjJZmOAABySelfIdxqnir9qvVLnwx4AvLrw/wDCu1lNtrHii3JjutYZTiSz0tjyluSMS3PcfKh6021t9f8A2vNSe2tGu9I+C1lMVluAWhufE7xthkiPDRaYrLhm6zdB8pzX3Zo2jaboel2mkaVaQWVnZRLBb29ugSKJEGFVFAACgdAK5nNyfLbQ+yynKFS/e1ldmR4N8F+GvAHhux8I+ELCDS9J02IQ21rbrtRFHfrlmY8sxyWOSTXVgYxTsCitErKx9CFFFFABRRSE0ABOKhmmjiiaSRgiKpZmY4AA5JJ7ADrXIeOfH3g74c+Gbvxd441e20XSLEBp7u6bai56KOpZmPCqoJJ6Cvi3xl8XPHX7TulzfDT4B6FrWk6Dro+ya1441i2ext7axf5Z1sYpsSz3EqEqhwFUEn3Gcpdiooyr/Vfin+2rpj6HpGnWnhb4MXurywXusNdGXU9asbGYq8UECqFgguZEwXYklB+f6GWFha6dZW9hZRrFbW0SQwxIMKkaKFRVHYKoAFc/4F8GaJ8P/CWleCvDkAt9L0WzisbSLqRHEu0Fj3ZvvMe7EmuwAFKEFuwk+xGBignHSh5I1Bye2a+Mfi78YvFfjPxbc/Af4AXCr4iiQDxJ4m277XQbdzgqCOJNQdf9VF/D944xxcnZGVSpGEXKbsif4x/GjxT4h8UzfAj4BvHP4uZAdc11hvtPD9s4/wBZIRw96wP7mHqDy2K9B+Evwr8M/CHwqvhnw2JZmmla71DULtt93fXcn+tubmQ8vI5H4DAHAo+Fnwo8JfCTwtH4Y8Kwvh5Gub29nJe6vbl+ZLm5lOWklc85JwOgGK9LA28evNVGnJas+MzXN3X/AHcF7q/EkYVHSkk0laHz7YUUUUEhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9X9vKKKK0PycKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAUdafUdP3CgpM+dP2qtHXVvgb4knluUtYtG+z67IZOEkGmzJdeU2O0mzaPc185/B7QrnRPAGmyamS+q6wp1fU5XJLvdXn719xPJ2BggHQBQBX0D+18tzL+zX8QRZozuNK3yBQSfKWeIy9O3lqc+1ef6bNaXFhaXGnsr201vFJEVxjYyKVxj2NYSTdS6PvuHZuWFlrsz6a8MXAvdBspeCRCIz35X5SP0r5h+J37JGifEP4lzeOU1j7DZ601k2v2Etsly9yLB1eJbaeRv9FWTYolVVw2MjkmvY/h3rQjeTRLhvlc+bDzxu/iX8etetH1FTWw0Ky5aqPfoV50nzQGQQQWsCW1rEkEMQ2pFGNqIo6Kq4GFHQe1OPWgHFJWvkYN3d2HXI9q+e/wBnuA2Hj3416dbIUsY/GwmhA+4JZ7GCS4C44z5nLe9fQnY9s9yf88Dv9K8Q/Zx1p/E2meNvEcBEml6h411RtKuFVQJ7eMxxGQMAN6+ajgMeoHWkvjPIz2olg36ntPinTNY1jTTZaJrM2hTlwWu7eGGeTZ/EqrcK6An+9tJFeJax4Z+MXgCFvEvhLxZqHjgWg8688Pa7HbB7qJfvizuYI4miuAOUVgyMRtOMg19Ikgda8f8AiL8StW8LeINC8HeEfD7+I/EOvQXV3b27XUdlbxwWWzzZZZ5A3RpFCoqkn6Vo9j47CynKXKtjtPBfjPRPH3hjT/Fvh2Uz6fqUIlhZhtdSDteOReqSRuGR1PQiuswDzX5+fDDx/wDFP4e+N/iP4ZvPhnNeadBq8Gu3Fn4e1G3u5LD+1YfMkWGKRYDOkksbS7UIKsSADX2J4B+JPhL4kadLqHhW7ac2kvkXttPG9vdWk2MmK5t5QJInHoRz1BNKFTmVx43CSpT8jviMUlOJzTetUee9wp+0U3aao6nqljo1jcanqlxHaWdpE0088zBI440BZmZiQAFAJJJp20uVCDclFLcdqepafo+m3Oq6pcxWlnZxNNPPO4SOONBlmZmIAAHc18ladpeuftc6gmpaglzpXwXs591vbHdDceJ5Im4kkHDx6YGGVXhpsc/LTtG0fVf2uNZj1nW4Z9O+DWnXHmWFlKGjm8SzRNxPcKdrJpqMP3UZ/wBcfmPy194WdpDZ20dpaxpDDCqxxxxqFRFUYCqowAoAwBjgVzyn7TbY+4ynKlRSq1Vr+QzTtOstMtILDT4Utra2iWGGGJQiRxoAFRVGAFUDAA6CtHpTFXBzmn1fSx7zCiiigQUUUUXAKacdScVS1LUrLSNPuNV1KZLaztImnuJpWCpHGgLO7MeAqgEk18U+L/2ttM8eJ/whX7L0L+OfFuogwxahFBKukaYrfKbu8upEVCsf3ljXJcgDp1zlUSVylFsh163tPj5+1Va+FriNb/wf8HbVdR1GJwHgn8Q3wxbRSL91mtIAZCp+6zCvuGOFFVVXIA4A9Pp6V498C/hBp3wX8EReG7e7fVdUvZ5NT1vV5/8AXX+o3B3XFzIevzNwi/wqABXs+e9EF1BvoPAxUcrlUJXrRJIqDJ6V8d/Gj4weKvEHid/gH8CpUPiy4jU69rjKHtvD9nJwZXPRr11P7iLOQfmParuZzkox5pbFX4x/Fzxd4w8Xz/AP4D3Cx6+I1/4SbxNjfb6Bav8Awgj5ZNQlXPlx5+QHca9K+F3wv8KfCXwnbeEfCEDRwRsZ7m5mO+4u7mT/AFtxcSHLSSyNkkk8ZwMAUnww+Fnhf4TeFofC3hWFtocz3l5Od9zeXLnMtzcSH5pJZGySScAcDivS9vcUoQuvePic0zadeTpx0iKo4ppGDTsgcUhOa3Tex4T2sJRRRSICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCjqOn2Wq6fc6XqVulzaXkTwTwyDKSRyKVZGB6hgSDX5++JfCd7+zXqej6fcarJefDS/aSxs5rtMy6Rcu4e2t7i4yd1qyho4pGAKnAbPBr9EKy9W0XSPEGm3Oi65aQ3+n3sbRXFtcoskUiMOVZWBBB/wD1YqZwcvhPXyvMnhp67HyhbySI0VxasVdcSRuvt0YHoR/OvfvC/ieDXrcQyEJeoMPH/ewPvr659K8Uvv2QfAcdpLZeGPEfizw9a5Elra2WpM9vbSod0bxRzI5Co3/LPdtI4PFebax4E/ah8CW9zPpsfhzx7DZQvLBPHJNpeoOEBIUxBZIWlP8AsEBjxxUuco/Ej7DD5rhqztGVj7drlvGnjTwz8PfDN/4v8X30em6TpsRlnuJOwHRVXq7seFUZLHiviD4S/tDftI/EgarH4f8Ah3Y6nHpjQQtI+oCARSSqWKTtcxxvvjwQ6qmU79RXu+ifAvxL491m18YftHXthrklmrHTPC2nq39jWLMCplk3nfeXOxiBI4AX+EZqFJy+FHRiMfQw/wAckYera78Qfjjqlz8L9CurXwNpraVZ6hrk5labV3sdQUskdmoQQRiRQY5Jt7mMkgLnBr6q8LeGdE8G+HdN8LeG7RLHTNKtktbW3TokcYwB7k8kk8kkk14t8NPgRJ8OvGb+I/8AhJb3WLGy0ZtA0ayu4k32li1yLkRPcKxe48thtiLgFFOOa+hx05rSNNrVnx2dZisRO1N+6LXkXxR8Ba74ludC8X+CL6303xb4WuJJtOlvVd7WeG4UJc2lysfz+VMoHzJ8ysqnpmvXaKpq549GtKnLmieJ/CvwH4t0HWPFPjjx/cadN4i8Vz2xlg0oSfZbW2sojFBDG8uJJD8zM7sBknpxXqcWhaTDrUviGK0iTUriFbaa6VcSSRI25Fdh98KxJXdkjJx1rZooStsOrXlN3YuM0oBzQtVb+/tNMs59R1GeO1tbWNpZp5mCRxogyzux4VVHJJ6U/UzhC7SQ3Ub+y0uzn1HUbiK1trWJppppmCIiIMs7MeAoHUmvk7StI1n9rPVo9U1RLiw+DemXAa0s3DRTeJp4m4mmGQy6YjLmNOs/VhirNjpWrftWatHqGqRz6f8ABzTrgNb2zhopvE8sbcSSqcMmmoR8qnBnPPC9fuSztLaxgjtLONIoIUWOKONQioijCqqjACgDAA4Fc8nKcvd2Pt8pyqNFKrU+ILKyt7K2itbWFIIYUWOOONQiKqjCqqjgADgAdBV0DFKKK0suh77dwooooEFFFFACZFGR+dUb69t9OtJ765YLDbxPNIx7KilmP4AV8XeE/wBqj4reJ/D1j44tfglrmo+GNaU3GlXmjX9nc3EluWYRvNayGF4y4XdwSACOaickrIaVzp/21NZubb4E6p4Q0tydV8cXln4VsI1OHaTUbhI5Nv8Auw7yfQV9LeHPDuleGtEs9C0m3S3tbCCO2jWNVUbYkCAkKBk4HWvlbwZ4S+JHxk+KWl/GD4taG/hLQ/Ciyf8ACLeFriRJrr7ZMpSTUr4xlo1kWP5IYwTs5YnNfY8YCjaOlKnDXmKbsrIMAdKazqoPOCKc52jI/Wvkv4z/ABl8SXPiUfBD4IeTd+ObuISajqTjfZ6BaPwbm7I4NwRnyIPvMfmIx1qTs9DKUoxXNN2RF8a/jL4lufES/A74ImG78c30PmajqUnz2mg2bcG6uSODORnyIepOCcDr1vwo+FPhr4SeGB4e0Ey3NxcStdanqV0d91f3ch3SXFw/VmYk4HRRwOKb8J/hV4d+Evh06Jojy3t5eSm81bVbtt93qF2/MlxcSHlmJ+6OirhQK9S9qcad9WfFZrnEq6dKm7R/MXJHIp+RTKK1PA5mBooooJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooppgKKCBnJUfXvSZxS5JpXKUrDBFHztUDJycADJPc+tS4pmKXJoK59bg3WkozmighhRRRQIKKKKAIpp4beKSa4dY440Lu7kBVVQSSSeAAASTX52+LPjr4E+NXiwaZq8PiOb4O6LNm7vNM0q9ubfXb2JuYpJoUbGnW7DLKATK2M/KDX3j4y0WbxH4T1vw7bv5cuq6bdWMb5xteeF41P5tXjX7NOtw6t8D/CPkILafS7BdGvbZAF8m708m3nQqOhDx7uf72ayq83Moo+t4bw1KSdaWrR7x8Nfij8LviJpa/8K41zT9Ugs0WNra0YJLbqoAVHt2Cyw4AwAyADoK9NDA9O1fKHjj4JeAPHd7Hrt5Zy6R4itzuttf0SQ2WpQt1BE8RUyDP8MgZT3Fc5Y/E34v8AwRYW3xWibx14NiIX/hKdJgxqNmnZtSsU/wBdGB96e3GRjLKaW259Y1fY+2KK5vwx4r8O+M9EtPEfhbUbbVdMvoxJb3dq4eN1PoR0I6EHkHggGuiUg8DmquDVh1FFGRQIKrzSAL6n0qUyIvVgK+K/FOs/E343/FvxZ8JvA3iqbwR4X8FQ2kOtapp0Ecuo3l7fRtN9nt5JcpbpDDjc4BcseMd4nIaVzGuNe+NP7TcvirTvh3rml+C/hzBeXXhs6q1s15qmpGH9xeS2u5lht4wxaONyGJIJr7A8D+DtK8B+EdG8F6KhXT9CsYdPtQ5y3lwIEUsf7xxk1Q+Gvw98O/C7wTpXgLwrC8Ol6REYoRKxeRiWLvJI5wWeR2LMcDk132AOaIx6scnroIFpGdV4PFJI4VC24DFfI3xW+MPijxN4mn+CfwKeN/EyIP8AhIPEDr5ln4fgfux+7LfOpzFAD8v3nxjFVciUoxi5SdkiT4w/GPxHfeI2+CXwO8m78bzxB9U1OUeZZ+H7WTj7RckfK1yw/wBRb53E4ZgF69X8KfhV4a+E3hxtE0Tzrq7vZTd6rql2d93qF2/MlxcSHlmJ6DoowBwKk+GHwv8AC/wp8Of2D4ejlleeRrrUdRumMl1fXT8yXNzKeXkY9OyjgACvSBgdOacI33Pic1zZ1pckPhHkAAUlL2FJWrVnY+fe+gUUUUhBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9D9vKKKK0PycKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKADnOc18lqT8FPjlPaXH7nwd8Vrnz7V8YisvEKoBLEx6IuoRKHXPBkU45NfWhBPSuD+JXw+0H4n+DdR8F+Io2+y36ArNEds1vOh3w3EL8FZYZMOpHpjvRKPMr9j18nx/1Wtd7Pc6TjOPb/PFMIGc468fhXgnwa+IWt3V5f8Awm+JhSHx14YjUzyfdj1SxJxDqdtnG5JAP3yj7kmR6V7ySANzHaB1LcAcZ5z04rNVE9WfoEJRlaUHdM8B1j4Y+IvAWtXPxB+AEtvpeo3L+fq3hm7YppGqnnc21eLO8P8ADNGArH74Ir3f4S/GTw38VLC6Szin0nXdKkEGsaDqACXtjN/dkT+KNuscq5RxyD2qnpWu6Frnm/2JqdlqPkHbKbOeOfYemG8tm2n2OK8x+JXwuuPEV/aeOvA2oDw5490VCNN1dFyk0ectZ30Y4ntJehVuUJ3KQRzDTvzR2N99GfXm6qGpX1vpthc6lduI4LWF55WPZI1LMfwANeL/AAY+MkPxIgv9D16ybQPGfh9lg13QpmLNC5A2T27H/XWkw+aKUdjg4YVe/aJ19PDPwI+IOtMQDbeG9Q2ZO353t3ROfXcwp811dGdrOzPnbwLaftBftIeFrP4iXXxAPw98KeIA1zpuk+HrKJtQNiXZYWm1C53FJJYwHwifLur6d+FHwf8AB3we0a50fwmt3K+oXTX2oX+oTvc3l5cuArTXE7nc7kAAdAAMAAU34I6GfDPwe8E+HnXa9h4e0+CQYwdy26FuP94mvVV7VMbMcnuSVFLIIwCeh61Dc3ttaRSTXUixxxKXdmOFVQMksTgAAc8npXw/4k+I3i79pHUrvwV8HL+bRvAFtK1rrnjWIES3u3iSy0bOAc8pLdHheQmTTu9jCrVjTjzzdkbnxG+Lnif4keJb34PfAO7WCezcQ+KPGCqHttJRvvW9ox+WfUWXOFGRF1bngedeK/HHhP8AZt0Sy+DPwY0qPWvGt8puRbTuX8syHMup6xcj5/mPOGO+Q4CgLUnjTx9pXwjttO/Zz/Zy0i1k8XyxqsUC/NbaVFKRm9v3PMk0hJZEY75G5bC814Nf6RpXwE06+uPFEt1qvibUrvbf3D4m1HVtSkPyxoFJDMSQERPkRPYUm30OCFOpi37SelNbLv6m7Npfxa1N/wC1db+K3ilNTf8AeOdMeG1som6hI7Ty2UxrnHzklh1Neu/CP4/eItN8UWnwp+N8lsdV1DKaB4ktkENtqhXk286fdgvcchR8sgztwcA8Bo/7MnxM8SeH5viN4h8RS+HviHPtk0rS43Mml2FtyRY3kf8Ay3afOZ5Rhkb7nSvOJk034o6VrPw58d6fLoniTSmVdS09m/0iznU7oby1k43xFgHhlXgjIPNKN4y5jSdLB4xOjTtddj9U0fzFzjBHan7TXwV8Nf2o7rwx4Sv/AAX8Ube41X4h+G5bfT7a0sgPN15LljHZXNuGwoZ8EXJPEbKSeK9Ai/aK8WeDtRsx8cvCMPhXRNTlW3g1vT77+0LS1mY4WLUCIozBuJwJBlM9x1q54qk5JXPiq+WVKVRwn/w59a4NJTILiKeJZYnWRHAZXUgghuQQRwQQeD3qTBrbpc86UGmJRS4NJjFBNgooooEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//R/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBy0pGRg0yk3becZprcuL1seL/ABf+Ea/ES3sNY8PX39heMvDrm50DWo13NDJ/FBKBzLazfdliPBByMNXxh4l+MHj742rP8HZtOl8Ktoc7WPj28tJQ8csqdLDTp0OTHcj55WyGVDsPJr6R/aH+NV74VWL4X/DZ0uPH/iCEiNvvR6VZNxJqFztzt2g/uEPLvjHAr5NsfBOpXqWH7PnwouZbXUruBrrWNdYeY+n2srEXF/M38d5dPkQrnLNk9FzXLXlFytA+9yRThh3UrP3TufgJ4YXVvjX/AMJR8ONPttF8KeFLG50XWLu1j8uPUrmRQI7SMIFWT7EyhnlbO1jtBr9A8ZGK+O/hz43m/Z2stJ+Dfxj0220HTLfFroniyxVl0jUCST/pLNk2l65OWExxI2SG7V9ho6SIskTB0dQyspBBB5BBHBBHQ06VuWz3PXjUjNc8HdHhfxl+GfiHxAtp8QPhdfronxF8Nxs2k3mAY7uLO59Ou1OFktpzwAfuNhga8b0vxf8AGD9q/wAEaf4W8TaRoOgeGW1WKPxZJZ3cr3oOnyrLNpjWEyBoJJJEUOWkZdnKkg19uL3B6EYNfJ3xAU/BT4x6R8VrAiDwv47uoNA8WxD5Y4r1/k07UsdFYufImbuCpPNROHvJrY3g01bqfb66/aQrsjibC8ADAGBwAPb0rD8RfELTPDmj3eu6xPb6ZpthC09zd3cgWOJF5LMx4A/WuC8a+NPDPw78OXfizxhfR6dptmvzyPyzOThYo0HMkrnhEXljwK8F0DwF4m+O+rWfjz4w2Eml+E7SUXPh/wAGT9ZCDmK91dRxJKeDHbH5Y85bJrXS1kceLxMKEXKoV5IfGf7Vs63uufbfDnwkQhorNt1tqHiNQchpsbXtdPPZPvzA5JCmo/i38Yj4ReP4H/Aa2tU8SW9ssNxcQoPsPh+0IAVnVBtNwV5hg65+Zvet8YvjxrGpavdfCP4IzR/2vbfudc8RACS20ZSOYogPllviPuJysX3jjpXg0n/CLfBjw7Bp1hBcajqOo3O2C2jzPqWrahL94nq8ssjcu5+VBzkAVErbRPNoUKmKn7evpHoj2zxBa/CX9mv4SWYsZpNY8X61dwXs2oJ/pOq6lqUp35U5LGR2O1EHyoOwArpvgp8ENdPiD/hdHxr23fjS6Qtp2m7vMh0WCQYKKej3jj/XS9vuqcdX/A74Calpeqx/Fj4u+VeeM5oithYRkPZ6JA/WK37Pct/y1nPJPC8V9arhRjGPYVtCjLdnm5tnEUnQw+wiIT1/DFfIv7WPgLQZPC6fFe01OLw74v8ADGI9K1BlZxe+aQBpc8aAyTJcN8sagFlfBXjNfX1fKn7WEF5p/hbwz8Qkha507wR4jg1fVYVG4/Y3jktpZwvc23miT6AntU19INo8LLKsqdVSi/8Agn53X3je8+LWteFh8MNMvtM+Luhaj9nmt3gJTTF4S8F9KwMf2baSyfNkngDrX6p32kWeq6NNomvww6jbXVv9nvIpkHlThl2uGQ8bW9O3auI8MXWm2O6+02O2Ftqm24ea2RB5xZRskZ1AMmVI5JOevWvTAwljDxkEHkEdK+blNyldiznN5YurF25eU+a/C2v65+yx4hsfAXjSae5+FuuTLD4c1i5Yu+jXEhwmn3chyTauTiCVj8hwp7V90RTJKgdSCDyCOQQeQQe4I6V5brGiaf8AEPRJPAXim1hv9J1CNoLiOddwaJlIK/rwRgggEGvnvwJ4j8S/s3eNbD4G/FW9kvvCWrSeR4J8UXB+7k/Lpd7IekqfdhkY/MoAPOK9iji0kk9jrdOOKoe2o9D7aprdaVSCOKRuteieRJNaMbRRRQZhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//S/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApGAIwaWigcdz8/vjTo8/wy+Md98QNXjRvD3jyOytJNU2/wDHlf2kPkRw3B/gt7hQDG5IUPlTyc1m/CzxxD8Bdcv4fHO270HxXeLcXvijy9s1rfMPLVL4LnFiVwkLjiHHzDDbq+9fE/hnQvGOg3/hrxNZRajpeowNBdWswyjowwR7H0bqDyOa/OLxD4f1X4G65F8PPiA51TwRrTta+Hdeu1Ei7XH/ACDdRJBUSquVjkOBKAAfmrllTUHdH22WYuni8P8AVKuh+j+raPoHirQptI1i0tdW0nUYgJYLhEmgmjYZHByrAjkEfUHoa+V2+E/xT+Ccj3nwHvB4i8Lhi8vgnXZzmJSckaXfvueEj+GGXKdgRXlXgP4i6r+zneLo+vPPqfwvmkAimJaa40B2OMN1eXTs9OrQ/wC7xX6G2F9Y6nZw6hp08V3aXMaywTwsHjkRhlWRgSGUjkEVvFRqPzPNqrE5bUfI/dPnrwL+0P8AD3xfqH/CMapLP4S8Vx8T+HvESCzvFbOMRlz5c6+jROQ3WuM/bO17w5pX7PfirTtcuUhv9Vto4dGtes898Jo5LfyIx87sHUH5QQO9fR3jb4beBPiTpv8AZPjzQbHXbUfcW8iV2jPrHJw8be6sK8x8E/s0fBT4X67L400TSWS+hiIju9Uu5bxbONcljbm8d1twB1ZcHA6isnCd+WWx62H4jpJpuL5jlPht8NvE3jjUtK+LPxvjP9q2cSN4e8OSfPBpI2AfaJkIxLqMuCzOw/dA7VGcmuD+Lfxu1v4g6xffCz4Lag1rZ2zNb+I/F0PIgPR7PTmziS5IyHlGRH2y1YXxJ+MWtfG+6uPBPwru5tL8DRl7fWPE0O5JtRwcSWumE4ZYT0kueN3IT1PC2z3Fte2fwd+COkW93rccQxAciy0qA8far+RRlRzuCf6yUk4GDSdkrQZtRw7qN4rGO/ZdiF7vRPhlY6Z8PPAGjvqevX5K6Zodmd09xI3L3FxIc7I9x3S3EhHfB5xX1b8EvgEfBWoP8QfiHcw6947vIjG1yoxbabC2c2mnqeVUA4eU/PIRyccV1vwb+Bvh/wCFNlcX73EmteKtWAOsa/dqPtFyw/5ZxjkQ2yn7kKYAGN2TXuBAArSFJLc8fM86dRulReggVVHFNwKdnjFJW/M+581N31Cql9Y2eo2dxp+oQpc2t1E8M8MgDK8bqVdGB4IYEg1bp2MipsnowpzcXdbn5y6VZah8AvHcHwZ1+V5PC2sySTeCNTlOcJ9+TSJW/wCesGSYSfvpgDpX0nomrPbEWt1nyyflJx8uex9s13fxa+Fnhn4veC73wX4kVo47jE1rdwnbNZ3UZ3Q3MDjlJIm5yOoyDwTXx/8ADvxZ4jsdY1D4RfFJUg8aeHUBaYDEOqWR4h1C26ZDgASqPuv1HevCxWF9m+ZbM6MXh1XpuvDdbn1zb3TQTx3EZKvGwZSPUevtXVeN/A/g/wCOPgDUPB/i61W5sdQi2yITh4ZR9ySNuqyRthkYcggV5Vo+rhitlc8sB8j+vsa663urq0ZntZGjLcHacfnWVGuoXjJaGOV5k8HJwlrF9DwX4JfEXxX4C8Xn9nP4x3hudXtI2fwtr0vyrrNjFkeW7H/l9txw69XUbuvX7JX5s57V8ufGH4Zaf8XfDD6VqFzJY6vaTLf6Rq8B23FjfRYMU8TDngjDL/Epwc8Vd/Z9+MuqeM7XUfh/8RYY9O+IfhMrDrFqo2pdRMcRajbD+KC4A3HH3WyDivTwWKUl7NnZU5MQnVpaPqj6XIxTacTkZptd558gooooJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/T/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK5rxd4O8O+OvDl94S8V2EOpaTqURiubaYfKwPQg9VZTyrDlTyK6Wn5FHSxpSm4SU4vVH5g+JND8Q/s+6zF4Q8d3EuseA9Sf7LoXiO4AYwFvlGn6mxGA2G2xTHAccHmtPwT401X9mzUR/rr/AOFl7Luu7OPdLLoMrnm4thyz2DE/vIRny/vLxxX6FeJ/DWheMdCvvDPiaxh1LStShaC6tbhd0ciMOQR6jqCMEHkc1+cniHwxrn7O2t2/hTxXNLq3w71Wb7NoWu3PzvYu4O3T9RY8FdvywTnhh8rc1yzjKDuj7fA5hSxtP2Ffc/QzUPG/hLSfCj+PNT1a0t/DsdqL06k8ii38hhlXD5wwYfdA5YnABPFfBHjXxp4l/aKkaG8W68O/DNHDQ6dITDe60F5Et7ghobQj5lgBDMOZMcCuLuPh34A8JWLarrOoXf8Awi+lznUbPSL+7d9JsJX5aSC14TLMcoCW2sfkAr1PwP8ACDxV8dVi17xyl54a8ASjfbaR80Oo6uhwRJdsPmtbV+0S4kkH3toocpTVh08vw+Abq1He2xxvh228SfFa9Pgz4MRRadoent9k1HxUYlNlZqh2m2sEACXN0AMDb+7i6uTjFfePwx+FfhP4T+HR4e8KW7ASP595e3B8y6vJyPmnuZSN0kjH1wBgAACux0bQ9H0DSbbQdCsYNO06yjEVva20axxRoP4URQAB6+vetgYHFa04cqv1PCzLOJ4l8sdEIPl4NBOaQ9aStTw5abBRRRQQFOBAFNooGmP4avnX9oH4LT/FDRbTXPC90mkeO/DLtd+HdVxwJP4rS4xgta3H3XXPBww6V9ErSMA1TOCnHlZvQrOElJHwX8LviEvj3SrmPULN9H8SaJObDXtHmOJbO8Q4ZegzG/3o36Mte7aNrB3C1vGAY8LIe/sfevNf2h/hP4htdWh+PPwltfN8W6NCI9Y0tPlXW9MTJaBuxuYVBaBzyThfQVU8D+NNB+IXhax8XeHZjNY30e4Bhh43HDxSL1SRHyrKeRj3FfO4jDunKzDHYePL7Wls/wAD35uD7ivn740fDjxBqtxpvxS+F8q2XxD8KBpNOdv9Xf2xGZtOuem6KVRhc/dbBr1DS9Z8rFvdklOgY84+tdfwwBXBB6HqKyg2nocGFrSoT50V/gt8XfD3xm8F2/irRI3tLpXa11PTbj/j4sLyLia2mXj5kY8NjDLgivXgQRkV+f8A8StP1r4F+OJP2ivAFrJdabcKkPjzRLYH/TLROBqUSjg3VqMlu7oMHvX3F4Z8TaJ4t0Cw8SeHLuO90zVLdLq1uIzlZI5BlSP5EdQcivfwuJVVW6o9bEwhNe3p7P8AA3qKKMGuo4AooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCQdKyta0XSvEGm3Gka3aQ39jdxmK4trlFkikQ9VdGBBH1/nitHJpcmk1fc1hVcXzR3Pm3Qf2UPg7oGv2muW9lf3kOnTfadP0m/vZrnTbWYHIkhtJSygp/AGLBP4QDzX0kuc5NGTSZNNKK2RdfF1a1vaSuSUw9aMmkoMWwooooJCiiigAooooAKUc0lFAClTg4P0+tfnp8Y/CFz+zt42uPjF4YgY/D/wATXK/8Jhp8Clhp9052jVoUHSNuFuAOn3q/QvJrO1TTbHWLG40rU7eO7sr6J7e5gmXdHJHICroy9wwJBrGtRjUjZnZh6/K7NaM+Ybee3u7aG7tJUnt50WSKSM7ldGGVZSOoI5Ht71v6bq09kPLb54v7p6j6H+lfMtpp17+zX8QIPhLrk0kvgHxDOx8GapO2TaTMdz6TcOfQnNuxIyvHUV9A5PuK8GpTcJcrOTHYX2UtNmejRXNrqELKNro4IZDg8HggqR+YxivlzwZqZ/Zb+JkPgfUXKfCzx1fM+h3D58rRdXmOXsmY/ctro/NETwrccZNewxySxMHicow6EGqnjLR/D/xF8Kaj4L8aWou9M1OEwysvDoR9yVOm2WNgGRgeCKdGq6clJCwOIdOXJL4Xuv66n1bGdwH9Dmpq+Kf2c/i1rWja3L+zz8WLw3PifR4TLoGrynaNb0xDhJBkD/S4Fwsyckgbuua+1QQRuHQ819BSqxqQ54nXWoeyemz2EbrTaU0lWcr3CiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9X9vKKKK0PycKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACn7RTKfuFBS2POPij8NPDHxZ8Gaj4H8XQebY6gnyypxLbzLzFcQv1SWJ/mUg+3Tivin4eeJfFHhXxNc/A34syA+KdJhM2l6oRiLWtOU4juYzwDMg+WdByCM45r9HTzyK8E+PnwVtfjD4Zgjsro6P4q0Ob+0PDutxAB7S6ToHP8UEvCyocgjnGRXJjMN7SPNHc9ChONSLoVduhyOCv4UmTivH/hX8TbjxeNR8J+L7MaH448My/Zdc0iTgq/OLmDPMltOMMjrkc9q9I8Q6/onhTRbjxD4jvYbDTrSMyTXE7bUVR7nqT0AGcngc14bUlpI8urhKsKns7ang37TtrbL4G0vW9NBi8W6br2mnwtPASJ0v5LmNQiEclJE3CVehUnNfprCZSgFwAJSoMm3ld/8QHsDnFfC/wR8B658WfG1j8e/H1nLp+h6RuHgnRblSkn7wYfVbmM8rLKv+oQj5F54OK+7dwPOK9jL6LhTu+p6lblhSjSk7tA3Wm0pOaSu8857hRRRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//W/byiiitD8nCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAeCKYwLDAJop69KaZcZHjfxL+Bnw9+K9xZal4rsp4tX0xWSx1jTp5LO/t1fBKpcQkMUyM7HDLntXAaH+yf8ADSy1u21/xRea741uLBxLZReJbw3dtBIDxIluFSJnHZnUkV9RMM00cYrN06b1cToWKqxXKmIFAAAAAHAxS9Kkph61p0sjnm23diUUUUiAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P28ooorQ/JwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q==",
                sksj: [{
                    's': '08:00',
                    'e': '08:50'
                }, {
                    's': '08:55',
                    'e': '09:45'
                }, {
                    's': '10:15',
                    'e': '11:05'
                }, {
                    's': '11:10',
                    'e': '12:00'
                }, {
                    's': '14:00',
                    'e': '14:50'
                }, {
                    's': '14:55',
                    'e': '15:45'
                }, {
                    's': '16:15',
                    'e': '17:05'
                }, {
                    's': '17:10',
                    'e': '18:00'
                }, {
                    's': '19:00',
                    'e': '19:50'
                }, {
                    's': '19:55',
                    'e': '20:45'
                }, {
                    's': '20:50',
                    'e': '21:40'
                }, ],
                courseList: [],
                // 存放开学日期
                startDayList: ['2020-09-07', '2021-03-01', '2021-07-19'],

            };
        },
        components: {
            addTips,
            termPicker
        },
        created() {
            // this.init()
        },
        methods: {
            init: function() {
                this.bacimg = wx.getStorageSync('bacimg') ? wx.getStorageSync('bacimg') : this.baseImg

                const courseList = uni.getStorageSync('course_list')
                // const customCourse = uni.getStorageSync('CUSTOM-COURSE')
                if (courseList) {
                    this.courseList = courseList

                    if (!courseList[0]['bg']) {
                        wx.showModal({
                            content: "为适配自定义课程背景，请重新导入课程",
                            showCancel: false,
                        })
                    }
                }

                // 设置开学时间
                let value = wx.getStorageSync('start_day')
                if (!value) {
                    let tempDay = this.startDayList[0].replace("-", "/").replace("-", "/")
                    // console.log(temp_day)
                    uni.setStorageSync('start_day', tempDay + ' 00:00:00')
                    value = tempDay + ' 00:00:00'
                }
                // 计算相差天数判断周数
                // console.log('相差天数：' + this.dateMinus(value))
                let subWeek = parseInt(this.dateMinus(value) / 7) + 1;
                console.log('第' + subWeek + '周')
                // 计算周数
                if (subWeek > 0 && subWeek < 21) {
                    this.tureWeek = subWeek
                    this.weekChange(subWeek - 1)
                } else {
                    this.tureWeek = 1
                    this.weekChange(0)
                }
                // 设置今天周几
                this.getDay()
            },
            xqmClick: function(e) {
                this.xqm = e
            },
            xnmClick: function(e) {
                this.xnm = e
            },
            coYearClick: function(yearArray, termArray) {
                this.yearArray = yearArray
                this.termArray = termArray
            },
            // 获取今天周几
            getDay: function() {
                let date = new Date();
                let day = date.getDay()
                if (day) {
                    this.thisDay = day
                } else {
                    this.thisDay = 7
                }
            },
            // 获取今天距离某天相差天数
            dateMinus: function(whichDay) {
                let sdate = new Date(whichDay);
                let now = new Date();
                let days = now.getTime() - sdate.getTime();
                let day = parseInt(days / (1000 * 60 * 60 * 24));
                return day;
            },
            // 周数变化,设置本周日期
            weekChange: function(index) {
                // console.log(index)
                let value = wx.getStorageSync('start_day')
                let myDate = new Date(value)
                myDate.setDate(myDate.getDate() + index * 7);

                let dayArray = []
                let mon = myDate.getMonth() + 1
                dayArray.push(this.$formatNumber(myDate.getDate()))
                for (let i = 0; i < 6; i++) {
                    myDate.setDate(myDate.getDate() + 1)
                    dayArray.push(this.$formatNumber(myDate.getDate()))
                }

                // console.log(mon, weekday)
                this.weekIndex = index
                this.dayArray = dayArray
                this.month = mon
                this.modalName = null
            },
            // 获取课表
            getCourse: function() {
                this.modalName = null
                const value = uni.getStorageSync('user_info')
                if (value) {
                    let postData = {
                        username: value.username,
                        password: value.password,
                        xnm: this.xnm,
                        xqm: this.xqm,
                    }
                    this.$req("api/study/course/", "post", postData, res => {
                        uni.setStorageSync('course_list', res.data.course_list)
                        // const customCourse = uni.getStorageSync('CUSTOM-COURSE')
                        // if (customCourse) {
                        //     res.data.course_list.push(...customCourse)
                        // }
                        this.courseList = res.data.course_list
                    })
                } else {
                    uni.showModal({
                        content: "请先登录账号",
                        showCancel: false,
                    })
                }

            },
            // 添加课程
            addCourse: function() {
                uni.navigateTo({
                    url: "/pages/course/addcourse/addcourse",
                    fail: res => {
                        console.log(res)
                    }
                })
            },
            // 背景图片设置
            bacChange: function(res) {
                var that = this
                uni.chooseImage({
                    count: 1,
                    success: res => {
                        uni.getFileSystemManager().readFile({
                            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                            encoding: 'base64', //编码格式
                            success: res => { //成功的回调
                                // console.log('data:image/png;base64,' + res.data)
                                var len = ('data:image/png;base64,' + res.data).length
                                // console.log(len)
                                if (len < 1048576) {
                                    this.bacimg = 'data:image/png;base64,' + res.data
                                    this.modalName = null
                                    uni.setStorageSync('bacimg', 'data:image/png;base64,' +
                                        res.data)
                                } else {
                                    uni.showModal({
                                        content: '选择的图片大小超过限制!',
                                        showCancel: false,
                                    })
                                }
                            }
                        })
                    }
                })
            },
            cancelImg() {
                uni.setStorageSync('bacimg', '')
                this.bacimg = this.baseImg
                this.modalName = null
            },
            setStartDay: function() {
                uni.showActionSheet({
                    itemList: this.startDayList,
                    success: res => {
                        let value = this.startDayList[res.tapIndex]
                        value = value.replace('-', '/').replace('-', '/')
                        uni.setStorageSync('start_day', value + ' 00:00:00')
                        this.init()
                    },
                    fail(res) {
                        console.log(res.errMsg)
                    }
                })
            },
            // 显示课程点击详情
            showDetail: function(index) {
                console.log(index)
                const str = '地点：' + this.courseList[index].cdmc + '\n' +
                    '教师：' + this.courseList[index].xm + '\n' +
                    '周次：' + this.courseList[index].zcdd + '\n' +
                    '学分：' + (this.courseList[index].xf ? this.courseList[index].xf : '空')
                uni.showModal({
                    title: this.courseList[index].kcmc,
                    content: str,
                    showCancel: true,
                    confirmText: '删除',
                    success: res => {
                        if (res.confirm) {
                            uni.showModal({
                                content: '是否确认删除？',
                                success: res => {
                                    if (res.confirm) {
                                        let value = uni.getStorageSync('course_list')
                                        value.splice(index, 1)
                                        this.courseList = value
                                        uni.setStorageSync('course_list', value)
                                    }
                                }
                            })
                        }
                    }
                })
            },
            // 自嗨锅推广
            zhgtg: function() {
                uni.navigateToMiniProgram({
                    appId: "wxa41a25c0d8c698ab",
                    path: "/pages/index/index?surl=https%3A%2F%2Fxcx.iyong.com%2F4033542191481152%2Ffastsell%2Fdist%2F4034578369402176.htm"
                })
            }
        },
        computed: {
            style() {
                let StatusBar = this.StatusBar;
                let CustomBar = this.CustomBar;
                let value = StatusBar + CustomBar
                let style = `height:${CustomBar}px;`;
                return style
            },
            marginHeight() {
                let StatusBar = this.StatusBar;
                let CustomBar = this.CustomBar;
                let style = `height:calc(100vh - 100rpx - env(safe-area-inset-bottom) / 2 - ${CustomBar}px - 70rpx);`;
                return style
            }
        },
    }
</script>

<style lang="scss">
    .cu-custom {
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // align-items: ;

        // 顶部左侧打开抽屉
        .cu-left {
            width: 25vw;
            display: flex;
            flex-direction: row;

            position: relative;

            .left-rectangle {
                height: 50rpx;
                width: 80rpx;

                position: absolute;
                bottom: 14rpx;
            }

            .left-round {
                width: 66rpx;
                height: 66rpx;
                border-radius: 50%;

                box-shadow: 0 0 1rpx;

                position: absolute;
                left: 50rpx;
                bottom: 6rpx;

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
        }

        .cu-center {
            width: 50vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            position: relative;

            .week-btn {
                position: absolute;
                bottom: 10rpx;
            }
        }

        .cu-right {
            width: 25vw;
        }
    }

    .course-bg {
        background-size: cover;
        background-position: center center;
    }

    .kcb-item {
        position: absolute;
        justify-content: center;
        display: flex;
        align-items: center;
    }
</style>
