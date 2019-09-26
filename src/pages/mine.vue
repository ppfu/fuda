<template>
  <div class="public">

    <div class="d_logo">
      <div class="top_tit">
        <span @click="showPopup" class="portrait">{{$t('mine.list.l5')}}</span>
        <span>{{$t('tname')}}</span>
        <div @click="lang_dlg=true">
          <span v-if="$store.state.lang=='cn'">{{$t('ch')}}
            <span class="iconfont icon-tabDown_arrow"></span>
          </span>
        <!--  <span v-if="$store.state.lang=='ct'">{{$t('ch1')}}
            <span class="iconfont icon-tabDown_arrow"></span>
          </span> -->
          <span v-if="$store.state.lang=='en'">{{$t('en')}}
            <span class="iconfont icon-tabDown_arrow"></span>
          </span>
        </div>
      </div>
      <div class="top_head"><a>{{$t('mine.top.t1')}}：</a><span>{{data.user_code }}</span></div>

    </div>
    <div class="content">
      <div class="mine_info">
        <van-cell v-if="data.check_status == 0" @click="goAccount(data.check_status)" :title="$t('mine.list.l1')" :value="$t('mine.atte.a1')" is-link />
        <van-cell v-if="data.check_status == 1" @click="goAccount(data.check_status)" :title="$t('mine.list.l1')" :value="$t('mine.atte.a2')" is-link />
        <van-cell v-if="data.check_status == 2" @click="goAccount(data.check_status)" :title="$t('mine.list.l1')" :value="$t('mine.atte.a3')" is-link />
        <van-cell v-if="data.check_status == 3" @click="goAccount(data.check_status)" :title="$t('mine.list.l1')" :value="$t('mine.atte.a4')" is-link />
        <van-cell @click="goOrgan" :title="$t('mine.list.l2')" is-link />
        <van-cell @click="goAward" :title="$t('mine.list.l3')" is-link />
        <van-cell @click="goGener" :title="$t('mine.list.l4')" is-link />
        <van-cell v-if="data.tx_address == '' " @click="goWithAdd" :title="$t('mine.list.l6')" :value="$t('mine.atte.a5')" is-link />
        <van-cell v-if="data.tx_address !== '' " @click="goWithAdd" :title="$t('mine.list.l6')" :value="$t('mine.atte.a6')" is-link />
        <van-cell :title="$t('mine.list.l7')" is-link @click="goAbout" />
        <van-cell :title="$t('mine.btn.b1')" is-link arrow-direction="down" @click="redShow" />

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
         <!-- <li :class="{active:$store.state.lang == 'ct'}" @click="changeLang('ct')">
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
    <!-- 选择语言弹窗 -->
    <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>您查找的ID账户不存在</h3>
        <div class="dia_btn">
          <span @click="goTran">确认</span>
        </div>
      </div>
    </x-dialog>
    <!-- 红涨绿跌 -->

    <van-action-sheet v-model="show" :title="$t('logOut.g1')" :actions="actions" get-container="#app"
      :cancel-text="$t('logOut.g3')" @select="logOut" @cancel="onCancel" />
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
        lang_dlg: false,
        data:{},//我的页面信息
        actions: [{
          name: this.$t('logOut.g2')
        }, ]
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      //获取我的页面信息
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
              that.$store.state.user_data = res.data.data;
              console.log(that.$store.state.user_data)
              that.$store.state.own_status = res.data.data.check_status;
              that.$store.state.tx_address = res.data.data.tx_address;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
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
          .then(function(res) {
            if(res.data.code == 1){
              that.getUserInfo()
            }
          });
      },
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.show = false;
        that.$router.push({
          path: '/'
        })
      },
      //退出登录
      logOut() {
        let that = this;
          that.$http
            .post("User/userLogout", {
               token: window.localStorage.getItem("token"),
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                window.localStorage.clear();
                window.sessionStorage.clear();
                that.$router.push({
                  path: "/"
                });
              } else {
               that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {
            });

      },
      onCancel(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        // Toast(item.name);
      },
      closeDia() {
        let that = this;
        that.verify_dlg = false;
      },
      goTran() {
        let that = this;
        that.$router.push({
          path: '/transfer'
        })
      },
      redShow() {
        let that = this;
        that.show = true;
      },
      login() {
        let that = this;
        that.$router.push({
          path: '/home'
        })
      },
      goAbout() {
        let that = this;
        that.$router.push({
          path: '/aboutAs'
        })
      },
      goAccount(status) {
        let that = this;
        that.$router.push({
          path: '/accountAuth',
          query:{
            status:status
          }

        })
      },
      goOrgan() {
        let that = this;
        that.$router.push({
          path: '/organization'
        })
      },
      goAward() {
        let that = this;
        that.$router.push({
          path: '/awardProgram'
        })
      },
      goGener() {
        let that = this;
        that.$router.push({
          path: '/generalize'
        })
      },
      goWithAdd() {
        let that = this;
        that.$router.push({
          path: '/withAddress'
        })
      },


    }
  }
</script>

<style lang="less" scoped>
  .public {
    .d_logo {
      width: 100%;
      height: 3rem;
      overflow: hidden;
      background: url(../assets/img/geren-bg.png) no-repeat;
      background-size: 100% 100%;

      .top_tit {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
        padding: 0 0.32rem;
        align-items: center;
        span:nth-child(1) {
          font-size: 0.26rem;
        }
        span:nth-child(2) {
         font-size: 0.32rem;
         font-family:PingFang SC;
         font-weight: bold;
         padding-left: 0.66rem;
        }

      }


      .top_head {
        margin-top: 0.48rem;
        text-align: center;

        a {
          font-size: 0.28rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          opacity: 0.8;
        }

        span {
          text-align: center;
          font-size: 0.5rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 0.2rem;
        }
      }


    }

    .content {
      width: 100%;
      height: 100%;
      background: #fff;

      .mine_info {
        .van-cell {
          padding: 0.48rem 0 0.04rem 0 !important;
          font-size: 0.28rem;
          font-weight: 400;
        }

        .van-hairline--top-bottom::after {
          // border-width: 0;
        }

        .van-cell:not(:last-child)::after {
          // display: none;
          left: 0;
        }
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
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(107, 161, 65, 1);
        }
      }
    }
  }
</style>
