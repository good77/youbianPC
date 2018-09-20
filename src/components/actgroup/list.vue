<template>
    <div class="main">
        <div class="banner">
            <img :src="banner.img" alt="">
        </div>
        <ul class="acttabs">
            <li @click='getList(0,$event)' :class="{active:isActive==0}" style='position:relative'>
                进行中
                <img src="../../assets/pic/guide.png" alt="" style='position:absolute;bottom:-10px;left:20px;' v-if="isActive==0">
            </li>
            <li  @click='getList(1,$event)' :class="{active:isActive==1}" style='position:relative'>
                长期活动
                <img src="../../assets/pic/guide.png" alt="" style='position:absolute;bottom:-10px;left:20px;' v-if="isActive==1">
            </li>
            <li @click='getList(2,$event)' :class="{active:isActive==2}" style='position:relative'>
                已结束
                <img src="../../assets/pic/guide.png" alt="" style='position:absolute;bottom:-10px;left:20px;' v-if="isActive==2">
            </li>
        </ul>
        <ul class="actlist">
            <li class='actitem' v-for='(item,index,key) in actList.data' v-if="index>=((pagenum-1)*10)&&index<(pagenum*10)" :key="key">
                <div class="itemmain"  v-if='item.is_img==0'>
                    <p class="title">{{item.title_one}}</p>
                    <p class="vicetitle">{{item.title_two}}</p>
                    <p class="content">{{item.title_three}}</p>
                </div>
                <div class="itemmain-else" v-if='item.is_img==1'>
                    <img :src="item.img" alt="">
                </div>
                <button @click='goact(item.id)' class='getdetail'>查看详情</button>
            </li>
        </ul>
         <div class="pagerbox"  v-if="actList.data.length>0">
            <div class="pager">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="actList.data.length"
                class='pager'
                @prev-click="prev"
                @next-click="next"
                @current-change="current"
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
                isActive:0,
                pagenum:1
            }
        },
        methods:{
            getList(type){
                this.isActive=type;
                this.$store.dispatch('getAct',type)
            },
            goact(id){
                window.open('./#/actmain?id='+id)
            },
            prev(num){
                this.pagenum=num
            },
            next(num){
                this.pagenum=num
            },
            current(num){
                this.pagenum=num
            },
        },
        computed:{
            banner:function(){
                return this.$store.state.actBanner
            },
            actList:function(){
                return this.$store.state.actList
            },
            total:function(){
                 return this.$store.state.actList.total
            }
        }
    }
</script>
<style scoped lang='less'>
.active{
    color:#dd5519 !important;
    font-size:21px;
    font-weight: 600;
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
/*choose*/
#choose{
    color:#ea9314;
}
.main{
    .banner{
        width: 1200px;
        height: 570px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    width: 1200px;
    margin:auto;
    .acttabs{
        height: 60px;
        border-bottom:2px solid #999999;
        li{
            font-size:20px;
            color:#404040;
            float: left;
            line-height: 60px;
            text-align: center;
            width: 200px;
            margin-left:100px;
            margin-right:100px;
            height: 60px;
        }
        li:hover{
            cursor: pointer;
            color:#dd5519;
            font-weight: 600;
            font-size: 21px;
        }
    }
    .actlist{
        overflow: hidden;
        padding-top:40px;
        li{
            float: left;
            margin-bottom: 40px;
        }
        li:nth-child(2n){
            float: right;
        }
        .actitem{
            width: 580px;
            .itemmain{
                overflow: hidden;
                position: relative;
                color:#fff;
                padding:25px;
                width: 530px;
                height: 250px;
                border-radius:10px;
                background-color: #fab88e;
                margin-bottom:20px;
                .title{
                    text-shadow: 0.1em 0.1em 0.2em black;
                    font-size:50px;
                    margin-bottom:40px;
                }
                .vicetitle{
                    font-size:28px;
                }
                .content{
                    font-size:28px;
                }
                .act-img{
                    width: 300px;
                    height: 200px;
                    position:absolute;
                    right:0;
                    bottom:0;
                }
            }
            .itemmain-else{
                width: 580px;
                height: 300px;
                border-radius:10px;
                overflow: hidden;
                 margin-bottom:20px;
                img{
                    transition: all .5s;
                    width:100%;
                    height: 100%;
                }
                img:hover{
                    transform: scale(1.05);
                }
            }
            .getdetail{
                margin-left:20px;
                width: 120px;
                height: 30px;
                border-radius:15px;
                border:1px solid #ea9314;
                background-color: #fff;
                color:#ea9314;
            }
            .getdetail:hover{
                color:#fff;
                background-color: #ea9314;
            }
        }
    }
}
</style>

