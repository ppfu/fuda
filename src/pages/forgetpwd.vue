<template>
  <div class="public">
    <div class="top">
      <span @click="back">{{$t('cel')}}</span>
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
        <van-field type="text" v-model="phone"  clearable maxlength="11" :placeholder="$t('reg.input1')" />
      </div>
       <div class="log_pwd">
        <span class="iconfont icon-tabmima"></span>
        <van-field v-model="password" type="password" maxlength="20" @blur="hintPassFun"  clearable :placeholder="$t('reg.input4')" />
      </div>
       <div class="log_pwd">
        <span class="iconfont icon-tabmima"></span>
        <van-field v-model="repassword" type="password"  clearable maxlength="20"  @blur="hintRepassFun" :placeholder="$t('reg.input5')" />
      </div>
      <div class="log_pwd">
         <span class="iconfont icon-tabyanzhengma"></span>
        <van-field type="text" v-model="verify_code" maxlength="4" :placeholder="$t('reg.input2')"  />
        <a @click="sendVerifyCode">{{codeMsg}}</a>
      </div>
      <van-button type="primary" @click="subForpass" size="large">{{$t('cfm')}}</van-button>
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
        phone: '',
        password: '',
        repassword:'',
        verify_code:'',
        lang_dlg:false,
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
       hintPassFun() {
        let that = this;
        if(that.password !== ""){
           if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(that.password)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast(that.$t("tip.pwd_error"));
          }
        }
      },
      hintRepassFun() {
        let that = this;
        if(that.repassword !== ""){
          if (that.password !== that.repassword) {
           that.$toast(that.$t("tip.pwd_again"));
          }
        }
      },
         //忘记密码
      subForpass() {
        let that = this;
        let phone = that.phone;
        let password = that.password;
        let repassword = that.repassword;
        let verify_code = that.verify_code;
       if (!phone || phone == null) {
         that.$toast(that.$t("reg.input1"));
       } else if (
         phone.trim().length != 11 ||
         !/^[1]([3-9])[0-9]{9}$/.test(phone)
       ) {
        that.$toast(that.$t("tip.phone_error"));
       } else if (!password || password == null) {
         that.$toast(that.$t("reg.input4"));
       } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(password)) { // 密码包含大小写字母数字不能纯字母纯数字
         that.$toast(that.$t("tip.pwd_error"));
       } else if (!repassword || repassword == null) {
         that.$toast(that.$t("reg.input5"));
       }else if (password !== repassword) {
         that.$toast(that.$t("tip.pwd_again"));
       } else if (!verify_code || verify_code == null) {
         that.$toast(that.$t("tip.code_input"));
       }  else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("User/changeUserPwd", {
              phone: phone,
              password: password,
              repassword:repassword,
              verify_code:verify_code,
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success(that.$t("suc"));
                that.$router.push({
                  path: "/"
                });
              } else {
               that.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
            });
        }
      },
       //	发送验证码
      sendVerifyCode() {
        let that = this;
        var phone = that.phone;
        var verify_code = that.verify_code;
        if (!phone || phone == null) {
           that.$toast(that.$t("reg.input1"));
        } else if (
          phone.trim().length != 11 ||
           !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
           that.$toast(that.$t("tip.phone_error"));
        } else {
          if (that.codeMsg != that.$t('reg.label2') && that.codeMsg != that.$t('resend')) return;
          var time = that.time;
           console.log(time)
          that.$http
            .post("User/sendSmsVerify", {
              phone: phone,
              type:2
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.code == 1) {
                that.$toast.success(that.$t("code1"));
                verify_code = res.data.data;
                var interval = setInterval(function() {
                  time--;
                  that.codeMsg = time + "s";
                  if (time <= 0) {
                    clearInterval(interval);
                    that.codeMsg = that.$t('resend');
                  }
                }, 1000);
              } else {
                 that.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
            });
        }
      },
      showPopup() {
        let that = this;
        that.show = true;
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
 .top {
   box-shadow: none;
   justify-content: space-between;
   align-items: center;


   span {
     padding-left: 0.28rem;
     font-size: 0.26rem;
     font-family: PingFang SC;
     font-weight: bold;
     color: #fff;
   }
   div{
     padding-right: 0.28rem;
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
   .content{
    .login_info {
      width: 100%;
       .van-cell:not(:last-child)::after {
        border: none;
      }

      .log_pwd {
        a {
          padding: 0.12rem 0.2rem;
          background: #356B1B;
        }
      }
      .van-button--primary {
        background: rgba(255, 255, 255, 0.3);
        font-size: 0.28rem;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
        border: none;
      }
    }
    }
   /deep/ .van-toast--default .van-toast__text{
    word-break: keep-all !important;
    word-wrap: break-word !important; // 只对英文起作用，以单词作为换行依据。
    white-space: pre-wrap !important; //只对中文起作用，强制换行。
    text-align:justify !important;  //css英文语句的两端对齐：
    text-justify:inter-ideograph !important;
    }
  }
</style>
