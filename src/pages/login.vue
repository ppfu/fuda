<template>
  <div class="public">
    <div class="top">
      <!-- 选择语言 -->
      <div @click="lang_dlg=true">
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
    <!-- logo -->
    <div class="d_logo">
      <img src="" alt>
      <span>{{$t('tname')}}</span>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <span class="iconfont icon-tabshouji2"></span>
          <van-field type="text" v-model="phone" clearable maxlength="11" :placeholder="$t('reg.input1')" />
        </div>
        <div class="log_pwd">
          <span class="iconfont icon-tabmima"></span>
          <van-field v-model="password" type="password" maxlength="20" :placeholder="$t('reg.input4')" />
          <a class="iconfont icon-tabbiyan1" @touchstart="eyepwd($event)"></a>
        </div>
        <van-button type="primary" size="large" @click="login">{{$t('reg.loginNow')}}</van-button>
        <div class="footer">
          <span @click="goForgetPwd">{{$t('login.fgtpwd')}}</span>
          <span @click="register">{{$t('reg.regSub')}}</span>
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
        phone: '',
        password: '',
      }
    },
    components: {
      XDialog,
    },
    methods: {
      showPopup() {
        let that = this;
        that.show = true;
      },
      register() {
        let that = this;
        that.$router.push({
          path: '/register'
        })
      },
      goForgetPwd() {
        let that = this;
        that.$router.push({
          path: '/forgetpwd'
        })
      },
      //登录
     login() {
       let that = this;
       let phone = that.phone;
       let password = that.password;
       if (!phone || phone == null) {
         that.$toast(that.$t("reg.input1"));
       } else if (
         phone.trim().length != 11 ||
         !/^[1]([3-9])[0-9]{9}$/.test(phone)
       ) {
        that.$toast(that.$t("tip.phone_error"));
       }  else {
         that.$toast.loading({
           mask: true,
           message: that.$t("load.logining")
         });
         that.$http
           .post("User/userLogin", {
             phone: phone,
             password: password,
           })
           .then(function(res) {
             that.$toast.clear();
             if (res.data.code == 1) {
               // that.$store.state.user_info = res.data.data;
               window.localStorage.setItem("token", res.data.data);
               that.$toast.success(that.$t("login.logSuss"));
               that.$router.push({
                 path: "/home"
               });
             } else {
              that.$toast.fail(res.data.msg);
             }
           })
           .catch(function(err) {
           });
       }
     },
     //退出登录
     logOut() {
       let that = this;
       let phone = that.phone;
       let password = that.password;
       if (!phone || phone == null) {
         that.$toast(that.$t("reg.input1"));
       } else if (
         phone.trim().length != 11 ||
         !/^[1]([3-9])[0-9]{9}$/.test(phone)
       ) {
        that.$toast(that.$t("tip.phone_error"));
       }  else {
         that.$toast.loading({
           mask: true,
           message: that.$t("load.logining")
         });
         that.$http
           .post("User/userLogin", {
             phone: phone,
             password: password,
           })
           .then(function(res) {
             that.$toast.clear();
             if (res.data.code == 1) {
               // that.$store.state.user_info = res.data.data;
               window.localStorage.setItem("token", res.data.data);
               that.$toast.success(that.$t("login.logSuss"));
               that.$router.push({
                 path: "/home"
               });
             } else {
              that.$toast.fail(res.data.msg);
             }
           })
           .catch(function(err) {
           });
       }
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
      },
      //密码展示隐藏
      eyepwd(e) {
        $(e.target)
          .toggleClass("icon-tabbiyan1")
          .toggleClass("icon-tabzhengyan");
        if (
          $(e.target)
          .parents(".log_pwd")
          .find("input")
          .attr("type") == "password"
        ) {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "text");
        } else {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "password");
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    height: 100%;
    width: 100%;
    .top {
      box-shadow: none;

      div {
        flex: 1;
        text-align: right;
        margin-right: 4%;

        span {
          // padding-left: 0.4rem;
          font-size: 0.26rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: #fff;
        }
      }
    }

    .d_logo {
      margin-top: 2rem;
      overflow: hidden;
      padding-bottom:0.8rem;
      text-align: center;
      span {
        font-size: 0.66rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }

    .content {
      .login_info {
        width: 100%;
          .van-cell:not(:last-child)::after {
          border: none;
        }
        .van-button--primary {
          background: rgba(255, 255, 255, 0.3);
          font-size: 0.28rem;
          color: #fff;
          border: none;
        }

        .footer {
          margin-top: 0.12rem;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #fff;
          }
        }
      }
    }
  }
</style>
