<template>
  <div class="paihang">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/paihang">排行榜</van-tabbar-item>
      <van-tabbar-item icon="warning-o" replace to="/shuoming">评选说明</van-tabbar-item>
    </van-tabbar>

    <div class="jiazai" v-if="showbox">
      <van-loading type="spinner" color="#1989fa"/>
      <van-empty image="network" description="正在加载数据..."/>
    </div>

    <div v-if="!showbox">
      <img src="@/assets/images/title.png" class="titleimg">

      <div class="infobox">
        <p v-if="hdTime>0">距离投票结束还有</p>
        <span v-if="hdTime<0">投票已结束</span>
        <van-count-down v-if="hdTime>0" :time="hdTime" format="DD 天 HH 时 mm 分 ss 秒" />
      </div>

      <div class="first_box">
        <div class="first_con" v-if="paihanglist.length!=0">
          <div class="first_item">
            <div class="pepbox">
              <img :src="'http://www.hd-bit.com/wx' + paihanglist[1].vpic">
            </div>
            <p>{{paihanglist[1].vname}}</p>
            <span>{{paihanglist[1].vcount}}票</span>
          </div>
          <div class="first_item">
            <div class="pepbox">
              <img :src="'http://www.hd-bit.com/wx' + paihanglist[0].vpic">
            </div>
            <p>{{paihanglist[0].vname}}</p>
            <span>{{paihanglist[0].vcount}}票</span>
          </div>
          <div class="first_item">
            <div class="pepbox">
              <img :src="'http://www.hd-bit.com/wx' + paihanglist[2].vpic">
            </div>
            <p>{{paihanglist[2].vname}}</p>
            <span>{{paihanglist[2].vcount}}票</span>
          </div>
        </div>
        <img src="@/assets/images/paihang.png" class="bottom_paihang">
      </div>

      <div class="second_box">
        <div class="title">十大科技扶贫带头人评选排行榜</div>
        <div class="second_con">
          <div class="second_item" v-for="(item, index) in pepList" :key="index">
            <div class="num">{{index+4}}</div>
            <div class="con">
              <div class="pic">
                <img :src="'http://www.hd-bit.com/wx' + item.vpic">
              </div>
              <div class="js text_over2">
                {{item.vname}}
              </div>
              <div class="piaoshu">
                {{item.vcount}}票
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="height50"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paihang',
  data() {
    return {
      active: 1,
      paihanglist: [],
      pepList: [],
      showbox: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('/voters/list/order')
      if(!res.success) return this.$toast.fail(res.errMsg)
      this.pepList = res.data.slice(3)
      this.paihanglist = res.data.slice(0,3)
      this.showbox = false
    },
  },
  computed:{
    hdTime() {
      let startTime = Date.parse(new Date())
      let endTime = new Date(String('2020-09-21 23:59:00').replace(/\-/g, '/')).getTime()
      return endTime-startTime
    }
  }
}
</script>

<style lang="scss" scoped>
.paihang{
  width: 100%;
  position: absolute;
  background-color: #2A7AE9;
}
.titleimg{
  display: block;
  width: 210px;
  margin: 20px auto;
}
.infobox{
  background-color: #f7f7f7;
  width: 280px;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  padding: 4px 0;
  color: #f92626;
  .van-count-down{
    color: #f92626;
  }
}

.first_box{
  position: relative;
  margin-top: 16px;
  padding: 0 36px;
  height: 200px;
  overflow: hidden;
  .first_con{
    display: flex;
    .first_item{
      width: 33.33%;
      z-index: 1;
      text-align: center;
      color: #fff;
      p{
        padding: 4px 0 6px;
      }
      .pepbox{
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
    }
    .first_item:nth-child(1) .pepbox{
      margin-top: 18px;
      width: 60px;
      height: 60px;
    }
    .first_item:nth-child(2) .pepbox{
      width: 70px;
      height: 70px;
    }
    .first_item:nth-child(3) .pepbox{
      margin-top: 34px;
      width: 50px;
      height: 50px;
    }
  }
  .bottom_paihang{
    width: 303px;
    position: absolute;
    bottom: -60px;
    z-index: 0;
  }
}

.second_box{
  width: 345px;
  height: auto;
  margin:  0 auto;
  border-radius: 10px;
  background-color: #fff;
  .title{
    width: 355px;
    margin-left: -5px;
    height: 40px;
    line-height: 40px;
    background-color: #1A91FF;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: -1px 5px 0.26667rem #84b3f3;
    text-align: center;
    color: #fff;
    z-index: 999;
  }
  .second_con{
    width: 345px;
    margin: 10px auto;
    z-index: 0;
    .second_item{
      padding: 15px 0;
      display: flex;
      align-items: center;
      .num{
        width: 50px;
        text-align: center;
        font-size: 20px;
      }
      .con{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        .pic{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          img{
            width: 40px;
          }
        }
        .js{
          width: 130px;
          margin-right: 20px;
          font-size: 14px;
        }
        .piaoshu{
          width: 80px;
          text-align: center;
          color: #f92626;
          font-size: 18px;
        }
      }
      
    }
  }
}
.height50{
  height: 70px;
}
</style>
