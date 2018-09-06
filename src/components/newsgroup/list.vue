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
        watch:{
            $route:function(){
                var id = this.$route.query.id;
                var title_id = this.$route.query.title_id;
                if(id){
                    this.$store.dispatch('getFooter2',id)
                }
                if(title_id){
                    this.$store.dispatch('getFooter1',title_id)
                }
                window.scrollTo(0,0);  
            }
        },
        computed:{
            list:function(){
                return this.$store.state.footer2
            }
        },
        mounted(){
            var id = this.$route.query.id;
            this.$store.dispatch('getFooter2',id)
            window.scrollTo(0,0);  
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
        font-size:16px;
        padding:20px 0 20px 0;
        color:#3f3f3f;
        .vice-guide{
            color:#dd5519;
        }
    }
    .detailmain{
        padding-bottom: 30px;
        li:hover{
            border:1px solid #999;
            cursor: pointer;
            box-shadow: 1px 1px 5px #eaeaea;
        }
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
                        font-size:20px;
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

