<template>
    <div class="main">
        <header-com />
        <goods-list />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import GoodsList from '@/components/tcbgroup/goodslist'
    import FooterCom from '@/components/footer'
    export default{
        name:'Tcb',
        data(){
            return {}
        },
        components:{
            HeaderCom,
            GoodsList,
            FooterCom
        },
        created(){
            document.title='优便-订单列表'
        },
        
    }
</script>
<style scoped lang='less'>
</style>
