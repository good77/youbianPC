<template>
    <div class="vipup">
        <div class="title">
            <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
            用 户 名 ：<span class='name'>{{userInfo}}</span>
        </div>
        <div class="main">
            <p class='maintitle'>高级会员</p>
            <ul class="viplist">
                <li v-for="(item,index,key) in vip" :key=key>
                    <div class="vipbox" v-on:click="isActive=index;points=item.now_price;member_time=index" :class="{active2:isActive==index}">
                        <div class="left" v-if="item.now_price!=item.old_price">
                            <p class='xianjia' :class="{active:isActive==index}">{{item.now_price}}</p>
                            <p class='yuanjia' :class="{active:isActive==index}">{{item.old_price}}</p>
                            <p class='zhekou' :class="{active:isActive==index}">立省{{item.discount}}积分</p>
                        </div>
                        <div class="left" v-else="item.now_price!=item.old_price">
                            <div class="paddingbox"></div>
                            <p class='xianjia' :class="{active:isActive==index}">{{item.now_price}}<span class='size-12'>积分</span></p>
                        </div>
                        <div class="right"  :class="{active1:isActive==index}">
                            {{item.member_time}}
                            <i class='el-icon-check'></i>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="topay" @click="pay">确认支付<span>{{points}}</span>积分</button>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
    export default{
        data(){
            return {
                isActive:0,
                points:88,
                member_time:0,
            }
        },
        computed:{
            userInfo:function(){
                return this.$store.state.vip.name
            },
            vip:function(){
                return this.$store.state.vip.rule
            }
        },
        mounted(){
            this.$http.get(
                'http://www.youbian.link/api/v1/user/user_member',
                {headers:{token:Token.fetch()}}
            ).then(res=>{
                if(res.data.code==400){

                }else{
                    console.log(res.data.data)
                    this.$store.dispatch('getVip',res.data.data)
                }
            })
        },
        methods:{
            pay(){
                var now_price = this.points;
                var member_time = this.member_time;
                var data = {
                    now_price,
                    member_time
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/user/open_members',
                    data,
                    {headers:{token:Token.fetch()}}
                ).then(res=>{
                    if(res.data.code==400){

                    }else{
                         this.$message({
                                message: '续费成功',
                                type: 'success'
                            });
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.paddingbox{
    padding-top:22px;
}
/*line-height*/
.active{
    color:#dd5519;
}
.active1{
    background-color: #dd5519 !important;
}
.active2{
        border-color: #dd5519 !important;
}
.size-12{
    font-size:14px;
}
.lh60{
    line-height: 90px;
    text-indent:75px;
}
.vipup{
    .title{
        text-indent:15px;;
        color:#737373;
        font-size:18px;
        line-height: 77px;
        height: 77px;
        border-bottom:1px solid #e1e1e1;
        img{
            height: 18px;
            margin-right:20px;
            vertical-align: middle;
        }
    }
    .main{
        padding:20px;
        .maintitle{
            font-size:18px;
            font-weight: 600;
            color:#404040;
        }
        .viplist{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding:30px 140px 20px 140px;
            .vipbox{
                box-sizing: border-box;
                margin-bottom:30px;
                overflow: hidden;
                width: 244px;
                height: 96px;
                border:2px solid #999999;
                border-radius:4px;
                .left{
                    color:#999;
                    width: 200px;
                    text-align: center;
                    float: left;
                    .xianjia{
                        font-size:38px;
                    }
                    .yuanjia{
                        text-decoration: line-through;
                    }
                }
                .right{
                    color:#fff;
                    padding:9px;
                    background-color: #999999;
                    width: 18px;
                    float: right;
                }
            }
        }
        .topay{
            height: 40px;
            width: 280px;
            background-color: #dd5519;
            border:0;
            color:#fff;
            font-size:18px;
            margin-left:350px;;
        }
    }
}
</style>

