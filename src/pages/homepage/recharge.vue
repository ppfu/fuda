<template>
  <div class="public">
    <van-nav-bar :title="$t('index.society.s7')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field :label="$t('recharge.l1')" v-model="address" clearable :placeholder="$t('recharge.p1')" />
        <div class="in_way">
          <h3>{{$t('recharge.l2')}}</h3>
          <div class="way_info">
            <!-- <a :href="imgurl" download="123"> -->
            <img class="img1" :src="imgurl" />
            </van-image-preview>
            <!-- </a> -->
            <span @click="downloadIamge('.img1',imgurl)">{{$t('recharge.l3')}}</span>
          </div>

        </div>
        <div class="way_url">
          <h3>{{url}}</h3>
          <span v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('recharge.l4')}}</span>
        </div>
        <h4>{{$t('n9')}}</h4>
        <van-field :label="$t('recharge.l5')" v-model="number" clearable :placeholder="$t('recharge.p2')" />
        <van-button type="primary" @click="recharge" size="large">{{$t('cfm')}}</van-button>
        <h5 @click="goReWay">{{$t('recharge.p3')}}？</h5>
      </div>
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
        show: false,
        address: '', //ETH地址
        number: '', //充值数量
        url: this.$store.state.recharge_address, //地址链接
        imgurl: this.$store.state.recharge_address_qrcode,

      }
    },
    components: {
      XDialog,
    },
    mounted: function() {

    },
    methods: {
      back() {
        this.$router.back();
      },
      // bindQRCode: function () {
      //   new QRCode(this.$refs.qrCodeDiv, {
      //     text: this.url,
      //     width: 140,
      //     height: 140,
      //     colorDark: "#333333", //二维码颜色
      //     colorLight: "#ffffff", //二维码背景色
      //     correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      //   })
      // },
downloadIamge(selector, name) {
        // 通过选择器获取img元素，
        if(this.imgurl == ''){

           this.$toast("您还不能充值，请联系客服设置充值地址");

        }else{
          var img = document.querySelector(selector)
          // 将图片的src属性作为URL地址
          var url = img.src
          var a = document.createElement('a')
          var event = new MouseEvent('click')

          a.download = name || '下载图片名称'
          a.href = url
          a.dispatchEvent(event)
        }

      },

        //充值
        recharge() {
            let that = this;
            let address = that.address;
            let number = that.number;
            if (!address || address == null) {
              that.$toast(that.$t('recharge.p1'));
            } else if (!number || number == null) {
              that.$toast(that.$t('recharge.p2'));
            } else {
              that.$toast.loading({
                mask: true,
                message: that.$t("load.submiting")
              });
              that.$http
                .post("Account/rechargeUserAccount", {
                  token: window.localStorage.getItem("token"),
                  address: address,
                  number: number
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
                .catch(function(err) {});
            }
          },
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

        /deep/ .van-cell {
          padding: 0.48rem 0rem 0.04rem 0rem !important;
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
              margin-top: 0.2rem;
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
            width: 100%;
            font-size: 0.3rem;
            font-weight: 500;
            color: rgba(16, 16, 16, 1);
            word-wrap: break-word;
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

        h5 {
          text-align: left;
          font-size: 0.26rem;
          padding: 0.12rem 0;
          color: #5B913F;
        }
      }


    }
  }
</style>
