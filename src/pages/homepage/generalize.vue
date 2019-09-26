<template>
  <div class="public">
    <div class="poster">
      <a class="iconfont icon-tabfanhui" @click="back"></a>
      <p>{{$t('gen.g1')}}</p>
      <img class="big-img" src="../../assets/img/tuiguang-bg.jpg" />
      <div id="qrCode">
       <img src="../../assets/img/app_do.png" />
      </div>
      <div class="user_code">
      推荐人ID:
      <span v-clipboard:copy="user_code" v-clipboard:success="onCopy" v-clipboard:error="onError">{{user_code}}</span>
      </div>
      <h4>{{$t('gen.g3')}}</h4>
    </div>
  </div>
</template>

<script>
   import QRCode from 'qrcodejs2';
  import {
    XDialog
  } from "vux";
  export default {
     name: "qrCode",
    data() {
      return {
        active: 0,
        user_code:this.$store.state.user_data.user_code,
        share_link:this.$store.state.user_data.share_link
      }
    },
    components: {
      XDialog,
    },
     mounted: function () {
      // this.$nextTick(function () {
      //   this.bindQRCode();
      // })
    },
    methods: {
      back() {
        this.$router.back();
      },
      //  bindQRCode: function () {
      //   new QRCode('qrCode', {
      //     text: this.share_link,
      //     width: 110,
      //     height: 110,
      //     colorDark: "#333333", //二维码颜色
      //     colorLight: "#ffffff", //二维码背景色
      //     correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      //   })
      // },
       //复制失败
      onError() {
        // 移动端走的失败
        that.$toast.success("复制成功");
      },
      //复制成功
      onCopy() {
        // web走的成功
        let that = this;
        that.$toast.success("复制成功");
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar {
      background: none !important;
    }

    .van-hairline--bottom::after {
      border: none !important;
    }

    .poster {
      width: 100%;
      height: 100%;
      border-radius: 0rem;
      position: relative;
      a{
        position: absolute;
        display: block;
        height: 0.8rem;
        width: 100%;
        line-height: 0.8rem;
        padding-left: 0.26rem;
        color: #fff;

        }
      p {
        width: 5.66rem;
        height: 1.55rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.2rem;
        margin-left: -2.8rem;
        font-size: 0.28rem;
        font-family: YouYuan;
        font-weight: 400;
        color: rgba(255, 241, 9, 1);
        line-height: 0.4rem;
      }

      img.big-img {
        width: 100%;
        height: 100%;
        display: block;
      }

       #qrCode {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1.2rem;
        margin-top: 0.1rem;
        padding: 0.1rem;
        background: #fff;
        img{
         width: 100%;
         height: 100%;
        }
      }

      .user_code {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1.9rem;
        margin-top: 2.8rem;
        width: 3.8rem;
        height: 0.66rem;
        font-size: 0.3rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(0deg, rgba(254, 173, 39, 1) 0%, rgba(255, 218, 101, 1) 100%);
        box-shadow: 0rem 0rem 0rem 0rem rgba(139, 98, 29, 0.56);
        border-radius: 2rem;
        text-align: center;
        line-height: 0.66rem;
      }
      h4 {
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: 3.8rem;
        text-align: center;
        font-size: 0.3rem;
        font-family: SimSun;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>
