<template>
    <div>
        <ul class="sort">
            <li :class='{isActive:sort==0}' @click='getsort(0)'>综合↑</li>
            <li :class='{isActive:sort==1}' @click='getsort(1)'>价格↑</li>
            <li :class='{isActive:sort==2}' @click='getsort(2)'>完成时间↑</li>
            <li :class='{isActive:sort==3}' @click='getsort(3)'>发布数量↑</li>
        </ul>
        <ul class="goodslist">
            <li v-for='(item,key) in goodsList' :key=key>
                <div class="item-left">
                    <div class="title">
                        <router-link tag='span' :to='{path:"/tcbmain",query:{id:item.id}}' class='getdetail'>{{item.title}}</router-link>
                        <span v-show="true">
                            <img src="../../assets/pic/icon-you.png" alt="" class='icon-you'>
                        </span>
                        <span v-show="true">
                            <img src="../../assets/pic/icon-lock.png" alt="" class='icon-lock'>
                        </span>
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
                    <router-link tag='span' :to="{path:'/gtu',query:{id:item.get_user.id}}" class='username'><img src="../../assets/pic/icon-vip.png" alt="" class='icon-vip'>{{item.get_user.name}}</router-link>
                    <router-link tag='button' :to='{path:"/tcbmain",query:{id:item.id}}' class='getdetail'>查看详情</router-link>
                </div>
            </li>
        </ul>
        <div class="pagerbox">
            <div class="pager">
                <el-pagination
                background
                layout="prev, pager, next"
                :total=total
                class='pager'
                >
            </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
               level_one:this.$route.query.level_one,
               level_two:this.$route.query.level_two,
               level_three:this.$route.query.level_three,
               sort:0
            }
        },
        methods: {
           getsort(num){
               this.sort=num;
                    var data ={
                    level_one:this.level_one,
                    level_two:this.level_two,
                    level_three:this.level_three,
                    order_status:this.sort
                }
                console.log(data)
                this.$store.dispatch('getGoodsList',data)
            }
        },
        computed:{
            goodsList:function(){
                return this.$store.state.goodsList;
            },
            total:function(){
                return this.$store.state.goodsList.length;
            }
        },
        mounted(){
            var data ={
                level_one:this.level_one,
                level_two:this.level_two,
                level_three:this.level_three,
                order_status:this.sort
            }
            this.$store.dispatch('getGoodsList',data)
        }
    }
</script>
<style lang="less" scoped>
//
.isActive{
    color:#ea9314;
    border-bottom: 3px solid #ea9314;
}


/*分页*/
.pagerbox{
    overflow: hidden;
    margin:auto;
    width: 1200px;
    margin-bottom:12px;
    .pager{
        float: right;
    }
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
/**/
.sort{
    border-top:20px solid #eff3f5;
    background-color: #fff;
    width: 1200px;
    margin:auto;
    display: flex;
    justify-content: flex-start;
    border-bottom:1px solid #eff3f5;
    li{
        height: 50px;
        line-height: 50px;
        margin:0 20px;
        text-align: center;
    }
}
.goodslist{
    margin:auto;
    width: 1200px;
    background-color: #eff3f5;
    .item-left{
        float: left;
        width: 730px;
    }
    .item-center{
        line-height: 32px;
        text-align: center;
        font-size:16px;
        color:#dd5519;
        border:1px dashed #dd5519;
        margin-top:24px;
        float: left;
        width: 140px;
        height: 65px;
        .times{
            background-color:rgba(234,147,20,0.2);
            height: 32px;
            border-bottom: 1px dashed #ea9314;
        }
    }
    .item-right{
        float: left;
        width: 170px;
        margin-left:100px;
        .username{
            line-height: 30px;
            img{
                vertical-align: middle;
                margin-right:4px;
                margin-left:4px;
            }
        }
        .username:hover{
            cursor: pointer;
        }
        .getdetail{
            margin-top:20px;
            width: 120px;
            height: 30px;
            border-radius:15px;
            border:1px solid #ea9314;
            background-color: #fff;
            color:#ea9314;
        }
        .getdetail:hover{
            background-color: #ea9314;
            color:#fff;
        }
    }
    li{
        padding:25px;
        margin-bottom:20px;
        width: 1150px;
        height: 110px;
        background-color: #fff;   
        .title{
            line-height: 32px;
            font-size:18px;
        }
        .title:hover{
            cursor: pointer;
            color:#999;
        }
        .static{
            font-size:14px;
            color:#8a8a8a;
        }
        .type-date{
            line-height: 30px;
            font-size:14px;
            .type{
                color:#ea9314;
                margin-right:25px;
            }
            .date{
                color:#8a8a8a;
            }
        }
        .points{
            color:#dd5519;
            font-size:18px;
            font-weight: 600;
            .jifen{
                font-size: 14px;
            }
        }
    }
}
</style>

