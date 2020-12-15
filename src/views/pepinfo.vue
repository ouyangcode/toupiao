<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="info" v-if="info.vname">
      <div class="top">
        <div class="img" v-if="info.vpic">
          <img :src="'http://www.hd-bit.com/wx' + info.vpic" :alt="info.vname">
        </div>
        <div class="jc">
          <div><p>姓名:</p><span>{{info.vname}}</span></div> 
          <div><p>编号:</p><span class="blue">{{info.number}}</span></div>
          <div><p>投票数:</p><span class="red">{{info.vcount}}</span></div>
          <div><p>职位:</p><span>{{info.vjob}}</span></div>
        </div>
      </div>
      <div class="item">
        <div><span>派出单位:</span><p>{{info.vunit}}</p></div>
        <div><span>服务产业:</span><p>{{info.vindustry}}</p></div>
        <div><span>特派员类型:</span><p>{{info.vtype}}</p></div>
        <div><span>联系电话:</span><p>{{info.vphonenumber}}</p></div>
        <div><span>所属区县:</span><p>{{info.vdistrict}}</p></div>
        <div><span class="jj">简介:</span><p>{{info.vdescription}}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pepinfo',
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { data: res } = await this.$http.get('/voters/' + this.$route.params.id)
      if(!res.success) return this.$toast.fail(res.errMsg)
      this.info = res.data
      console.log(res)
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  .top{
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .img{
      width: 40%;
      img{
        width: 100%;
      }
    }
    .jc{
      width: 56%;
      div{
        padding: 10px 0;
        border-bottom: 1px solid #f3f3f3;
        display: flex;
        justify-content: space-between;
        .red{
          display: inline-block;
          padding: 0 10px;
          border: 1px solid rgb(228, 52, 52);
          color: rgb(228, 52, 52);
          border-radius: 2px;
        }
        .blue{
          display: inline-block;
          padding: 0 10px;
          border: 1px solid rgb(25, 92, 218);
          color: rgb(25, 92, 218);
          border-radius: 2px;
        }
      }
    }
  }
  .item{
    margin-top: 6px;
    background-color: #fff;
    padding: 10px;
    div{
      padding: 4px 0;
      border-bottom: 1px solid #f3f3f3;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      p{
        line-height: 28px;
      }
      .jj{
        display: block;
        width: 100%;
        font-size: 20px;
        padding-bottom: 10px;
        color: cornflowerblue;
        text-align: center;
      }
    }
  }
}
</style>
