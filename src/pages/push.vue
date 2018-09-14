<template>
    <div class="pushinfo">
        <header-com />
        <router-view></router-view>
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import FooterCom from '@/components/footer'
    export default{
        name:'pushinfo',
        data(){
            return {
                
            }
        },
        components:{
            HeaderCom,
            FooterCom
        },
        created(){
            if(!window.sessionStorage.getItem('token')){
                this.$router.push('/user/login')
                this.$message({
                    type:'warning',
                    message:'抱歉，需要登录后才能发布信息'
                })
            }
        }
    }
</script>
<style scoped lang='less'>
</style>

