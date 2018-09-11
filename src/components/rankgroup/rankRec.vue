<template>
    <div class="rank">
        <div class="rankbg" style='position:relative'>
            <img src="../../assets/pic/rankbg.png" alt="" style='postion:absolute'>
            <div class="user-first user" v-if="rank.length>0">
                <div class="circle">
                    <img :src="rank[0].get_user.img" alt="" v-if="rank[0].get_user.img">
                     <img src="../../assets/default.jpg" alt="" v-else="rank[0].get_user.img">
                </div>
                <p>{{rank[0].get_user.name}}</p>
                <p>接单数量 : {{rank[0].sum}}</p>
            </div>
            <div class="user-second user" v-if="rank.length>1">
                <div class="circle">
                     <img :src="rank[1].get_user.img" alt="" v-if="rank[1].get_user.img">
                     <img src="../../assets/default.jpg" alt="" v-else="rank[1].get_user.img">
                </div>
                <p>{{rank[1].get_user.name}}</p>
            </div>
            <div class="user-third user" v-if="rank.length>2">
                <div class="circle">
                     <img :src="rank[2].get_user.img" alt="" v-if="rank[2].get_user.img">
                     <img src="../../assets/default.jpg" alt="" v-else="rank[2].get_user.img">
                </div>
                <p>{{rank[2].get_user.name}}</p>
            </div>
        </div>
        <ul class="time-tab">
            <li>
                <div class="btn-box" v-on:click=timetab(1)>
                    <img src='../../assets/pic/ribang1.png' alt="" v-show="bangdan.ri1">
                    <img src='../../assets/pic/ribang2.png' alt="" v-show="bangdan.ri2">
                </div>
            </li>
            <li>
                 <div class="btn-box"  v-on:click=timetab(2)>
                    <img src='../../assets/pic/zhoubang1.png' alt="" v-show="bangdan.zhou1">
                    <img src='../../assets/pic/zhoubang2.png' alt="" v-show="bangdan.zhou2">
                </div>
            </li>
            <li>
                 <div class="btn-box"  v-on:click=timetab(3)>
                    <img src='../../assets/pic/yuebang1.png' alt="" v-show="bangdan.yue1">
                    <img src='../../assets/pic/yuebang2.png' alt="" v-show="bangdan.yue2">
                </div>
            </li>
        </ul>
        <div class="ranklist">
            <table>
                <tr class='table-tip'>
                    <td class='ranknum'>排名</td>
                    <td class='rankorder'>接收订单</td>
                    <td class='rankuser'>用户名称</td>
                </tr>
                <tr class='color-fdbb30' v-for="(item,index,key) in rank">
                    <td class='ranknum' v-if="index==0"><img src="../../assets/pic/rank-first.png" alt="" class='icon-rank'></td>
                    <td class='ranknum' v-if="index==1"><img src="../../assets/pic/rank-second.png" alt="" class='icon-rank'></td>
                    <td class='ranknum' v-if="index==2"><img src="../../assets/pic/rank-third.png" alt="" class='icon-rank'></td>
                    <td class='rankorder'>{{item.sum}}</td>
                    <td class='rankuser'>{{item.get_user.name}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    export default{
        computed:{
            rank:function(){
                return this.$store.state.rankRec
            }
        },
        data(){
            return {
                bangdan:{
                    ri2:true,ri1:false,zhou1:false,zhou2:true,yue2:false,yue1:true
                },
                type:3,
            }
        },
        methods:{
            timetab(num){
                if(num==1){
                    this.bangdan={
                        ri1:true,ri2:false,zhou1:false,zhou2:true,yue1:false,yue2:true
                    }
                    this.type=1;
                }
                else if(num==2){
                    this.bangdan={
                        ri1:false,ri2:true,zhou1:true,zhou2:false,yue1:false,yue2:true
                    }
                    this.type=2;
                } else if(num==3){
                    this.bangdan={
                        ri1:false,ri2:true,zhou1:false,zhou2:true,yue1:true,yue2:false
                    }
                    this.type=3;
                }
                this.$store.dispatch('getRankRec',this.type)
            },
            changetype(){

            }
        },
        mounted(){
            this.$store.dispatch('getRankRec',this.type)
        },
    }
</script>
<style scoped lang='less'>
/* class='color-fdbb30'*/
.color-fdbb30{
    color:#fdbb30;
}
.icon-rank{
    vertical-align: middle;
    width: 40px;
}
/**/
.rank {
    width:100%;
    border-bottom:1px solid #d6d9da;
  .rankbg {
    margin: auto;
    width: 1200px;
    height: 526px;
    position: relative;
    .user {
      position: absolute;
      text-align: center;
      color: #fff;
      overflow: hidden;
    }
    .user-first {
      left: 500px;
      top: 174px;
      .circle {
          overflow: hidden;
        width: 208px;
        height: 208px;
        border-radius: 50%;
        background-color: #000;
        margin-bottom: 30px;
        img{
            width: 100%;

        }
      }
    }
    .user-second {
      .circle {
        width: 162px;
        height: 162px;
        border-radius: 50%;
        background-color: #000;
        margin-bottom: 30px;
        overflow: hidden;
        img{
            width: 100%;
        }
      }
      left: 277px;
      top: 225px;
    }
    .user-third {
      .circle {
        width: 162px;
        height: 162px;
        border-radius: 50%;
        background-color: #000;
        margin-bottom: 30px;
      }
      left: 767px;
      top: 215px;
    }
  }
  .time-tab{
      padding:60px 0 60px 0;
      width: 1200px;
      margin:auto;
      display: flex;
      justify-content: space-around;
      li{
          width: 400px;
          height: 90px;
          text-align: center;
          .btn-box{
              position: relative;
              img{
                  position: absolute;
                  top:0;
                  left:65px;
              }
          }
      }
  }
  .ranklist {
      table{
          border-collapse: collapse;
          margin-bottom:60px;
      }
      text-align: center;
      width: 1200px;
      margin:auto;
        tr{
            border-bottom:solid 1px #999;
            width: 1200px;
            height: 60px;
            line-height: 60px;
            .ranknum{
                width: 110px;

            }
            .rankorder{
                width: 960px;
            }
            .rankuser{
                width: 130px;
            }
        }
        .table-tip{
            color:#dd5519;
        }
  }
}
</style>

