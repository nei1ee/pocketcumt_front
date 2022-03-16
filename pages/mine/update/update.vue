<template>
    <view>
        <cu-custom bgColor="bg-blue-11" :isBack="true">
            <view slot="backText">
                返回
            </view>
            <view slot="content">
                更新日志
            </view>
        </cu-custom>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">更新日志</text>
            </view>
        </view>
        <view class="cu-timeline">
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.6.9</view>
                        <view class="cu-tag line-blue">2020/08/30</view>
                    </view>
                    <view class="margin-top">
                        <view>1、更新架构；</view>
                        <view>2、优化使用体验；</view>
                        <view>3、修复课表展示不全问题；</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.6.3</view>
                        <view class="cu-tag line-blue">2020/03/30</view>
                    </view>
                    <view class="margin-top">
                        <view>1、增加教职工登陆；</view>
                        <view>2、优化部分逻辑；</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.6.0</view>
                        <view class="cu-tag line-blue">2020/01/24</view>
                    </view>
                    <view class="margin-top">
                        <view>1、更改登录方式为统一认证；</view>
                        <view>2、增加部分用户提示；</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.5.1</view>
                        <view class="cu-tag line-blue">2019/12/02</view>
                    </view>
                    <view class="margin-top">
                        <view>1、配色统一化，图标替换；</view>
                        <view>2、课表布局略微修改；</view>
                        <view>3、由于审核原因暂时下线失物招领功能</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.4.0</view>
                        <view class="cu-tag line-blue">2019/08/01</view>
                    </view>
                    <view class="margin-top">
                        <view>1、UI大更新，部分框架重构；</view>
                        <view>2、修复非一学期成绩无法查询详细分数BUG，并优化加权计算功能；</view>
                        <view>3、增加毕业去向、校园地图、失物招领等功能</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.3.7</view>
                        <view class="cu-tag line-blue">2019/06/08</view>
                    </view>
                    <view class="margin-top">
                        <view>1、增加实时校车、资助金功能；</view>
                        <view>2、后台代码优化；</view>
                        <view>3、部分细节进行了修改。</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.2.9</view>
                        <view class="cu-tag line-blue">2019/03/03</view>
                    </view>
                    <view class="margin-top">
                        <view>1、增加课表增删功能；</view>
                        <view>2、增加青创工作室预约下单入口；</view>
                        <view>3、修改自习室查询范围为三天内；</view>
                        <view>4、添加图书检索-馆藏功能。</view>
                    </view>
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="content">
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">V1.2.1</view>
                        <view class="cu-tag line-blue">2019/01/24</view>
                    </view>
                    <view class="margin-top">
                        <view>1、小程序正式上线；</view>
                        <view>2、拥有课表、成绩等多种功能；</view>
                        <view>3、电费、教师便利功能。</view>
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

            };
        }
    }
</script>

<style lang="scss">

</style>
