<template>
  <div class="public">
    <div class="top_head">
      <span>{{$t('ctwo.title.t1')}}{{user_code}}</span>
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
    <div class="d_logo">
      <span>{{$t('ctwo.title.t2')}}</span>
      <span>{{$t('ctwo.title.t4')}}</span>
      <span>{{bonus}}</span>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <span class="tit">{{$t('ctwo.trad.s1')}}:</span>
          <van-field type="text" v-model="others_code" :placeholder="$t('ctwo.trad.s2')" />
        </div>
        <van-button type="primary" size="large" @click="selectUser()">{{$t('ctwo.btn.b1')}}</van-button>
      </div>
      <div class='title-t'>
        <span></span>
        <span>{{$t('ctwo.tran.record.r1')}}</span>
      </div>
      <div class="con_info">
        <van-tabs v-model="active" @click="navTap(active)">
          <van-tab :title="$t('ctwo.tran.acco.c2')">
            <div class="header">
              <span>{{$t('ctwo.tran.record.r2')}}</span>
              <span>{{$t('ctwo.tran.record.r3')}}</span>
              <span>{{$t('ctwo.tran.record.r4')}}</span>
              <span>{{$t('ctwo.tran.record.r5')}}</span>
            </div>

            <div class="con_list">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')"
                  :loading-text="$t('more.c')" @refresh="onRefresh">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('more.d')"
                    @load="onLoad">
              <ul>
                <li v-for="(item,index) in tranList">
                  <span>{{item.transfer_user}}</span>
                  <span>{{item.amount}}</span>
                  <span>{{item.create_time}}</span>
                  <span @click="repeal(item.id)" style="color: #588D3E;" v-if="item.account_log_status == '0'">{{$t('ctwo.tran.record.r7')}}</span>
                  <span v-if="item.account_log_status == '1'">{{$t('ctwo.tran.record.r6')}}</span>
                  <span v-if="item.account_log_status == '2'">{{$t('ctwo.tran.record.e1')}}</span>
                  <span v-if="item.account_log_status == '3'">{{$t('ctwo.tran.record.r8')}}</span>
                  </li>
              </ul>
                 </van-list>
                </van-pull-refresh>
              </div>
            </div>

          </van-tab>
          <van-tab :title="$t('ctwo.tran.acco.c1')">
            <div class="header">
              <span>{{$t('ctwo.tran.record.r2')}}</span>
              <span>{{$t('ctwo.tran.record.r3')}}</span>
              <span>{{$t('ctwo.tran.record.r4')}}</span>
              <span>{{$t('ctwo.tran.record.r5')}}</span>
            </div>


            <div class="con_list">
               <div class="scroll_div">
               <van-pull-refresh v-model="updateLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')"
                :loading-text="$t('more.c')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('more.d')"
                  @load="onLoad">
              <ul>
                <li v-for="(item,index) in tranList">
                  <span>{{item.transfer_user}}</span>
                  <span>{{item.amount}}</span>
                  <span>{{item.create_time}}</span>
                  <span @click="affirm(item.id)" style="color: #588D3E;" v-if="item.account_log_status == '0'">{{$t('ctwo.tran.record.e2')}}</span>
                  <span @click="deny(item.id)"  style="color: #588D3E;"  v-if="item.account_log_status == '1'">{{$t('ctwo.tran.record.r6')}}</span>
                  <span v-if="item.account_log_status == '2'">{{$t('ctwo.tran.record.e3')}}</span>
                  <span v-if="item.account_log_status == '3'">{{$t('ctwo.tran.record.r8')}}</span>
                  </li>
              </ul>

             </van-list>
              </van-pull-refresh>
            </div>
            </div>
          </van-tab>
        </van-tabs>
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
    <!-- 弹框 -->
    <x-dialog v-model="verify_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>您还没有实名认证！</h3>
        <div class="dia_btn">
          <span @click="closeDia">取消</span>
          <span @click="goAcco">去认证</span>
        </div>
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
        active: 0,
        show: false,
        lang_dlg: false,
        verify_dlg: false,
        own_status:"",//认证状态
        bonus:'',//可用资产
        id: "12",
        user_code: "", //用户ID
        others_code:"",//对方ID
        check_status: '', //认证状态 1：已认证 2：未认证
        transfer_min_amount: '', //最低转账金额
        transfer_max_amount: '', //最低转账金额
        phone: '', //用户手机号
        tranList: [],
        tranListTotal: 0, // 总数量
        pageindex: 1,
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false // 全部加载

      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserTransferList();
      that.getUserInfo();
      that.getUserAccountInfo();
    },
    methods: {
      back() {
        this.$router.back();
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
            console.log(res)
            if (res.data.code == 1) {
              that.user_code = res.data.data.user_code;
              that.own_status = res.data.data.check_status;
              that.$store.state.own_status = res.data.data.check_status;
              that.$store.state.tx_address = res.data.data.tx_address;
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
        //获取用户账户信息 (可用资产)
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
              that.bonus = res.data.data.bonus;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //搜索用户
      selectUser(code){
        let that = this;
        let others_code = that.others_code;
        if (!others_code || others_code == null) {
           that.$toast(that.$t('ctwo.trad.s2'));
        }else if(that.own_status !== 2 ){
           that.verify_dlg = true;
        }else{
          that
            .$http({
              url: "Transfer/getUserInfoByCode",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                user_code:that.others_code,
              }
            })
            .then(function(res) {
              // console.log(res)
              if (res.data.code == 1) {
                that.$store.state.tran_data = res.data.data;
                that.$router.push({
                  path: '/transfer'
                })
              } else {
                that.$toast(res.data.msg);
              }
            })
            .catch(function(error) {

            });
        }

      },
       navTap(i) {
        let that = this;
        that.active = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.tranList = [];
        that.getUserTransferList(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.tranList = [];
        that.tranListTotal = 0;
        that.getUserTransferList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getUserTransferList(1);
      },
      //获取转账列表
      getUserTransferList(i) {
        let that = this;
        //  if (i) {
        //   that.lif = true;
        // }
        let active = toString(that.active)
        // transfer_type == 1 转账 ,transfer_type == 2  被转账 ,
        let transfer_type = that.active == "0" ? "1" : "2";
        console.log(transfer_type)
        that
          .$http({
            url: "Transfer/getUserTransferList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              transfer_type : transfer_type,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.tranList = res.data.data.data;
                  that.tranListTotal = res.data.data.total;
                  if (that.tranList.length >= that.tranListTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.data.length > 0) {
                  that.tranList = that.tranList.concat(res.data.data.data);
                  that.tranListTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.tranList.length >= that.tranListTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //修改状态 撤销（转让人）
      repeal(id){
        let that = this;
         that.$http({
             url: "Transfer/changeUserTransferStatus",
             method: "post",
             data: {
               token: window.localStorage.getItem("token"),
               id:id,
               status:3,
             }
           })
           .then(function(res) {
             // console.log(res)
             if (res.data.code == 1) {
               that.$toast.success(that.$t("suc"));
               that.onRefresh();
             } else {
               that.$toast.fail(res.data.msg);
             }
           })
           .catch(function(error) {
           });

      },
        //修改状态 确认 （被转让人）
         affirm(id){
        let that = this;
         that.$http({
             url: "Transfer/changeUserTransferStatus",
             method: "post",
             data: {
               token: window.localStorage.getItem("token"),
               id:id,
               status:1,
             }
           })
           .then(function(res) {
             // console.log(res)
             if (res.data.code == 1) {
               that.$toast.success(that.$t("suc"));
               that.onRefresh();
             } else {
               that.$toast.fail(res.data.msg);
             }
           })
           .catch(function(error) {
           });

      },
      //修改状态 拒绝 （被转让人）
         deny(id){
        let that = this;
         that.$http({
             url: "Transfer/changeUserTransferStatus",
             method: "post",
             data: {
               token: window.localStorage.getItem("token"),
               id:id,
               status:2,
             }
           })
           .then(function(res) {
             // console.log(res)
             if (res.data.code == 1) {
               that.$toast.success(that.$t("suc"));
               that.onRefresh();
             } else {
               that.$toast.fail(res.data.msg);
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
          .then(function(res) {});
      },

      closeDia() {
        let that = this;
        that.verify_dlg = false;
      },
      //去实名认证
      goAcco() {
        let that = this;
         that.$router.push({
          path: '/accountAuth'
        })
      },
      goTran() {
        let that = this;
        that.$router.push({
          path: '/transfer'
        })
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
        padding-right: 0.2rem;
      }

      .top_head {
        span {
          font-size: 0.26rem;
        }
      }
    }

    .d_logo {
      margin-top: 0.26rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;

      span:nth-child(1) {
        font-size: 0.42rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 0.2rem;
      }

      span:nth-child(2) {
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(18, 79, 2, 1);
      }

      span:nth-child(3) {
        font-size: 0.52rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }

    .content {
      .login_info {
        span.tit {
          width: 2.4rem;
          display: inline-block;
          font-size: 0.26rem;
          color: rgba(255, 255, 255, 1);
        }

        .van-button--primary {
          background: rgba(255, 255, 255, 0.3);
          font-size: 0.28rem;
          color: #fff;
          border: none;
        }
      }

      .title-t {
        margin-top: 0.4rem;
        display: flex;
        align-items: center;

        span:nth-child(1) {
          display: inline-block;
          width: 0.06rem;
          height: 0.26rem;
          background: rgba(228, 188, 92, 1);
          border-radius: 0.12rem;
          margin-right: 0.12rem;
        }

        span:nth-child(2) {
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }

      .con_info {
        margin-top: 0.2rem;
        width: 100%;
        height: calc(100% - 8rem);
        background: rgba(247, 247, 247, 1);
        box-shadow: 0 0 0.8rem 0.12rem #3C6F3A;
        overflow: hidden;
        .header {
          position: fixed;
          width: 92%;
          height: 0.8rem;
          line-height: 0.8rem;
          border-bottom: 1px dashed #e9e9e9;
          border-top: 1px solid #e9e9e9;
          display: flex;
          background: rgba(247, 247, 247, 1);

          span {
            display: inline-block;
            width: 25%;
            text-align: center;
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(67, 118, 60, 1);
          }
        }
        /deep/ .van-tab {
          color: #3C6F3A !important;

        }
        /deep/ .van-tab--active {
          color: #E4BC5C !important;
        }
       /deep/ .van-list__error-text,
	   /deep/ .van-list__finished-text,
	   /deep/ .van-list__loading{
			line-height: 0.46rem;
		}
        .con_list {
          padding-top: 0.8rem;
          height: 100%;
          overflow-y: scroll;
          .scroll_div{
            height: 100%;
          ul {
            height: 100%;


            li {
              padding: 0.12rem 0;
              display: flex;
              justify-content: space-between;
              span {
                width: 25%;
                display: inline-block;
                text-align: center;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
          }
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
          background:rgba(172,172,172,1);
        }
        span:nth-child(2) {
          background: rgba(107, 161, 65, 1);
        }
      }
    }
  }
</style>
