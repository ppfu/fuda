<template>
  <div class="public">
    <van-nav-bar :title="$t('chat.c1')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="massage_box">
        <div class="scroll_div">
          <van-list v-model="moreloading" :finished="finished" :immediate-check="true"
            @load="onLoad" direction="up">
            <div class="con_list" v-for="(item,index) in chatList" :key="index">
            <div class="mass_list" v-if="item.admin_id == 0 ">
              <h4>{{item.time}}</h4>
              <div class="m_info">
              <p class="mass_text">
                <a v-if="item.is_admin_read == 0 ">{{$t('chat.c2')}}</a>
                <a v-if="item.is_admin_read == 1 ">{{$t('chat.c3')}}</a>
                <span class="mas_left">{{item.content}}</span>
              </p>
              <img src="../../assets/img/hpo.jpeg" />
              </div>
            </div>
            <div class="mass_list mass_ass" v-if="item.admin_id > 0 ">
              <div class="m_info mass_ass">
              <img src="../../assets/img/hpo.jpeg" />
              <p class="mass_text">
                <span class="mas_right">{{item.content}}</span>
                <a v-if="item.is_admin_read == 0 ">{{$t('chat.c2')}}</a>
                <a v-if="item.is_admin_read == 1 ">{{$t('chat.c3')}}</a>
                </p>
              </div>
            </div>
            </div>
          </van-list>
        </div>
        <!-- <div id="bottom">123333333</div> -->
      </div>
      <div class="send">
        <van-cell-group>
          <van-field v-model="content" type="textarea" rows="1">
            <van-button @click="sendChat" slot="button" size="small" type="primary"></van-button>
          </van-field>
        </van-cell-group>
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
        pageindex: 1,
        content: '',
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        chatList: [],
        interval_time:'',//间隔时间


      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      // window.t = setInterval(that.getLastpage, 2000);
      that.getLastpage()
      // that.getChatList();
      window.t = setInterval(that.getChatList, 10000);
      that.loadBottom();
    },
    methods: {
      back() {
        this.$router.back();
      },
      //下拉加载更多
      onLoad() {
        let that = this;
        // that.chatList = [];
        that.pageindex --;
        that.moreloading = true;
        that.getChatList(1);
      },
      // 加载底部
      loadBottom(){
        console.log($("#bottom"))
         $("#bottom").scrollIntoView();
      },
       //获取最后一页数据
      getLastpage() {
        let that = this;
        that
          .$http({
            url: "Chat/getChatList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
               that.pageindex = res.data.data.last_page;
               console.log(that.pageindex)
            } else {
              // Toast("获取信息失败");
            }

          })
          .catch(function(error) {

          });
          },
      //获取信息列表
      getChatList(type) {
        let that = this;
        that
          .$http({
            url: "Chat/getChatList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex
            }
          })
          .then(function(res) {
            console.log(res)
            if (res.data.code == 1) {
              if (type == 0) {
                if (res.data.data.data.length > 0) {
                  that.chatList = res.data.data.data;
                  that.chatListTotal = res.data.data.total;
                  that.pageindex = res.data.data.last_page;

                   $.each(that.chatList,function (index,item) {
                     // var index1 = index - 1;
                   console.log(that.chatList.length)
                   if(index < that.chatList.length - 2){
                     that.interval_time = that.chatList[index + 1].time - that.chatList[index].time;
                   }
                    if(that.interval_time > 100){
                      item.time = that.timesToTime(item.time);
                    } else {
                      item.time = ''
                    }
                    // return that.interval_time;
                  });

                  if (that.chatList.length >= that.chatListTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.moreloading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.data.length > 0) {
                  that.chatList = that.chatList.concat(res.data.data.data);
                  that.pageindex = res.data.data.last_page;
                  that.chatListTotal = res.data.data.total;
                   $.each(that.chatList,function (index,item) {
                     // var index1 = index - 1;
                     console.log(that.chatList.length)
                     if(index < that.chatList.length - 2){
                       that.interval_time = that.chatList[index + 1].time - that.chatList[index].time;
                     }
                    // console.log(that.interval_time)
                    if(that.interval_time > 400){
                      item.time = that.timesToTime(item.time);
                    }else {
                      item.time = ''
                    }
                  });
                } else {
                  that.finished = true;
                }
                if (that.chatList.length >= that.chatListTotal) {
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
      },
      //	发送消息
      sendChat() {
        let that = this;
        var content = that.content;
        if (!content || content == null) {
          that.$toast("请输入信息");
        } else {
          that.$http
            .post("Chat/addChat", {
              token: window.localStorage.getItem("token"),
              content: content,
            })
            .then(function(res) {
              if (res.data.code == 1) {
                // 1. 拼接出一个消息对象
                var cmt = {
                  id: that.chatList.length + 1,
                  is_admin_read: 0,
                  time: Date.now()/1000,
                  content: that.content.trim(),
                  admin_id:0
                };
                cmt.time = that.timesToTime(cmt.time);
                that.chatList.push(cmt);
                that.content = '';
                // that.getChatList()
              } else {
                that.$toast(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
       // 时间戳 转化为时间
      timesToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        if (date.getHours() < 10) {
          var h = "0" + date.getHours() + ":";
        } else {
          var h = date.getHours() + ":";
        }
        if (date.getMinutes() < 10) {
          var m = "0" + date.getMinutes() + ":";
        } else {
          var m = date.getMinutes() + ":";
        }
        var s = date.getSeconds();
        if (s == 0) {
          s = "00";
        }else if(s < 10){
           s = "0" + s;
        }
        return Y + M + D + h + m + s;
      },
      closeDia() {
        let that = this;
        that.verify_dlg = false;
      },
      login() {
        let that = this;
        that.$router.push({
          path: '/home'
        })
      },
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
      padding: 0;

      .massage_box {
        width: 100%;
        padding: 0 4%;
        height: calc(100% - 2.6rem);
        overflow-y: scroll;
       #bottom{
         height:0.8rem;
         background: #fff;
       }
        .mass_list {
          // display: flex;
          width: 100%;
          // align-items: flex-start;
          // justify-content: flex-end;
          margin: 0.52rem 0;
          h4{
            text-align: center;
            font-size: 0.24rem;
            color: #fff;
            opacity: 0.46;
            margin-bottom: 0.2rem;
          }
          .m_info{
            display: flex;
            width: 100%;
            align-items: flex-start;
            justify-content: flex-end;

          p {
            margin-right: 0.36rem;
            position: relative;


            .mas_left {
              display: inline-block;
              max-width: 4.2rem;
              max-height: auto;
              min-width: 0.68rem;
              min-height: 0.68rem;
              background: rgba(255, 255, 255, 1);
              opacity: 0.8;
              border-radius: 0.12rem;
              line-height: 0.68rem;
              padding: 0 0.14rem;
              font-size: 0.28rem;
              color: rgba(59, 59, 59, 1);
            }

            .mas_left:after {
              position: absolute;
              top: 0.4rem;
              right: -0.34rem;
              border: 0.12rem solid transparent;
              content: " ";
              border-left-color: #fff;
              border-left-width: 0.26rem;
            }

            a {
              font-size: 0.22rem;
              color: #fff;
              opacity: 0.4;
              padding-right: 0.16rem;
            }
          }

          img {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            background: rgba(255, 255, 255, 1);
            border-radius: 50%;
          }
          }
        }

        .mass_ass {
            .m_info{
              justify-content: flex-start;

          p {
            margin-left: 0.36rem;

            .mas_right {
              display: inline-block;
              max-width: 4.2rem;
              max-height: auto;
              min-width: 0.68rem;
              min-height: 0.68rem;
              background: rgba(255, 255, 255, 1);
              opacity: 0.8;
              border-radius: 0.12rem;
              line-height: 0.68rem;
              padding: 0 0.14rem;
              font-size: 0.28rem;
              color: rgba(59, 59, 59, 1);
            }
            .mas_right:before {
              position: absolute;
              top: 0.4rem;
              left: -0.34rem;
              border: 0.12rem solid transparent;
              content: " ";
              border-right-color: #fff;
              border-right-width: 0.26rem;
            }

            a {
              font-size: 0.22rem;
              color: #fff;
              opacity: 0.4;
              padding-left: 0.16rem;
            }
            }
          }
        }

      }
      /deep/ .van-list__error-text,
      /deep/ .van-list__finished-text,
      /deep/ .van-list__loading {
        color: #fff !important;
        opacity: 0.6 !important;
      }
      .send {
        position: fixed;
        bottom: 0.6rem;
        width: 100%;
        padding: 0 4%;

        .van-cell {
          padding: 0 0.12rem !important;
          height: 1rem;
          line-height: 1rem;
        }
        .van-field--min-height .van-field__control{
           min-height: 1rem !important;
        }
        /deep/ .van-button--small {
          min-width: 0.62rem !important;
          width: 0.62rem !important;
          height: 0.52rem !important;
          background: url(../../assets/img/fasong.png) no-repeat;
          background-size: 100% 100% !important;
          border: none !important;
          margin-right: 0.2rem !important;
        }
      }
    }
  }
</style>
