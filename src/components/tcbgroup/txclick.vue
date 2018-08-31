<template>
    <div class="txclick">
        <div class="userbox">
            <div class="txbox">
                <div class="user-tx">
                    <img :src="detail.img" alt="">
                </div>
                <ul class="user-info">
                    <li>
                        <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                        用户名：<span class='name'>{{detail.name}}</span>
                    </li>
                    <li>
                        <img src="../../assets/pic/icon-sex.png" alt="" class='icon'>
                        性　别：<span class='name'>{{detail.sex}}</span>
                    </li>
                    <li>
                        <img src="../../assets/pic/icon-adress.png" alt="" class='icon'>
                        地　址：<span class='name'>{{detail.province_code+detail.city_code+detail.area_code}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class='btnbox'>
            <ul class='btnlist'>
                <li v-on:click="current='hasget'" :class="{active:current=='hasget'}">
                    已接单（{{detail.receive_num}}）
                </li>
                <li v-on:click="current='hassent'" :class="{active:current=='hassent'}">
                    已发布（{{detail.release_num}}）
                </li>
            </ul>
        </div>    
        <ul class="goodslist" v-if="current=='hassent'">
            <li v-for="(item,key) in detail.order_release" :key=key>
                <div class="item-left">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="type-date">
                        <span class='type'><img src="../../assets/pic/icon-type.png" alt="" class='icon-type'>{{item.get_one.name}}-{{item.get_two.name}}-{{item.get_three.name}}</span>
                        <span class='date'><img src="../../assets/pic/icon-date.png" alt="" class='icon-date'>{{item.update_time}}</span>
                    </div>
                    <div class="points">
                        {{item.price}} <span class='jifen'>积分</span>
                    </div>
                </div>
                <div class="item-center">
                    <div class="times">
                        次数：{{item.singular}}/{{item.number}}
                    </div>
                    <div class="months">
                        周期：{{item.cycle}}
                    </div>
                </div>
                <div class="item-right">
                    <span class='username'><img src="../../assets/pic/icon-vip.png" alt="" class='icon-vip'>{{item.get_user.name}}</span>
                    <router-link tag='button' :to='{path:"/tcbmain",query:{id:item.id}}' class='getdetail'>查看详情</router-link>
                </div>
            </li>
        </ul>
         <ul class="goodslist" v-if="current=='hasget'">
            <li v-for="(item,key) in detail.order_receive" :key=key>
                <div class="item-left">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="type-date">
                        <span class='type'><img src="../../assets/pic/icon-type.png" alt="" class='icon-type'>{{item.get_one.name}}-{{item.get_two.name}}-{{item.get_three.name}}</span>
                        <span class='date'><img src="../../assets/pic/icon-date.png" alt="" class='icon-date'>{{item.update_time}}</span>
                    </div>
                    <div class="points">
                        {{item.price}} <span class='jifen'>积分</span>
                    </div>
                </div>
                <div class="item-center">
                    <div class="times">
                        次数：{{item.singular}}/{{item.number}}
                    </div>
                    <div class="months">
                        周期：{{item.cycle}}
                    </div>
                </div>
                <div class="item-right">
                    <span class='username'><img src="../../assets/pic/icon-vip.png" alt="" class='icon-vip'>{{item.get_user.name}}</span>
                    <router-link tag='button' :to='{path:"/tcbmain",query:{id:item.id}}' class='getdetail'>查看详情</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      current: "hasget"
    };
  },
  computed: {
    detail: function() {
      return this.$store.state.user_detail;
    }
  },
  mounted() {
    var data = {
      user_id: this.$route.query.id
    };
    this.$http({
      method: "get",
      url: "http://www.youbian.link/api/v1/user/enter_img",
      params: data
    }).then(res => {
      var data = res.data.data;
      this.$store.dispatch("getUserDetail", data);
    });
  }
};
</script>
<style lang="less" scoped>
/*active*/
.active {
  background-color: #dd5519;
  color: white;
  border: 1px solid #dd5519;
}
/*icon*/
.icon-you{
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
.icon-lock{
    width: 21px;
    height: 21px;
    vertical-align: middle;
}
.icon-type{
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-right:4px;
        margin-top: -3px;
}
.icon-date{
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-right:4px;
        margin-top: -4px;
}
.txclick {
  width: 100%;
  background-color: #eff3f5;
  .goodslist {
    border-top: 20px solid #eff3ef;
    margin: auto;
    width: 1200px;
    background-color: #eff3f5;
    .item-left {
      float: left;
      width: 730px;
    }
    .item-center {
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      color: #dd5519;
      border: 1px dashed #dd5519;
      margin-top: 24px;
      float: left;
      width: 140px;
      height: 65px;
      .times {
        background-color: rgba(234, 147, 20, 0.2);
        height: 32px;
        border-bottom: 1px dashed #ea9314;
      }
    }
    .item-right {
      float: left;
      width: 170px;
      margin-left: 100px;
      .username {
        line-height: 30px;
        img {
          vertical-align: middle;
          margin-right: 4px;
          margin-left: 4px;
        }
      }
      .getdetail {
        margin-top: 20px;
        width: 120px;
        height: 30px;
        border-radius: 15px;
        border: 1px solid #ea9314;
        background-color: #fff;
        color: #ea9314;
      }
    }
    li {
      padding: 25px;
      margin-bottom: 20px;
      width: 1150px;
      height: 110px;
      background-color: #fff;
      .title {
        line-height: 32px;
        font-size: 18px;
      }
      .static {
        font-size: 14px;
        color: #8a8a8a;
      }
      .type-date {
        line-height: 30px;
        font-size: 14px;
        .type {
          color: #ea9314;
          margin-right: 25px;
        }
        .date {
          color: #8a8a8a;
        }
      }
      .points {
        color: #dd5519;
        font-size: 18px;
        font-weight: 600;
        .jifen {
          font-size: 14px;
        }
      }
    }
  }
  .userbox {
    overflow: hidden;
    padding: 20px 0 20px 0;
    width: 1200px;
    margin: auto;
    background-color: #fff;
    .user-tx {
      margin-left: 430px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #000;
      float: left;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .user-info {
      color: #666666;
      padding-top: 18px;
      float: left;
      font-size: 16px;
      line-height: 28px;
      .icon {
        vertical-align: middle;
        margin: 0 20px 0 20px;
        width: 16px;
        height: 16px;
      }
      .name {
        color: #595959;
      }
    }
  }
  .btnbox {
    background-color: #fff;
    width: 1200px;
    padding-bottom: 20px;
    margin: auto;
    .btnlist {
      margin: auto;
      width: 770px;
      overflow: hidden;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      li {
        width: 384px;
        float: left;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>

