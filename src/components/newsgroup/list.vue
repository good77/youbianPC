<template>
<div class="main">
        <div class="detail">
        <p class='guide'>交流分享　>　<span class='vice-guide'>{{list.title}}</span></p>
        <ul class="detailmain">
            <li v-for="(item,index,key) in list.list" :key=key>
                <router-link :to="{path:'/newsmain',query:{id:item.id}}" tag='div' class='itembox'>
                    <div class='itemleft'>
                        <img :src="item.img" alt="">
                    </div>
                    <div class='itemright'>
                        <span class='title'>{{item.title}}</span>
                        <span class='time'>{{item.update_time}}</span>
                    </div>
                </router-link>                
            </li>
        </ul>
    </div>
</div>

</template>
<script>
    export default{
        data(){
            return {
            }
        },
        methods: {
         
        },
        computed:{
            list:function(){
                return this.$store.state.footer2
            }
        },
        mounted(){
            var id = this.$route.query.id;
            this.$store.dispatch('getFooter2',id)
        }
    }
</script>
<style lang="less" scoped>
.main{
    width: 100%;
    background-color: #fff;
}
.detail{
    width: 1200px;
    margin:auto;
    .guide{
        font-size:24px;
        padding:20px 0 20px 0;
        color:#3f3f3f;
        .vice-guide{
            color:#dd5519;
        }
    }
    .detailmain{
        padding-bottom: 30px;
        li{
            border:1px solid #ccc;
            height: 160px;
            margin-bottom: 10px;
            
            padding:30px 10px;
            .itembox{
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
                width: 100%;
                height: 100%;
                .itemleft{
                    width: 260px;
                    overflow: hidden;
                    img{
                        height: 100%;
                    }
                }
                .itemright{
                    width: 850px;
                    .title{
                        font-size:24px;
                        font-weight: 500;
                        color:#666;
                        width: 100%;
                        overflow: ellipsis;
                        white-space: nowrap;
                        display: block;
                        line-height: 60px;
                    }
                    .time{
                        color:#666;
                        width: 100%;
                        display: block;
                        line-height: 40px;
                        margin-top: 55px;
                    }
                }
            }

        }
    }
}
</style>

