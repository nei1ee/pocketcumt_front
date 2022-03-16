import {
    hex_hmac_md5
} from "@/utils/md5.js"
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime1 = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()

    return [hour, minute].map(formatNumber).join(':')
}
const formatTime2 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

const formatTime22 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('/')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

let rootUrl = 'http://127.0.0.1:8000/';

function getToken() {
    var date = new Date()
    var timestamp = date.getTime().toString()
    var token = hex_hmac_md5('xxxxxx', timestamp)
    return {
        'timestamp': timestamp,
        'token': token,
    }
}

function req(url, method, data, su, fa) {
    uni.showLoading({
        title: '请稍后',
    })
    var tokens = getToken()
    data['timestamp'] = tokens.timestamp
    uni.request({
        url: rootUrl + url,
        data: data,
        method: method,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': tokens.token,
        },
        success: function(res) {
            console.log(res.data)
            if (res.statusCode < 399)
                return typeof su == "function" && su(res.data);
            else {
                return typeof fa == "function" && fa(res.data)
            }
        },
        fail: function(error) {
            return typeof fa == "function" && fa(error)
        },
        complete() {
            uni.hideLoading()
        }
    })
}
export {
    req,
    rootUrl,
    formatTime,
    formatTime1,
    formatTime2,
    formatTime22,
    formatNumber,
}
