<template>
  <div class="public">
    <van-nav-bar :title="$t('index.society.s6')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field :label="$t('shift.shiftlist.t1')" v-model="amount" required clearable :placeholder="$t('shift.topinfo.t1')" />
      </div>
      <van-button type="primary" size="large" @click="transfer">{{$t('cfm')}}</van-button>
    </div>
    <!-- 选择语言弹窗 -->
   <!-- <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>请实名认证后进行提现</h3>
        <div class="dia_btn">
          <span  @click="closeDia">取消</span>
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
        verify_dlg: false,
        amount: '',
      }
    },
    components: {
      XDialog,
    },
    methods: {
      back() {
        this.$router.back();
      },
      closeDia(){
         let that = this;
         that.verify_dlg= false;
      },
       //转入现金红包
      transfer() {
        let that = this;
        let amount = that.amount;
        if (!amount || amount == null) {
          that.$toast(that.$t('shift.topinfo.t1'));
        } else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("Account/transferBonusToCash", {
              token: window.localStorage.getItem("token"),
              amount: amount,
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
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
        margin-bottom: 2rem;
        .van-cell {
          padding: 0.48rem 0.3rem 0.04rem 0.3rem;
          border-bottom: 1px solid #E9E9E9 !important;
        }
         input::-webkit-input-placeholder {
               /* placeholder颜色  */
              color:#C5C5C5!important;         /* placeholder字体大小  */
          }
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
