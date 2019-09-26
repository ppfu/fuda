<template>
  <div class="public">
    <div class="top_head">
      <span @click="showPopup">{{$t('mine.list.l5')}}</span>
      <span>{{$t('tname')}}</span>
      <div class="t-head" @click="lang_dlg=true">
        <span v-if="$store.state.lang=='cn'">{{$t('ch')}}
          <span class="iconfont icon-tabDown_arrow"></span>
        </span>
       <!-- <span v-if="$store.state.lang=='ct'">{{$t('ch1')}}
          <span class="iconfont icon-tabDown_arrow"></span>
        </span> -->
        <span v-if="$store.state.lang=='en'">{{$t('en')}}
          <span class="iconfont icon-tabDown_arrow"></span>
        </span>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="earnings">
          <div class="earn_info">
            <h3 style="color: #F0674F;">{{$t('index.society.s1')}}</h3>
            <van-circle  color="#F0674F" fill="#fff" size="2rem" layer-color="#F0674F" :text="bonusText"
               :clockwise="false" :stroke-width="60" />
            <div class="foot">
              <span @click="goWith">{{$t('index.society.s5')}}</span>
              <span @click="goshift" class="foot_one">{{$t('index.society.s6')}}</span>
            </div>
          </div>
          <div class="earn_info">
            <h3 style="color: #698EDB;">{{$t('index.society.s2')}}</h3>
            <van-circle  color="#698EDB" fill="#fff" size="2rem" layer-color="#698EDB" :text="cashText"
               :stroke-width="60" />
            <div class="foot">
              <span @click="goRech">{{$t('index.society.s7')}}</span>
            </div>
          </div>
          <div class="earn_info">
            <h3 style="color: #6A9865;">{{$t('index.society.s3')}}</h3>
            <van-circle  color="#6A9865" fill="#fff" size="2rem" layer-color="#6A9865" :text="fudaText"
              :clockwise="false" :stroke-width="60" />
            <div class="foot">
              <span @click="goPlan">{{$t('index.society.s8')}}</span>
            </div>
          </div>
          <div class="earn_info">
            <h3 style="color: #D28849;">{{$t('index.society.s4')}}</h3>
            <van-circle  color="#D28849" fill="#fff" size="2rem" layer-color="#D28849" :text="outText"
               :clockwise="false" :stroke-width="60" />
            <div class="foot">
              <span @click="gowithRe">{{$t('index.society.s9')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择语言弹窗 -->
    <x-dialog v-model="lang_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:$store.state.lang == 'en'}" @click="changeLang('en')">
            <span>English</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        <!--  <li :class="{active:$store.state.lang == 'ct'}" @click="changeLang('ct')">
            <span>中文繁體</span>
            <span class="iconfont icon-tabduihao"></span>
          </li> -->
          <li :class="{active:$store.state.lang == 'cn'}" @click="changeLang('cn')">
            <span>中文简体</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        </ul>
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
        lang_dlg: false,
        active: 4,
        bonus: 0, //红利总额
        cash: 0, //现金总额
        fuda: 0, //购买富达计划总额
        cash_out: 0, //总提现金额
        snumber: 5,
        currentRate: 0
      }
    },
    components: {
      XDialog,
    },
    computed: {
      //红利红包
      bonusText() {
        return this.bonus+'$';
        console.log(that.bonus);
      },
      //现金总额
      cashText() {
        return this.cash+'$';
      },
      //购买富达计划总额
      fudaText() {
        return this.fuda+'$';
      },
      //总提现金额
      outText() {
        return this.cash_out+'$';
      }
    },
    mounted: function() {
      let that = this;
      that.getUserAccountInfo()

    },
    methods: {
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      changeLang(l) {
        let that = this;
        that.setLang(l);
        that.lang_dlg = false;
        that
          .$http({
            url: "/User/changeLang",
            method: "post",
            data: {
              lang: that.$store.state.lang
            }
          })
          .then(function(res) {});
          that.getUserAccountInfo();
      },
      //获取用户账户信息
      getUserAccountInfo() {
        let that = this;
        that
          .$http({
            url: "Account/getUserAccountInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              // that.data = res.data.data;
              that.bonus =res.data.data.bonus;
              that.cash = res.data.data.cash;
              that.fuda = res.data.data.fuda;
              that.cash_out = res.data.data.cash_out;
              that.$store.state.recharge_address = res.data.data.recharge_address;
              that.$store.state.recharge_address_qrcode = res.data.data.recharge_address_qrcode;
              that.$store.state.recharge_intro = res.data.data.recharge_intro;
              console.log(res.data.data)
              //红利钱包
              if (that.bonus) {
                that.bonus = parseFloat(that.bonus);
                if (that.bonus < 1000) {
                  that.bonus = parseFloat(that.bonus).toFixed(2);
                }
                if (that.bonus > 1000 && that.bonus < 10000) {
                  that.bonus =parseFloat(that.bonus / 1000).toFixed(2) + "k";
                }
                if (that.bonus > 1000000) {
                  that.bonus =parseFloat(that.bonus / 1000000).toFixed(5) + "m";
                }
              }
                //现金钱包
                 if (that.cash) {
                that.cash = parseFloat(that.cash);
                if (that.cash < 1000) {
                  that.cash = parseFloat(that.cash).toFixed(2);
                }
                if (that.cash > 1000 && that.cash < 10000) {
                  that.cash =
                    parseFloat(that.cash / 1000).toFixed(2) + "k";
                }
                if (that.cash > 1000000) {
                  that.cash =parseFloat(that.cash / 1000000).toFixed(5) + "m";
                }
              }
              //富达计划
                 if (that.fuda) {
                that.fuda = parseFloat(that.fuda);
                if (that.fuda < 1000) {
                  that.fuda = parseFloat(that.fuda).toFixed(2);
                }
                if (that.fuda > 1000 && that.fuda < 10000) {
                  that.fuda = parseFloat(that.fuda / 1000).toFixed(2) + "k";
                }
                if (that.fuda > 1000000) {
                  that.fuda =parseFloat(that.fuda / 1000000).toFixed(5) + "m";
                }
              }
              //总提现额
                 if (that.cash_out) {
                that.cash_out = parseFloat(that.cash_out);
                if (that.cash_out < 1000) {
                  that.cash_out = parseFloat(that.cash_out).toFixed(2);
                }
                if (that.cash_out > 1000 && that.cash_out < 10000) {
                  that.cash_out =
                    parseFloat(that.cash_out / 1000).toFixed(2) + "k";
                }
                if (that.cash_out > 1000000) {
                  that.cash_out = parseFloat(that.cash_out / 1000000).toFixed(5) + "m";
                }
              }
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      goWith() {
        let that = this;
        that.$router.push({
          path: '/withdraw'
        })
      },
      goRech() {
        let that = this;
        that.$router.push({
          path: '/recharge'
        })
      },
      goPlan() {
        let that = this;
        that.$router.push({
          path: '/buyPlan'
        })
      },
      gowithRe() {
        let that = this;
        that.$router.push({
          path: '/withRecord'
        })
      },
      goshift() {
        let that = this;
        that.$router.push({
          path: '/shift'
        })
      },
      goSafe() {
        let that = this;
        that.$router.push({
          path: '/safety'
        })
      },
      goInvte() {
        let that = this;
        that.$router.push({
          path: '/invite'
        })
      },
      goCont() {
        let that = this;
        that.$router.push({
          path: '/contactSe'
        })
      },
      goSett() {
        let that = this;
        that.$router.push({
          path: '/setting'
        })
      },
      goInfrm() {
        let that = this;
        that.$router.push({
          path: '/inform'
        })
      },
      goPay() {
        let that = this;
        that.$router.push({
          path: '/payment'
        })
      },
      //浮动公告滚动
      startMove() {
        var that = this;
        // console.log(that.notice.length)
        if (that.notice.length >= 0) {
          let timer = setTimeout(() => {
            if (that.number === that.notice.length - 1) {
              that.number = 0;
            } else {
              that.number += 1;
            }
            that.notice_info = that.notice[that.number].content;
            that.startMove();
          }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
        }
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .top_head {
      display: flex;
      align-items: center;
      height: 0.8rem;
      box-shadow: none;
      justify-content: space-between;
      padding: 0 0.32rem;
      color: #fff;

      span:nth-child(1) {
        display: inline-block;
        font-size: 0.26rem;
      }

      span:nth-child(2) {
        display: inline-block;
        font-size: 0.32rem;
        font-weight: bold;
        padding-left: 0.6rem;
      }

      .top_head {
        span {
          font-size: 0.26rem;
        }
      }
    }

    .main {
      margin-top: 0.8rem;

      .content {
        font-family: PingFang SC;

        .earnings {
          margin-top: 0.6rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .earn_info {
            width: 3.32rem;
            height: 3.83rem;
            margin-bottom: 0.6rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0rem 0rem 0rem 0rem rgba(180, 180, 180, 0.47);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            h3 {
              padding: 0.22rem 0;
              font-size: 0.28rem;
              color: rgba(240, 103, 79, 1);
            }

            span:nth-child(2) {
              height: 0.48rem;
              font-size: 0.32rem;
              font-weight: bold;
              line-height: 0.48rem;
              color: rgba(77, 170, 144, 1);
            }

            .foot {
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
                display: inline-block;
                width: 100%;
                height: 0.65rem;
                text-align: center;
                line-height: 0.65rem;
                background: rgba(216, 216, 216, 1);
                font-size: 0.22rem;
                font-weight: 500;
                color: rgba(68, 104, 32, 1);
              }

              span.foot_one {
                border-left: 1px solid #fff;
              }
            }
          }
        }
      }
    }

  }
</style>
