<template>
    <div class="detail">
        <div class="top">
            <div class="abstract">
                 <div class="item-left">
                    <div class="title">
                        {{goodsDetail.title}}
                        <span :v-show="goodsDetail.encryption==1">
                            <img src="../../assets/pic/icon-you.png" alt="" class='icon-you'>
                        </span>
                        <span :v-show="goodsDetail.encryption==1">
                            <img src="../../assets/pic/icon-lock.png" alt="" class='icon-lock'>
                        </span>
                    </div>
                    <div class="type-date">
                        <span class='type'><img src="../../assets/pic/icon-type.png" alt="" class='icon-type'>{{goodsDetail.get_one.name}}-{{goodsDetail.get_two.name}}-{{goodsDetail.get_three.name}}</span>
                        <span class='date'><img src="../../assets/pic/icon-date.png" alt="" class='icon-date'>{{goodsDetail.update_time}}</span>
                    </div>
                    <div class="points">
                        {{goodsDetail.price}} <span class='jifen'>积分</span>
                    </div>
                </div>
                <div class="item-center">
                    <div class="times">
                        次数：{{goodsDetail.singular}}/{{goodsDetail.number}}
                    </div>
                    <div class="months">
                        周期：{{goodsDetail.cycle}}
                    </div>
                </div>
                <div class="abs-bottom">
                    <button class='ljjd' @click='getOrder'>立即接单</button>
                    <a target="_blank"  :href="goodsDetail.file" download="w3logo" class='xzfj'><i class='el-icon-download'></i> 下载附件</a>
                    <button class='fxdd'><i class='el-icon-share'></i>分享订单</button>
                </div>
            </div>
            <div class="userbox">
                <router-link :to="{path:'/gtu',query:{id:goodsDetail.get_user.id}}" tag='div' class="bigtx">
                    <img :src="goodsDetail.get_user.img" alt="">
                </router-link>
                <p class='username'>{{goodsDetail.get_user.name}}</p>
                <div class="jiefabox">
                    <div>
                        <p>发单</p>
                        <p class='number'>{{goodsDetail.release_num}}</p>
                    </div>
                    <div>
                        <p>接单</p>
                        <p class='number'>{{goodsDetail.receive_num}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="info">
                <div class="info-main">
                    <p class='xxxx'>详细信息</p>
                    <video :src="goodsDetail.url" v-if="goodsDetail.url" controls="controls" class='videobox'>
                        您的浏览器不支持 video 标签。
                    </video>
                    <div v-html='goodsDetail.describe'></div>
                </div>
                <div class="comments">
                    <p class='qbpl'>全部评论({{goodsDetail.order_comments.length}})</p>
                    <ul class="commentlist">
                        <li v-for="(item,key) in goodsDetail.order_comments" :key=key>
                            <div class="comment-left">
                                <div class="txbox">
                                    <img src="../../assets/pic/icon-vip.png" alt="">
                                </div>
                            </div>
                            <div class="comment-right">
                                <div class="username">{{item.get_user.name}}<span class='times-ago'>{{item.create_time}}</span></div>
                                <div class="comment-content">
                                    {{item.content_receive}}
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div class="advice">
                <ul class='advlist'>
                    <li v-for="(item,key) in goodsDetail.order_similar" :key=key>
                    <div class="item-left">
                            <div class="title">
                                {{item.title}}
                            </div>
                            <div class="type-date">
                                <div class='type'><img src="../../assets/pic/icon-type.png" alt="" class='icon-type'>{{item.get_one.name}}-{{item.get_two.name}}-{{item.get_three.name}}</div>
                                <div class='date'><img src="../../assets/pic/icon-date.png" alt="" class='icon-date'>{{item.update_time}}</div>
                            </div>
                            <div class="points">
                                {{item.price}}<span class='jifen'>积分</span>
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
                        <router-link tag='div' :to="{path:'/tcbmain',query:{id:item.id}}" class="item-bottom">
                            查看详情
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
export default {
    data(){
        return{
          id:this.$route.query.id
        }
    },
  computed:{
      goodsDetail:function(){
          return this.$store.state.goodsDetail
      }
  },
  watch:{
      $route:function(){
           var id = this.$route.query.id;
          this.$store.dispatch('getGoodsDetail',id);
      }
  },
  methods: {
    getOrder(){
      if(Token.fetch()){
         var data = {
           order_id:this.id
         }
          this.$http.post(
            'http://www.youbian.link/api/v1/receive/receive_order',
            data,
            {
              headers:{token:Token.fetch()}
            }
          ).then(res=>{
              if(res.data.code==200){
                this.$message({
                    message: res.data.message,
                    type: 'success'
                });
                this.$router.push('/mine/yjsd')
              }else{
                this.$message({
                    message: res.data.message,
                    type: 'warning'
                });
              }
          })
      }else{
         this.$message({
              message: '您还没有登录',
              type: 'warning'
          });
      }     
    }
  },
  mounted(){
    var id = this.$route.query.id;
    this.$store.dispatch('getGoodsDetail',id);
  }
};
</script>
<style lang="less" scoped>
/*icon*/
.icon-you {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.icon-lock {
  width: 21px;
  height: 21px;
  vertical-align: middle;
}
.icon-type {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 4px;
}
.icon-date {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 4px;
}
.detail {
    margin-bottom:30px;
  width: 100%;
  padding-top: 15px;
  background-color: #eff3f5;
  .top {
    overflow: hidden;
    width: 1200px;
    margin: auto;
    margin-bottom: 20px;
    .abstract {
      overflow: hidden;
      padding: 30px;
      background-color: #fff;
      width: 820px;
      height: 150px;
      float: left;
      .item-left {
        float: left;
        width: 640px;
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
      .abs-bottom {
        float: left;
        padding-top: 20px;
        .ljjd {
          width: 200px;
          height: 40px;
          color: #fff;
          border: 0;
          border-radius: 4px;
          background-color: #ea910f;
        }
        .xzfj{
            color:#727272;
            text-decoration: none
        }
        .xzfj:hover {
          cursor: pointer;
          color: #ea910f;
        }
        .fxdd {
          margin-left: 360px;
          width: 108px;
          height: 30px;
          border: 1px solid #ea910f;
          border-radius: 4px;
          background-color: #fff;
          color: #ea910f;
        }
      }
    }
    .userbox {
      padding: 30px;
      background-color: #fff;
      float: right;
      width: 240px;
      height: 150px;
      .bigtx {
          overflow: hidden;
        margin: auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #eff3f5;
        line-height: 80px;
        text-align: center;
        margin-bottom: 10px;
        img{
            width: 100%;
        }
      }
      .username {
        text-align: center;
        margin-bottom: 10px;
      }
      .jiefabox {
        div {
          font-size: 14px;
          width: 120px;
          text-align: center;
          float: left;
          color: #c0c0c0;
          .number {
            color: #727272;
          }
        }
      }
    }
  }
  .main {
    width: 1200px;
    margin: auto;
    overflow: hidden;
    .info {
      float: left;
      .info-main {
        margin-bottom: 20px;
        padding: 30px;
        background-color: #fff;
        width: 820px;
        .xxxx {
          margin-bottom: 50px;
        }
        .videobox {
          width: 810px;
          height: 410px;
        }
      }
      .comments {
        width: 820px;
        padding: 30px;
        background-color: #fff;
        .qbpl {
          display: block;
          padding-bottom: 30px;
          border-bottom: 1px solid #eff3f5;
        }
        .commentlist {
            margin-top:20px;
          li {
            padding-bottom: 120px;
          }
          overflow: hidden;
          background-color: #fff;
          .comment-left {
            width: 60px;
            float: left;
            .txbox {
                text-align: center;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #eff3f5;
              line-height: 40px;
              img {
                vertical-align: middle;
              }
            }
          }
          .comment-right {
            width: 760px;
            float: left;
            .username {
              line-height: 40px;
              color: #3f3f3f;
              margin-bottom: 10px;
              .times-ago {
                margin-left: 10px;
                font-size: 14px;
                color: #aaaaaa;
              }
            }
            .comment-content {
              color: #565656;
            }
          }
        }
      }
    }
    .advice {
      float: right;
      width: 300px;
      .advlist {
        li {
            margin-bottom: 20px;
          padding-top: 30px;
          background-color: #fff;
          width: 300px;
          border-radius: 6px;
          overflow: hidden;
          .title {
            padding: 0 30px 0 30px;
            font-size: 16px;
            font-weight: 600;
            color: #3f3f3f;
            width: 240px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .static {
            padding: 0 30px 0 30px;
            width: 240px;
            font-size: 14px;
            color: #939393;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
          }
          .type-date {
            padding: 0 30px 0 30px;
            .type {
              line-height: 20px;
              color: #ea910f;
              font-size: 14px;
            }
            .date {
              color: #a5a5a5;
              line-height: 22px;
            }
          }
          .points {
            padding: 0 30px 0 30px;
            color: #dd5519;
            font-size: 18px;
            font-weight: 600;
            .jifen {
              font-size: 14px;
            }
          }
          .item-center {
              overflow: hidden;
            line-height: 32px;
            text-align: center;
            font-size: 16px;
            color: #dd5519;
            border: 1px dashed #dd5519;
            margin-top: 24px;
            width: 297px;
            .times {
              width: 148px;
              float: left;
              background-color: rgba(234, 147, 20, 0.2);
              border-right: 1px dashed #dd5519;
              height: 32px;
            }
            .months {
              width: 148px;
              float: left;
              height: 32px;
            }
          }
          .item-bottom{
              width: 300px;
              height: 60px;
              background-color: #dd5519;
              color:#fff;
              text-align: center;
              line-height: 60px;
          }
        }
      }
    }
  }
}
</style>

