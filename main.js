import Vue from 'vue'
import App from './App'
import store from './store'

import course from './pages/course/course.vue'
Vue.component('course', course)

import home from './pages/home/home.vue'
Vue.component('home', home)

import mine from './pages/mine/mine.vue'
Vue.component('mine', mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

Vue.prototype.$store = store

import {
    req,
    formatNumber
} from "utils/util.js"
Vue.prototype.$req = req
Vue.prototype.$formatNumber = formatNumber

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
