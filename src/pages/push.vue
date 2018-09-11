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
            }
        }
    }
</script>
<style scoped lang='less'>
</style>

