<template>
  <div class="public">
    <van-nav-bar :title="$t('index.society.s5')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field type="text" :label="$t('safecenter.t1')" v-model="phone" maxlength="11" required clearable :placeholder="$t('phone.phr.p1')" />
    <!--    <div class="pu_pwd">
          <van-field type="text" :label="$t('email.label.l2')" v-model="verify_code" maxlength="4" :placeholder="$t('phone.phr.p2')"
            required />
          <a class="code" @click="changeImgCode">
            <img :src="imgCode" style="width: 100%;height: 100%;cursor: pointer;" />
          </a>
        </div> -->
        <div class="pu_pwd">
          <van-field type="text" :label="$t('withdraw.wlt.total')" v-model="amount" :placeholder="$t('withdraw.detail.l1')"
            required />
          <a>{{$t('withdraw.detail.l2')}}：{{withInfo.fee}}$</a>
        </div>
      </div>
      <h4>{{$t('withtip.w1')}}:{{$t('withtip.w2')}}{{$t('withtip.w3')}}{{withInfo.min_amount}}{{$t('withtip.w7')}},
      {{$t('withtip.w4')}}{{withInfo.max_amount}}{{$t('withtip.w7')}},{{$t('withtip.w5')}}{{withInfo.fee}}
      {{$t('withtip.w7')}}{{$t('withtip.w6')}},{{$t('withtip.w8')}}.
      </h4>
      <van-button type="primary" size="large" @click="withdraw">{{$t('cfm')}}</van-button>
    </div>
    <!-- 选择语言弹窗 -->
    <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>{{$t('withdraw.detail.l3')}}</h3>
        <div class="dia_btn">
          <span @click="closeDia">{{$t('cel')}}</span>
          <span>{{$t('cfm')}}</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {

    data() {
      return {
        show: false,
        verify_dlg: false,
        verify_code: '', //验证码
        phone: '', //手机号
        amount: '', //金额
        codeMsg: this.$t('reg.label2'),
        time: 60,
        imgCode:"http://fd.qilinpz.com/captcha.html",
        withInfo:{},
      }
    },
    // inject: ['reload'], //注入reload方法
    components: {
      XDialog,
    },
      mounted: function() {
      let that = this;
     that.getCashOutInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      // changeImgCode() {
      //    let that = this;
      //
      // },
        //获取提现
     getCashOutInfo() {
       let that = this;
       that
         .$http({
           url: "Account/getCashOutInfo",
           method: "post",
           data: {
             token: window.localStorage.getItem("token"),
           }
         })
         .then(function(res) {
           if (res.data.code == 1) {
             that.withInfo = res.data.data;
           } else {
             that.$toast(res.data.msg);
           }
         })
         .catch(function(error) {

         });
     },
      //提现
      withdraw() {
        let that = this;
        let phone = that.phone;
        let amount = that.amount;
        if (!phone || phone == null) {
          that.$toast(that.$t("reg.input1"));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast(that.$t("tip.phone_error"));
        }  else if (!amount || amount == null) {
          that.$toast(that.$t('withdraw.detail.l1'));
        } else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("Account/getUserCashOut", {
              token: window.localStorage.getItem("token"),
              phone: phone,
              amount: amount
            })
            .then(function(res) {
              that.$toast.clear();
              let code = res.data.code;
              if (code == 1) {
                that.$toast.success(that.$t("suc"));
                that.$router.back(-1);
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {
              phone = "";
              verify_code = "";
              amount = "";
            });
        }
      },
      //	发送验证码
      // sendVerifyCode() {
      //   let that = this;
      //   var phone = that.phone;
      //   var verify_code = that.verify_code;
      //   if (!phone || phone == null) {
      //     that.$toast(that.$t("reg.input1"));
      //   } else if (
      //     phone.trim().length != 11 ||
      //     !/^[1]([3-9])[0-9]{9}$/.test(phone)
      //   ) {
      //     that.$toast(that.$t("tip.phone_error"));
      //   } else {
      //     if (that.codeMsg != that.$t('reg.label2') && that.codeMsg != that.$t('resend')) return;
      //     var time = that.time;
      //     console.log(time)
      //     that.$http
      //       .post("User/sendSmsVerify", {
      //         phone: phone,
      //         type: 3
      //       })
      //       .then(function(res) {
      //         // console.log(res.data.code)
      //         if (res.data.code == 1) {
      //           that.$toast.success(that.$t("code1"));
      //           verify_code = res.data.data;
      //           var interval = setInterval(function() {
      //             time--;
      //             that.codeMsg = time + "s";
      //             if (time <= 0) {
      //               clearInterval(interval);
      //               that.codeMsg = that.$t('resend');
      //             }
      //           }, 1000);
      //         } else {
      //           that.$toast(res.data.msg);
      //         }
      //       })
      //       .catch(function(err) {});
      //   }
      // },
      closeDia() {
        let that = this;
        that.verify_dlg = false;
      },
      login() {
        let that = this;
        that.$router.push({
          path: '/home'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      background: #fff;

      .login_info {
        width: 100%;

        .van-cell {
          padding: 0.48rem 0.3rem 0.04rem 0.3rem;
          border-bottom: 1px solid #E9E9E9 !important;
        }

        .pu_pwd {
          position: relative;

          a {
            position: absolute;
            right: 0.2rem;
            bottom: 0.08rem;
            font-size: 0.26rem;
            color: #5B913F;
          }

          a.code {
            width: 2rem;
            height: 0.64rem;
            border: 1px solid #5B913F;
            // font-size: 0.24rem;
            // line-height: 0.57rem;
            // text-align: center;
            // color: rgba(255, 255, 255, 1);
          }

          span {
            color: #263E56 !important;
            font-size: 0.26rem;
          }
        }
      }

      h4 {
        margin-top: 0.2rem;
        margin-bottom: 0.8rem;
        font-size: 0.22rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(170, 170, 170, 1);
        line-height: 0.34rem;
      }

      .van-button--primary {
        background-color: #5B913F;
        border: none;
        font-size: 0.28rem;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
      }
    }

    .ver_dialog {
      span.iconfont {
        width: 100%;
        padding: 0.2rem;
        display: block;
        text-align: right;
      }

      h3 {
        font-size: 0.32rem;
        font-weight: 500;
        color: rgba(108, 108, 108, 1);
        margin: 0.8rem 0;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 50%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(172, 172, 172, 1);
        }

        span:nth-child(2) {
          background: rgba(107, 161, 65, 1);
        }
      }
    }
  }
</style>
