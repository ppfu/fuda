<template>
  <div class="public">
    <van-nav-bar :title="$t('ctwo.tran.acco.a1')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="tr_title">
        <span>{{$t('ctwo.tran.acco.a2')}}：{{tran_data.user_code}}</span>
        <p>
          <span>{{$t('ctwo.tran.acco.a3')}}：</span>
          <span v-if="tran_data.check_status == 1">{{$t('ctwo.tran.acco.a4')}}</span>
          <span v-if="tran_data.check_status == 2">{{$t('ctwo.tran.acco.a9')}}</span>
        </p>
      </div>
      <div class="login_info waiting">
        <van-field :label="$t('safecenter.t1')" v-model="phone" maxlength="11" required clearable :placeholder="$t('phone.phr.p1')" />
        <van-field :label="$t('ctwo.tran.acco.a5')" v-model="amount" required clearable :placeholder="$t('ctwo.tran.acco.a6')" />
       <!-- <div class="pu_pwd">
          <van-field :label="$t('ctwo.tran.acco.a7')" v-model="verify_code" maxlength="4" :placeholder="$t('ctwo.tran.acco.a8')" required />
          <a class="code" @click="sendVerifyCode">{{codeMsg}}</a>
        </div> -->
      </div>
      <h4>{{$t('ctwo.tran.tips.t1')}}：{{$t('ctwo.tran.tips.t2')}}{{$t('ctwo.tran.tips.t3')}}{{tran_data.transfer_min_amount}}
      {{$t('ctwo.tran.tips.t4')}},{{$t('ctwo.tran.tips.t5')}}{{tran_data.transfer_max_amount}}{{$t('ctwo.tran.tips.t4')}}</h4>
      <van-button type="primary" size="large" @click="transfer">{{$t('cfm')}}</van-button>
    </div>
    <!-- 选择语言弹窗 -->
   <!-- <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>请实名认证后进行提现</h3>
        <div class="dia_btn">
          <span @click="closeDia">取消</span>
          <span>确认</span>
        </div>
      </div>
    </x-dialog> -->
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
        user_code:this.$store.state.user_code,//用户id
        check_status:this.$store.state.check_status,//是否认证
        tran_data:this.$store.state.tran_data,
        amount:'',//转账金额
        phone: '',//手机号
        verify_code: '',//验证码
        codeMsg: this.$t('reg.label2'),
        time: 60,
      }
    },
    components: {
      XDialog,
    },
    methods: {
      back() {
        this.$router.back();
      },
       //转账
      transfer() {
        let that = this;
        let user_code = that.tran_data.user_code;
        let phone = that.phone;
        let amount = that.amount;
        if (!phone || phone == null) {
          that.$toast(that.$t("reg.input1"));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
         that.$toast(that.$t("tip.phone_error"));
        }else if (!amount || amount == null) {
          that.$toast(that.$t('withdraw.detail.l1'));
        }  else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("Transfer/setTransferAccount", {
              token: window.localStorage.getItem("token"),
              user_code:user_code,
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
            });
        }
      },
       //	发送验证码
      // sendVerifyCode() {
      //   let that = this;
      //   var phone = that.phone;
      //   var verify_code = that.verify_code;
      //   if (!phone || phone == null) {
      //      that.$toast(that.$t("reg.input1"));
      //   } else if (
      //     phone.trim().length != 11 ||
      //      !/^[1]([3-9])[0-9]{9}$/.test(phone)
      //   ) {
      //      that.$toast(that.$t("tip.phone_error"));
      //   } else {
      //     if (that.codeMsg != that.$t('reg.label2') && that.codeMsg != that.$t('resend')) return;
      //     var time = that.time;
      //      console.log(time)
      //     that.$http
      //       .post("User/sendSmsVerify", {
      //         phone: phone,
      //         type:4
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
      //            that.$toast(res.data.msg);
      //         }
      //       })
      //       .catch(function(err) {
      //       });
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

      .tr_title {
        display: flex;
        justify-content: space-between;
        padding-top: 0.4rem;

        span {
          font-size: 0.28rem;
          font-weight: 500;
          color: rgba(103, 103, 103, 1);
        }
        p{
          span:nth-child(2){
            color: #5B913F;
          }
        }
      }

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
            width: 1.72rem;
            height: 0.57rem;
            background: rgba(107, 161, 65, 1);
            font-size: 0.24rem;
            line-height: 0.57rem;
            text-align: center;
            color: rgba(255, 255, 255, 1);
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
