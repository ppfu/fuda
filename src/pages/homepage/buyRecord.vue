<template>
  <div class="public">
    <van-nav-bar :title="$t('buyplan.record')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="con_info">
        <div class="header">
          <span>{{$t('buyplan.btn.b1')}}</span>
          <span>{{$t('buyplan.btn.b2')}}</span>
        </div>
         <div class="scroll_div">
         <van-pull-refresh
           v-model="updateLoading"
           :pulling-text="$t('more.a')"
           :loosing-text="$t('more.b')"
           :loading-text="$t('more.c')"
           @refresh="onRefresh"
         >
           <van-list
             v-model="moreloading"
             :finished="finished"
             :immediate-check="true"
             :finished-text="$t('more.d')"
             @load="onLoad"
           >
        <div class="con_list">

          <ul>
            <li v-for="(item,index) in buyList"><span>{{item.create_time}}</span><span>{{item.total_amount}}</span></li>
          </ul>

        </div>
         </van-list>
          </van-pull-refresh>
        </div>
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
        buyList:[],
        buyListTotal: 0, // 总数量
        pageindex: 1,
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false // 全部加载
      }
    },
    components: {
      XDialog,
    },
     mounted: function() {
      let that = this;
      that.getFdPlanLog()

    },
    methods: {
      back() {
        this.$router.back();
      },
       //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.buyList = [];
        that.buyListTotal = 0;
        that.getFdPlanLog(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getFdPlanLog(1);
      },
      //获取购买记录
      getFdPlanLog(type) {
        let that = this;

        that
          .$http({
            url: "Account/getFdPlanLog",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (type == 0) {
                if (res.data.data.data.length > 0) {
                  that.buyList = res.data.data.data;

                  that.buyListTotal = res.data.data.total;
                  if (that.buyList.length >= that.buyListTotal) {
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
                  that.buyList = that.buyList.concat(res.data.data.data);
                  that.buyListTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.buyList.length >= that.buyListTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
              // Toast("获取信息失败");
            }

          })
          .catch(function(error) {

          });
      }

    }
  }
</script>

<style lang="less" scoped>
  .public {

    .van-nav-bar {
      background: none !important;
    }

    .van-hairline--bottom::after {
      border: none !important;
    }

    .content {
      justify-content: center;
      display: flex;
      padding: 0;
      background: #fff;
      .con_info {
        margin-top: 0.2rem;
        width: 100%;
        padding: 0 4%;
        height: 10.26rem;
        // background: rgba(247, 247, 247, 1);
        // box-shadow:  0 0 0.8rem 0.12rem #3C6F3A;

        .header {
          position: fixed;
          width: 92%;
          height: 1rem;
          line-height: 1rem;
          border-bottom: 1px solid #e9e9e9;
          display: flex;
          span {
            display: inline-block;
            width: 50%;
            text-align: center;
            font-size: 0.3rem;
            font-weight: bold;
             color: #555;
          }
        }
        .con_list {
          margin-top: 1rem;
          height: calc(100% - 1rem);
          overflow-y: scroll;
          ul {
            height: 100%;
            width: 100%;
            li {
              padding: 0.12rem 0;
              span {
                width: 50%;
                display: inline-block;
                text-align: center;
                font-size: 0.3rem;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }
      }


    }

  }
</style>
