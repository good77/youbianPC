<template>
    <div class="main">
        <header-com />
        <option-box />
        <goods-list />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import Advertise from '@/components/advertise'
    import OptionBox from '@/components/tcbgroup/optionbox'
    import GoodsList from '@/components/tcbgroup/goodslist'
    import FooterCom from '@/components/footer'
    export default{
        name:'Tcb',
        data(){
            return {}
        },
        components:{
            HeaderCom,
            Advertise,
            OptionBox,
            GoodsList,
            FooterCom
        }
    }
</script>
<style scoped lang='less'>
</style>
