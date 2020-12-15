<template>
  <div id="app">
    <router-view v-if="!showView"/>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import tool from "./libs/tool";

  export default {
    name: 'app',
    data() {
      return {
        appid: 'wx8380b7adf80f1db7',
        showView: true
      }
    },
    created() {
      this.getCode()
    },
    methods:{
      async getCode () {
        // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        const code = this.GetUrlParam('code')
        const local = window.location.href
        if (code == null || code === '') {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
          console.log(code)
        } else {
          this.getOpenId(code)
        }
      },
      async getOpenId(code) {
        const { data: res } = await this.$http.post('/cast/openId?code=' + code)
        if(!res.success) return this.$toast.fail('获取用户标识失败')
        const openid = JSON.parse(res.data).openid
        console.log(res)
        console.log(JSON.parse(res.data))
        console.log(openid)
        if(!openid || openid == '' || openid == undefined || openid == null) return window.location.href = 'http://www.hd-bit.com/wx/index.html'
        window.localStorage.setItem('openid', openid)
        this.showView = false

        this.$nextTick(async res => {
          const { data: resFx } = await this.$http.get('cast/share?url=111')
          console.log(resFx)
          if(!resFx.success) return this.$toast.fail('设置指定分享错误')

          let jsapi_ticket = resFx.data.jsapi_ticket
          let noncestr = tool.randomString(16).toString()
          let timestamp = new Date().getTime().toString()
          let url = location.href.split('#')[0]
          let ticket = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
          console.log(ticket)

          wx.config({
            debug: false,
            appId: this.appid,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: tool.sha1(ticket),
            jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData']
          });
          const shareConfig = {
            title: '榆林市十大科技扶贫带头人评选',
            desc: '为表彰在我市脱贫攻坚中涌现出的先进典型，进一步发挥科技致富带头人引领和示范作用，鼓舞干部群众士气，凝聚决战决胜脱贫攻坚强大的正能量。',
            link: 'http://www.hd-bit.com/wx/index.html',
            imgUrl: 'http://www.hd-bit.com/wx/top.png'
          };
          wx.ready(function () {
            wx.updateAppMessageShareData(shareConfig);
            wx.updateTimelineShareData(shareConfig);
          })
          wx.error(function (res) {
            console.log(res.errMsg);
          });
        })
      },
      // 转换
      GetUrlParam(name){
        //获取url 参数
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
      },
    }
  }
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
body{
  background-color: #f2f2f2;
}
#app {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2b2b2b;
}
a{
  text-decoration: none;
  color: #2b2b2b;
}
li{
  list-style: none;
}
</style>
