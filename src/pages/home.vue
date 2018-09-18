<template>
    <div class="main">
        <header-com />
        <advertise/>
        <typelist />
        <menu-com />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import Advertise from '@/components/advertise'
    import Typelist from '@/components/homegroup/typelist'
    import MenuCom from '@/components/homegroup/menu'
    import FooterCom from '@/components/footer'
    export default{
        name:'Home',
        data(){
            return {}
        },
        created(){
            document.title='优便'
        },
        components:{
            HeaderCom,
            Advertise,
            Typelist,
            MenuCom,
            FooterCom
        },
    }
</script>
<style scoped lang='less'>
</style>
