<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.list.l1')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <h5 v-if="status == 1" style="color: #55A532;">{{$t('card.phr.p7')}}</h5>
      <h5 v-if="status == 2" style="color: #55A532;">{{$t('card.phr.p8')}}</h5>
      <h5 v-if="status == 3" style="color: #BD2C00;">{{$t('card.phr.p9')}}</h5>
      <div class="login_info waiting">
       <!-- 未实名或实名未通过 姓名 -->
        <van-field v-if="status == 0 || status == 3" :label="$t('card.label.l1') + ':'" v-model="real_name"  required clearable :placeholder="$t('alipay.phr.p2')" />
        <!-- 实名通过或资料已提交还未审核 -->
        <van-field v-if="status == 1 || status == 2" :label="$t('card.label.l1') + ':'" v-model="data.real_name" required clearable disabled />
         <!-- 未实名或实名未通过  身份证号-->
        <van-field v-if="status == 0 || status == 3" :label="$t('card.label.l5') + ':'" v-model="idcard_number" maxlength="18" required clearable :placeholder="$t('card.phr.p5')" />
        <!-- 实名通过或资料已提交还未审核 -->
        <van-field v-if="status == 1 || status == 2" :label="$t('card.label.l5') + ':'" v-model="idcard_number" required clearable disabled />

        <div class="in_way">
          <h4>{{$t('n5')}}</h4>
          <div class="way_info">
             <img v-if="status == 1 || status == 2 "  class="wx-img" :src="idcard_front" />
             <van-uploader v-if="status == 0 || status == 3 " v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
            <span v-if="status == 0 || status == 3 ">{{$t('new.f')}}</span>
          </div>
          <div v-if="status == 0 || status == 3 " class="way_info way_img">
            <img src="../../assets/img/shili.jpg" />
            <a>{{$t('n6')}}</a>
          </div>
        </div>
        <van-button v-if="status == 0 || status == 3" type="primary" @click="accountAuth" size="large">{{$t('cfm')}}</van-button>
        <van-button v-if="status == 1 || status == 2"  type="primary" disabled @click="accountAuth" size="large">{{$t('cfm')}}</van-button>
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
        fileList: [], //展示已上传身份证
        real_name: '',
        idcard_number: '',
        idcard_front:'',//身份证头像面
        // imgShow:true,
        data:{},
        status:'',
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
       //实名认证
      accountAuth() {
        let that = this;
        let real_name = that.real_name;
        let idcard_number = that.idcard_number;
        if (!real_name || real_name == null) {
          that.$toast(that.$t('alipay.phr.p2'));
        } else if (!idcard_number || idcard_number == null) {
          that.$toast(that.$t('card.phr.p5'));
        } else if(that.fileList.length<1){
          that.$toast(that.$t('card.phr.p6'));
        } else {
          that.$toast.loading({
            mask: true,
            message: that.$t("load.submiting")
          });
          that.$http
            .post("User/getRealNameCheck", {
              token: window.localStorage.getItem("token"),
              real_name: real_name,
              idcard_number: idcard_number,
              idcard_front : that.idcard_front,
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
      // 上传生产许可证
      afterRead(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("file", file.file);
          formData.append("token", localStorage.getItem("token"));
          $.ajax({
            url: "http://fd.qilinpz.com/api/User/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            console.log(res)
            if (res.code == 1) {
              //成功回调
              that.$toast.success(that.$t("upsuc"));
              that.idcard_front = res.data;
            } else {
              //失败
              that.$toast(res.msg);
            }
          });
        };
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
              console.log(res)
              that.data = res.data.data;
              that.real_name = res.data.data.real_name;
              that.status = res.data.data.check_status;
              // console.log(that.status)
              that.idcard_number = res.data.data.idcard_number;
              that.idcard_front = res.data.data.idcard_front;
              // if (that.idcard_front == "") {
              //   that.imgShow = false;
              // }
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
       // 显示上传图片
      showUp() {
        // this.imgShow = false;
        // this.idcard_front = "";
      },
      login() {
        let that = this;
        that.$router.push({
          path: '/home'
        })
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
      overflow-y: scroll;
      h5{
        text-align: center;
        padding-top: 0.26rem;
      }
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
          margin-top: 0.48rem;

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

          .way_info {
            display: flex;
            flex-direction: column;
            align-items: center;
              // background: url(../../assets/img/zhengmian.png) no-repeat;
              // background-size: 100%;
              .van-uploader{
                width: 4.84rem !important;
                height: 2.67rem !important;
              }
             /deep/ .van-uploader__upload{
                width: 4.84rem !important;
                height: 2.67rem !important;
                background: url(../../assets/img/zhengmian.png) no-repeat;
                background-size: 100%;
                border: none;
              }
            /deep/  .van-uploader__preview-image{
                width: 4.84rem !important;
                height: 2.67rem !important;
              }
             /deep/ .van-uploader__upload-icon{
                display: none !important;
              }
            span {
              font-size: 0.28rem;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              padding: 0.2rem 0;
              margin-bottom: 0.12rem;
            }

            img {
              width: 4.46rem;
              height: 3.12rem;
            }
            a {
              font-size: 0.22rem;
              font-weight: 500;
              color: rgba(179, 179, 179, 1);
              display: block;
              text-align: center;
              padding-top: 0.14rem;
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

      }


    }
  }
</style>
