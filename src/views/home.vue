<template>
  <div class="home">
    <div class="jiazai" v-if="showBox">
      <van-loading type="spinner" color="#1989fa"/>
      <van-empty image="network" description="正在加载数据..."/>
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/paihang">排行榜</van-tabbar-item>
      <van-tabbar-item icon="warning-o" replace to="/shuoming">活动说明</van-tabbar-item>
    </van-tabbar>

    <div v-if="!showBox">
      <div class="banner">
        <img src="@/assets/images/top.jpg" alt="">
      </div>

      <div class="info">
        <div class="info_top">
          <div class="item" style="border-bottom: 1px solid #f2f2f2;">
            <span>截止目前参与投票总人数</span>
            <p>{{pepNum}}人</p>
          </div>
          <div class="item">
            <span>截止目前累计投票总数</span>
            <p>{{touNum}}票</p>
          </div>
        </div>
        <div class="info_bottom">
          <span v-if="hdTimeA<0">投票已结束</span>
          <van-count-down v-if="hdTimeA>0"  :time="hdTimeA" format="投票倒计时:DD 天 HH 时 mm 分 ss 秒" />
        </div>
      </div>

      <div class="search">
        <input v-model="searchVal" type="text" placeholder="请输入名字或编号或单位搜索">
        <button @click="submitSearch"><van-icon name="search" /></button>
      </div>

      <div class="pep_box" v-if="pepList.length != 0">
        <van-sticky>
          <div class="title">
            <span>投票规则：每人每天一次投票机会，投票需最少3人，最多10人！点击照片查看个人详细信息！</span>
          </div>
        </van-sticky>
        <van-checkbox-group v-model="result" class="picbox">
          <div class="pep_item" v-for="(item, index) in pepList" :key="index">
            <i>{{item.number}}</i>
            <img :src="'http://www.hd-bit.com/wx' + item.vpic" :alt="item.vname" @click="goInfo(item.vid)">
            <div class="name text_over">{{item.vname}}</div>
            <div class="ingo">

              <van-checkbox :disabled="showSubmit" :name="item.vid" @click="yanzheng(item.vusefu, item.vname)"></van-checkbox>

              <p>{{item.vcount}}票</p>
            </div>
          </div>
        </van-checkbox-group>
      </div>
    </div> 

    <div class="submitBox" v-if="!showSubmit">
      <div class="txt">
        已选: <span>{{selectNum}}人 </span>
        <i>注:一天只有一次投票机会</i>
      </div>
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"  @click="submitToupiao()" :loading="loading" loading-text="提交中...">投票</van-button>
    </div>
    
    <div class="height50"></div>
     
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      checked: true,
      active: 0,
      openid: '',
      searchVal: '',
      pepList: [],
      pepNum: '',
      touNum: '',
      result: [],
      selectNum: 0,
      loading: false,
      showSubmit: true,
      showBox: true
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData() {
      const { data: res } = await this.$http.post('/voters/statistical')
      if(!res.success) return this.$toast.fail(res.errMsg)
      this.pepNum = res.data.number
      this.touNum = res.data.count
      console.log(res)
      let openid = window.localStorage.getItem("openid")
      console.log(openid)
      const { data: resa } = await this.$http.get('voters/list?openId=' + openid)
      console.log(resa)
      if(!resa.success) return this.$toast.fail(resa.errMsg);
      this.pepList = resa.data
      let arr = this.pepList.filter(item => {
        return item.vusefu == 1
      })
      console.log(arr)

      // 判断今日是否投票
      this.showSubmit = arr.length > 0
      console.log(this.showSubmit)

      // 判断今日已投人
      if(arr.length > 0){
        for(var i in arr) {
          this.result.push(arr[i].vid)
        }      
      }
      console.log(this.result)

      //数据请求结束展示列表 
      this.showBox = false
    },
    async submitSearch() {
      const { data: res } = await this.$http.post('/voters/list/condition', {
        message: this.searchVal
      })
      if(!res.success) return this.$toast.fail(res.errMsg)
      if(res.data.length ==0) return this.$toast.fail('不存在')
      this.pepList = res.data
    },
    yanzheng(vusefu, name) {
      this.selectNum = this.result.length
      if(this.showSubmit == true) this.$toast.fail('今天已经给投过票了,请明天再来!')
    },
    async submitToupiao() {
      if(this.hdTime == 1){
        return this.$dialog.alert({ message: '投票还未开始,请在2020年9月16日 00:00参与投票' })
      }else if(this.hdTime == 3){
        return this.$dialog.alert({ message: '投票已结束' })
      }else if(this.hdTime == 2){
        let openid = window.localStorage.getItem("openid")
        if(this.result.length <= 0) return this.$toast.fail('请选择后再投票')
        if(this.result.length < 3) return this.$toast.fail('请选择最少3个人投票才有效')
        if(this.result.length > 10) return this.$toast.fail('每人每天只有10张票,最多选择10人')
        console.log()
        this.loading = true
        const { data: res } = await this.$http.post('/cast/cast', {
          idList: this.result,
          openId: openid
        })
        console.log(res)
        if(!res.success) return this.$toast.fail(res.errMsg)
        this.$dialog.alert({
          message: res.errMsg,
        });
        this.loading = false
        this.getData()
      }
    },
    goInfo(id) {
      this.$router.push({ name: 'pepinfo', params: { id: id }})  
    }
  },
  computed:{
    hdTime() {
      let nowTime = Date.parse(new Date())
      let startTime = new Date(String('2020-09-16 00:00:00').replace(/\-/g, '/')).getTime()
      let endTime = new Date(String('2020-09-21 23:59:00').replace(/\-/g, '/')).getTime()
      if(nowTime < startTime){
        return 1
      }else if(nowTime > startTime && nowTime<endTime){
        return 2
      }else if(nowTime>endTime){
        return 3
      }
    },
    hdTimeA() {
      let startTime = Date.parse(new Date())
      let endTime = new Date(String('2020-09-21 23:59:00').replace(/\-/g, '/')).getTime()
      return endTime-startTime
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  padding: 10px;
  .info_top{
    padding: 0 8px;
    background-color: #fff;
    border-radius: 4px;
    .item{
      display: flex;
      justify-content: space-between;
      width: 100%;
      line-height: 50px;
      p{
        color: #046b9e;
      }
    }
  }
  .info_bottom{
    border-top: 1px solid #f2f2f2;
    text-align: center;
    background-color: #fff;
    color:crimson;
    line-height: 30px;
    .van-count-down{
      color:crimson;
      line-height: 30px;
    }
  }
}

.search{
  position: relative;
  padding: 0 10px;
  input{
    box-sizing: border-box;
    width: 100%;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #63BEEB;
    padding: 4px 80px 4px 8px;
  }
  button{
    position: absolute;
    width: 60px;
    right: 10px;
    height: 38px;
    line-height: 47px;
    color: #fff;
    background-color: #63BEEB;
    border: 0;
    border-radius: 4px;
    font-size: 24px;
  }
}

.pep_box{
  box-sizing: border-box;
  padding: 8px;
  .title{
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    color: #999;
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: #ee0a24;
    span{
      padding: 10px;
    }
  }
  .picbox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .pep_item{
      width: 48%;
      position: relative;
      margin-bottom: 10px;
      background: url('~@/assets/images/itembg.png') no-repeat;
      padding-bottom: 20px;
      background-size: 100% 100%;
      i{
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        width: 30px;
        height: 40px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        font-style: normal;
        background: url('~@/assets/images/item_icon.png') no-repeat;
        background-size: 100% 100%;
        z-index: 0;
      }
      img{
        display: block;
        width: 100%;
        height: 220px;
      }
      .name{
        padding: 6px 8px;
        text-align: center;
      }
      .ingo{
        width: 80%;
        height: 36px;
        border: 1px solid #72C0E6;
        border-radius: 4px;
        margin: 0 auto;
        display: flex;
        .van-checkbox{
          border-right: 1px solid #72C0E6;
          padding: 0 10px;
        }
        p{
          flex: 1;
          text-align: center;
          line-height: 36px;
          color: #72C0E6;
        }
      }
    }
  }
}

.submitBox{
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  right: 0;
  bottom: 50px;
  background-color: #fff;
  box-shadow: 0px 0px 10px #78ecff;
  .txt{
    line-height: 50px;
    padding: 0 10px;
    span{
      color: #ee0a24;
      font-weight: bold;
    }
    i{
      font-size: 14px;
      font-style: normal;
      color: #ee0a24;
    }
  }
  button{
    margin:5px 5px;
    min-width: 100px;
    padding: 0 10px;
    height: 40px;
    border: 0;
    color: #fff;
    border-radius: 4px;
  }
}

</style>
