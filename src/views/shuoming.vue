<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/paihang">排行榜</van-tabbar-item>
      <van-tabbar-item icon="warning-o" replace to="/shuoming">活动说明</van-tabbar-item>
    </van-tabbar>

    <div class="banner">
      <img src="@/assets/images/top.jpg" alt="">
    </div>

    <div class="title">
      <p>活动说明</p>
    </div>

    <div class="con">
      <dl>
        <dt>
          <p>活动简介</p>
        </dt>
        <dd>
          <p>为表彰在我市脱贫攻坚中涌现出的先进典型，进一步发挥科技致富带头人引领和示范作用，鼓舞干部群众士气，凝聚决战决胜脱贫攻坚强大的正能量。市科技局决定在全市范围内组织开展“榆林市十大科技扶贫带头人”评选活动，选树十名带领群众增收致富、促进贫困村产业发展的优秀创业致富带头人，激励广大科技工作者和贫困群众以先进典型为榜样，以更加积极和饱满的工作激情投入乡村振兴事业之中。获奖人员将于第27届杨凌农高会期间进行宣传报道并予以表彰。活动总分为100分，分为专家评审打分（占总成绩70%）和网络展示投票（占总成绩30%）两部分，最终根据综合得分，选出榆林市十大科技扶贫带头人。</p>
          <p>欢迎大家积极参与，评出最佳人选。</p>
        </dd>
        <dt>
          <p>投票时间</p>
        </dt>
        <dd>
          <p>2020年9月16日00:00-2020年9月21日23:59</p>
        </dd>
        <dt>
          <p>主办单位</p>
        </dt>
        <dd>
          <p>榆林市科学技术局</p>
        </dd>
        <dt>
          <p>投票须知</p>
        </dt>
        <dd>
          <p>选择你支持的优秀带头人，点下“投票”按钮，即可参与本次活动。每人每天10张票，不能投票给同一人，最少投票给3人，否则无效。<span>注:一天只有一次投票机会。</span>（优秀事迹可以在投票界面点击查看）</p>
          
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shuoming',
  data() {
    return {
      active: 2
    }
  },
  created() {
    
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 10px;
  text-align: center;
  p{
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    -webkit-text-stroke: 1px #6F3D40;
    text-shadow: 0px 0px 10px #f9f1bc;
  }
}
.con{
  padding: 10px 10px 50px 10px;
  color: #6F3D40;
  dl{
    dt{
      p{
        width: 110px;
        height: 36px;
        background: url('~@/assets/images/jstitle.png') no-repeat;
        background-size: 100% 100%;
        line-height: 36px;
        text-indent: 1em;
      }
    }
    dd{
      font-size: 14px;
      padding: 8px 0 16px 0;
      p{
        line-height: 36px;
      }
      span{
        color: #ee0a24;
      }
    }
  }
}
</style>
