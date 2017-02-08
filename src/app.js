/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')

/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')

/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('./utils/baidu.js')

var fundebug = require('./utils/fundebug.0.0.3.min.js')
fundebug.apikey = '119099002d0bf7f245693ff4b164c66a4c57663ac72602245c23b2ce2da20147'

App(
{
    /**
     * Global shared
     * 可以定义任何成员，用于在整个应用中共享
     */
    data:
    {
        name: 'Douban Movie',
        version: '0.1.0',
        currentCity: '北京'
    },

    /**
     * WeChat API
     */
    wechat: wechat,

    /**
     * Douban API
     */
    douban: douban,

    /**
     * Baidu API
     */
    baidu: baidu,

    /**
     * 生命周期函数--监听小程序初始化
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch()
    {
        // throw new Error('error 01a');

        wechat
            .getLocation()
            .then(res =>
            {
                const
                {
                    latitude,
                    longitude
                } = res
                return baidu.getCityName(latitude, longitude)
            })
            .then(name =>
            {
                this.date.currentCity = name.replace('市', '')
                console.log(`currentCity : ${this.data.currentCity}`)
            })
            .catch(err =>
            {
                this.data.currentCity = '北京'
                console.error(err)
                console.log("name: " +  err.name)
                console.log("message: " + err.message)
                console.log("stack: "  + err.stack)
                console.log("line: " + err.line)
                console.log("column: " + err.column)
                
                

                for (var property in err)
                {
                    if (err.hasOwnProperty(property))
                    {
                        console.log(property)
                    }
                }
            })


        console.log(' ========== Application is launched ========== ')
    },
    /**
     * 生命周期函数--监听小程序显示
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow()
    {
        // Error 01a:
        // throw new Error('error 01a');
        console.log(' ========== Application is showed ========== ')
    },
    /**
     * 生命周期函数--监听小程序隐藏
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide()
    {
        console.log(' ========== Application is hid ========== ')
    }
})
