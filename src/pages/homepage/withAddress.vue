<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.list.l6')" left-text=""  left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field :label="$t('mine.list.l6')+':'" v-model="address" required clearable :placeholder="$t('tip.tip_address')" />
        <h4>{{$t('n7')}}</h4>
        <van-button type="primary" @click="setTxAddress" size="large">{{$t('cfm')}}</van-button>
      </div>
    </div>

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
        address: '',
      }
    },
    components: {
      XDialog,
    },
     mounted:function(){
      let that = this;
      that.getUserInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
       //设置提现地址
      setTxAddress() {
        let that = this;
        let address = that.address;
        if (!address || address == null) {
          that.$toast(that.$t('tip.tip_address'));
        } else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("User/setTxAddress", {
              token: window.localStorage.getItem("token"),
              address: address,
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
        //获取用户信息
      getUserInfo() {
        let that = this;
        that
          .$http({
            url: "User/getUserInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.data = res.data.data;
              that.address = res.data.data.tx_address;;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
       goReWay() {
        let that = this;
        that.$router.push({
          path: '/rechWay'
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

        .van-field__control {
          padding-left: 0.2rem !important;
        }

        .van-field__label span {
          width: 2rem !important;
          font-size: 0.26rem !important;
        }

        input::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #C5C5C5 !important;
          /* placeholder字体大小  */
        }

        .in_way {
          display: flex;
          margin-top: 0.48rem;

          h3 {
            width: 2.08rem;
            height: 0.28rem;
            font-size: 0.3rem;
            font-weight: 500;
            color: rgba(76, 76, 76, 1);
          }

          .way_info {

            display: flex;
            flex-direction: column;
            align-items: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
              width: 2.8rem;
              height: 2.8rem;
            }

            span {
              width: 2.50rem;
              height: 0.66rem;
              line-height: 0.66rem;
              text-align: center;
              background: linear-gradient(0deg, rgba(254, 173, 39, 1) 0%, rgba(255, 218, 101, 1) 100%);
              box-shadow: 0 0.25rem 0.4rem -0.25rem rgba(139, 98, 29, 0.56);
              border-radius: 3rem;
              font-size: 0.28rem;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }

        .way_url {
          margin-top: 0.48rem;
          display: flex;
          flex-direction: column;
          align-items: center;

          h3 {
            font-size: 0.3rem;
            font-weight: 500;
            color: rgba(16, 16, 16, 1);
            text-align: center;
          }

          span {
            margin-top: 0.2rem;
            width: 2.52rem;
            height: 0.66rem;
            line-height: 0.66rem;
            text-align: center;
            background: linear-gradient(0deg, rgba(254, 173, 39, 1) 0%, rgba(255, 218, 101, 1) 100%);
            box-shadow: 0 0.25rem 0.4rem -0.25rem rgba(139, 98, 29, 0.56);
            border-radius: 3rem;
            font-size: 0.28rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }

        .van-button--primary {
          background-color: #5B913F;
          border: none;
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
        }

        h4 {
          margin-top: 0.48rem;
          width: 7.07rem;
          height: 0.53rem;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(170, 170, 170, 1);
          line-height: 0.3rem;
        }
        h5{
          text-align: left;
          font-size: 0.26rem;
          padding: 0.12rem 0;
          color: #5B913F;
        }
      }


    }
  }
</style>
