<template>
  <div>
    <div class="tabs-wrap">
      <router-view name="child"></router-view>
    </div>
    <div id="footer">
      <van-tabbar v-model="active">
        <router-link to="/home">
          <van-tabbar-item>
            <span>{{$t('navbar.home')}}</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab1_on : icon.tab1_off" />
          </van-tabbar-item>
        </router-link>
        <router-link to="/contract">
          <van-tabbar-item>
            <div class="contract" slot="icon" slot-scope="props">
            <p><img :src="props.active ? icon.tab2_on : icon.tab2_off" /></p>
            <span class="con_text">C2C</span>
            </div>
          </van-tabbar-item>
        </router-link>
        <router-link to="/mine">
          <van-tabbar-item>
            <span>{{$t('navbar.mine')}}</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab3_on : icon.tab3_off" />
          </van-tabbar-item>
        </router-link>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        tab1_off: require("../assets/img/sy-1.png"),
        tab1_on: require("../assets/img/sy-2.png"),
        tab2_off: require("../assets/img/c2c-1.png"),
        tab2_on: require("../assets/img/c2c-2.png"),
        tab3_off: require("../assets/img/wd-1.png"),
        tab3_on: require("../assets/img/wd-2.png"),
      }
    };
  },
  components: {},
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      if (this.$route.path == "/home") {
        this.active = 0;
      } else if (this.$route.path == "/contract") {
        this.active = 1;
      } else if (this.$route.path == "/asset") {
        this.active = 2;
      }
    }
  },
  created: function() {
    if (this.$route.path == "/home") {
      this.active = 0;
    }  else if (this.$route.path == "/contract") {
      this.active = 1;
    }  else if (this.$route.path == "/asset") {
      this.active = 2;
    }
  },
  methods: {}
};
</script>

<style scoped="scoped">
#footer {
  height: 1rem;
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
}
/deep/ .van-tabbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 1rem;
  background-color: #fff;
 /* border-top: 1px solid #ffffff; */
 box-shadow:0px -1px 4px rgba(113,141,184,0.16);
}
.van-hairline--top-bottom::after{
  border-width: 0;
}
.van-tabbar a {
  display: inline-block;
  height: 1rem;
  width: 33.33334%;
  padding-top: 0.1rem;
}
.van-tabbar-item {
  color: #7d7e80;
  font-size: 0.24rem;
}
.van-tabbar-item--active {
  color: #5D784C;
}
.van-tabbar-item__icon .contract{
  margin-top: -0.4rem;
  color: #7d7e80;
  font-size: 0.24rem;
  text-align: center;
}
.van-tabbar-item--active .contract span{
  color: #5D784C;
}
.van-tabbar-item__icon .contract p{
text-align: center;
 width:0.94rem;
height:0.94rem;
background:rgba(255,255,255,1);
box-shadow:0px -3px 4px rgba(113,154,214,0.16);
border-radius:50%;
opacity:1;
line-height: 1.16rem;
margin-bottom: 0.03rem;
}
.van-tabbar-item__icon .contract img{
   display: inline-block;
}
.van-tabbar-item__icon img {
  display: block;
  height: 0.48rem;
}
</style>
