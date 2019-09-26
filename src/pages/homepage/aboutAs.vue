<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.list.l7')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="details">
        <div class="de_text" v-html="$store.state.user_data.about_us"></div>
        <h5 v-if="$store.state.user_data.about_us == null">{{$t('mine.atte.t4')}}</h5>
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
      overflow-y: scroll;
      .details {
        padding: 0.4rem 0;
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #263E56;
        margin-bottom: 1rem;
        .de_text {
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
