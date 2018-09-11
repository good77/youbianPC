<template>
<div class="main">
        <div class="detail">
        <p class='guide'><span @click='back' style='cursor:pointer'>活动专区</span>   　>　<span class='vice-guide'>活动详情</span></p>
        <div class="detailmain">
            <p class='title'>{{actMain.title_one}}</p>
            <div v-html='actMain.content'></div>
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
            back(){
                this.$router.push('/act')
            }
        },
        computed:{
            actMain:function(){
                return this.$store.state.actMain
            }
        },
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

