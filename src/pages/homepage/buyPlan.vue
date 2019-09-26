<template>
  <div class="public">
    <van-nav-bar :title="$t('index.society.s8')" :right-text="$t('buyplan.ing')" left-arrow @click-right="goPro" @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field :label="$t('buyplan.coinlist.t1')" v-model="amount" required clearable :placeholder="$t('buyplan.dialog.p2')" />
        <p>
          <span>{{$t('buyplan.buytip.t1')}}:{{$t('buyplan.buytip.t2')}}{{fd_min_amount}}{{$t('buyplan.buytip.t5')}}
          {{$t('buyplan.buytip.t3')}},{{$t('buyplan.buytip.t4')}}{{fd_max_amount}}{{$t('buyplan.buytip.t5')}}</span>
          <span>{{$t('buyplan.coinlist.t2')}}：{{rest_fd_times}}{{$t('buyplan.coinlist.t3')}}</span>
        </p>
      </div>
      <van-button type="primary" size="large" @click="buyFudaPlan">{{$t('cfm')}}</van-button>
      <h5 @click="goRecord()">{{$t('buyplan.rec')}}</h5>
    </div>
    <!-- 选择语言弹窗 -->
  <!--  <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
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
        amount: '',//金额
        showAuto: true,
        showAss: false,
        fd_plan_info:'',//富达计划产品介绍
        fd_min_amount:'',//购买富达最低金额
        fd_max_amount:'',//购买富达最高金额
        rest_fd_times:'',//剩余购买次数
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getFudaInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      closeDia() {
        let that = this;
        that.verify_dlg = false;
      },
      //购买富达计划
      buyFudaPlan() {
        let that = this;
        let amount = that.amount;
        if (!amount || amount == null) {
          that.$toast(that.$t('buyplan.dialog.p2'));
        } else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("Account/buyFudaPlan", {
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
      //获取富达计划信息
      getFudaInfo() {
        let that = this;
        that
          .$http({
            url: "Account/getFudaInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            console.log(res)
            if (res.data.code == 1) {
              that.fd_plan_info = res.data.data.fd_plan_info;
              that.$store.state.planInfo = res.data.data.fd_plan_info;
              that.fd_min_amount = res.data.data.fd_min_amount;
              that.fd_max_amount = res.data.data.fd_max_amount;
              that.rest_fd_times = res.data.data.rest_fd_times;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {
            // that.$toast({
            //   message: "网络连接失败",
            //   position: "bottom",
            //   duration: 5000
            // });
          });
      },
      goPro() {
        let that = this;
        that.$router.push({
          path: '/productIn',
        })
      },
       goRecord() {
        let that = this;
        that.$router.push({
          path: '/buyRecord',
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
          color: #C5C5C5 !important;
          /* placeholder字体大小  */
        }

        p {
          margin-top: 0.2rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          font-weight: 500;
          span:nth-child(1) {
            color: rgba(170, 170, 170, 1);
          }
          span:nth-child(2) {
            color: rgba(91, 145, 63, 1);
          }
        }
      }
      .van-button--primary {
        background-color: #5B913F;
        border: none;
        font-size: 0.28rem;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
      }
      h5{
        text-align: center;
        font-size: 0.26rem;
        padding: 0.2rem 0;
        color: #5B913F;
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
