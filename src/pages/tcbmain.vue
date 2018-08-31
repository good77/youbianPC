<template>
    <div class="main">
        <header-com />
        <tcb-detail />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import Advertise from '@/components/advertise'
    import TcbDetail from '@/components/tcbgroup/tcbdetail'
    import FooterCom from '@/components/footer'
    export default{
        name:'act',
        data(){
            return {

            }
        },
        components:{
            HeaderCom,
            Advertise,
            TcbDetail,
            FooterCom
        },
        methods:{
          
        },
        mounted(){
            window.scrollTo(0,0);
        }
    }
</script>
<style scoped lang='less'>
</style>
