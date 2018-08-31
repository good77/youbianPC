<template>
    <div class="main">
        <header-com />
        <router-view></router-view>
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import FooterCom from '@/components/footer'
    export default{
        name:'Register',
        data(){
            return {}
        },
        components:{
            HeaderCom,
            FooterCom
        },
    }
</script>
<style scoped lang='less'>

</style>
