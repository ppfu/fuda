<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.list.l3')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="details">
       <p v-html="$store.state.user_data.reward_plan"></p>
       <h5 v-if="$store.state.user_data.reward_plan == null">{{$t('mine.atte.t4')}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        username: '',
        password: '',
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      goDetail() {
        let that = this;
        that.$router.push({
          path: '/informDetail'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      background: #fff;

      .details {
        padding-top: 0.4rem;
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #263E56;
        p {
          font-size: 0.28rem;
          font-weight: 500;
          color: rgba(103, 103, 103, 1);
          line-height: 0.46rem;
          text-indent: 0.62rem;
        }
        h5{
          text-align: center;
        }

      }
    }
  }
</style>
