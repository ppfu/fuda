<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.list.l2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active">
        <van-tab :title="$t('mine.atte.a7')">
          <div class="con_info">
            <div class="header">
              <span>{{$t('mine.atte.t1')}}</span>
              <span>{{$t('mine.atte.t2')}}</span>
              <span>{{$t('mine.atte.t3')}}</span>
            </div>
            <div class="con_list">
              <h5 v-if="teamList_one.length < 1">{{$t('mine.atte.t4')}}</h5>
              <ul>
                <li v-for="(item,index) in teamList_one" :key="index">
                  <span>{{item.user_code}}</span>
                  <span v-if="item.check_status == 0">{{$t('mine.atte.a1')}}</span>
                  <span v-if="item.check_status == 1">{{$t('mine.atte.a2')}}</span>
                  <span v-if="item.check_status == 2">{{$t('mine.atte.a3')}}</span>
                  <span v-if="item.check_status == 3">{{$t('mine.atte.a4')}}</span>
                  <span>{{item.fuda}}$</span>
                </li>
              </ul>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('mine.atte.a8')">
          <div class="con_info">
            <div class="header">
              <span>{{$t('mine.atte.t1')}}</span>
              <span>{{$t('mine.atte.t2')}}</span>
              <span>{{$t('mine.atte.t3')}}</span>
            </div>
            <div class="con_list">
              <h5 v-if="teamList_two.length < 1">{{$t('mine.atte.t4')}}</h5>
              <ul>
                <li v-for="(item,index) in teamList_two" :key="index">
                  <span>{{item.user_code}}</span>
                  <span v-if="item.check_status == 0">{{$t('mine.atte.a1')}}</span>
                  <span v-if="item.check_status == 1">{{$t('mine.atte.a2')}}</span>
                  <span v-if="item.check_status == 2">{{$t('mine.atte.a3')}}</span>
                  <span v-if="item.check_status == 3">{{$t('mine.atte.a4')}}</span>
                  <span>{{item.fuda}}$</span>
                </li>
              </ul>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('mine.atte.a9')">
          <div class="con_info">
            <div class="header">
              <span>{{$t('mine.atte.t1')}}</span>
              <span>{{$t('mine.atte.t2')}}</span>
              <span>{{$t('mine.atte.t3')}}</span>
            </div>
            <div class="con_list">
              <h5 v-if="teamList_three.length < 1">{{$t('mine.atte.t4')}}</h5>
              <ul>
                <li v-for="(item,index) in teamList_three" :key="index">
                  <span>{{item.user_code}}</span>
                  <span v-if="item.check_status == 0">{{$t('mine.atte.a1')}}</span>
                  <span v-if="item.check_status == 1">{{$t('mine.atte.a2')}}</span>
                  <span v-if="item.check_status == 2">{{$t('mine.atte.a3')}}</span>
                  <span v-if="item.check_status == 3">{{$t('mine.atte.a4')}}</span>
                  <span>{{item.fuda}}$</span>
                </li>
              </ul>
            </div>
          </div>
        </van-tab>
      </van-tabs>


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
        active: 0,
        teamList_one: [],
        teamList_two: [],
        teamList_three: [],
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getUserTeam()

    },
    methods: {
      back() {
        this.$router.back();
      },
      //  navTap(i) {
      //   let that = this;
      //   that.active = i;
      //   that.updateLoading = false;
      //   that.moreloading = false;
      //   that.finished = false;
      //   that.pageindex = 1;
      //   that.tranList = [];
      //   that.getUserTeam(0);
      // },
      //获取转账列表
      getUserTeam() {
        let that = this;
        that
          .$http({
            url: "User/getUserTeam",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.teamList_one = res.data.data[0];
              that.teamList_two = res.data.data[1];
              that.teamList_three = res.data.data[2];
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar {
      background: none !important;
      height: 0.88rem;
      line-height: 0.88rem;
    }
  /deep/  .van-tabs__wrap{
    background: #fff;
      position: fixed !important;
      top: 0.88rem !important;
      width: 100% !important;
      height: 0.8rem !important;
    }
    .van-hairline--bottom::after {
      border: none !important;
    }

    .content {
      padding: 0;
      background: #fff;
      height: calc(100% - 0.8rem);
      overflow-y: scroll;
      padding-bottom: 0.6rem;

      /deep/ .van-tab {
        color: #666 !important;
      }

      /deep/ .van-tab--active {
        color: #E4BC5C !important;
      }
      .con_info {
        width: 100%;
        // background: rgba(247, 247, 247, 1);
        // box-shadow: 0 0 0.8rem 0.12rem #3C6F3A;
        // margin-top: 0.2rem;
        padding: 0 4%;
        overflow: hidden;

        .header {
          position: fixed;
          width: 92%;
          top: 1.6rem;
          height: 1rem;
          line-height: 1rem;
          border-bottom: 1px solid #e9e9e9;
          display: flex;
          background: #fff;


          span {
            display: inline-block;
            width: 33.3333%;
            text-align: center;
            font-size: 0.30rem;
            color: #555;
          }
        }

        .con_list {
          margin-top: 0.88rem;
          height: calc(100% - 1rem);
          overflow-y: scroll;
          h5 {
            text-align: center;
            padding: 0.5rem;
            color: #888;
          }

          ul {
            height: 100%;

            li {
              padding: 0.12rem 0;
              display: flex;

              span {
                width: 33.333333%;
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
</style>
