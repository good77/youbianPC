<template>
<div class="main">
        <div class="detail">
        <p class='guide'>{{detail.category}}　>　<span class='vice-guide'>{{detail.title}}</span></p>
        <div class="detailmain">
            <p class='title'>{{detail.title_one}}</p>
            <div v-html='detail.content'></div>
        </div>
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
            detail:function(){
                return this.$store.state.footer1
            }
        },
        watch:{
            $route:function(){
                var id = this.$route.query.id;
                var title_id = this.$route.query.title_id;
                if(id){
                    this.$store.dispatch('getFooter3',id)
                }
                if(title_id){
                    this.$store.dispatch('getFooter1',title_id)
                }
            }
        },
        mounted(){
            var id = this.$route.query.id;
            var title_id = this.$route.query.title_id;
            if(id){
                this.$store.dispatch('getFooter3',id)
            }
            if(title_id){
                 this.$store.dispatch('getFooter1',title_id)
            }
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
        .title{
            font-size:30px;
            font-weight: 500;
            width: 100%;
            text-align: center;
            margin-bottom:40px;
        }
        .pic{
            width:100%;  
            height: 400px;
            margin-bottom:40px;
        }
    }
}
</style>

