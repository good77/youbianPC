<template>
    <div class="main">
        <header-com />
        <mine-main />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import MineMain from '@/components/minegroup/minemain'
    import FooterCom from '@/components/footer'
    export default{
        data(){
            return {}
        },
        components:{
            HeaderCom,
            MineMain,
            FooterCom
        },
        created(){
            document.title="优便-个人中心"
            var token = window.sessionStorage.getItem('token');
            if(!token){
                this.$message({
                    message: '您还没有登录',
                    type: 'warning'
                });
                this.$router.push('/user/login')
            }
            window.scrollTo(0,0)
        }
    }
</script>
<style scoped lang='less'>
.main{
    background: #fff;
}
</style>
