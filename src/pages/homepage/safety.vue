<template>
  <div class="public">
    <van-nav-bar title="安全中心" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-cell title="手机" is-link value="18137888122" @click="goPhone" />
        <van-cell title="邮箱" is-link value="jiaochenglong91@gmail.com" @click="goMail" />
        <van-cell title="支付密码" is-link @click="goPass" />
        <van-button type="primary" size="large" @click="login">确定</van-button>
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
        showAuto: true,
        showAss: false
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      login() {
        let that = this;
        that.$router.push({
          path: '/home'
        })
      },
      goPhone() {
        let that = this;
        that.$router.push({
          path: '/phone'
        })
      },
      goMail() {
        let that = this;
        that.$router.push({
          path: '/mailbox'
        })
      },
      goPass() {
        let that = this;
        that.$router.push({
          path: '/password'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar {
      height: 0.8rem;
      line-height: 0.8rem;
    }

    .van-nav-bar__title {
      font-size: 0.30rem;
      font-weight: bold;
      color: #1E2140;
    }

    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }

    .content {
      .login_info {
        width: 100%;
        margin-top: 0.8rem;
        .van-cell {
          padding: 0.48rem 0 0.04rem 0;
          font-size: 0.28rem;
          font-weight: 400;
        }
        .van-hairline--top-bottom::after {
          border-width: 0;
        }
        .van-cell:not(:last-child)::after {
          display: none;
        }
        .van-button--large {
          height: 0.74rem;
          line-height: 0.74rem;
          margin-top: 1.6rem;
        }
       .van-button--primary {
          background-color: #207DE7;
          border: 1px solid #207DE7;
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
