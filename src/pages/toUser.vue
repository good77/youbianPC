<template>
    <div class="main">
        <header-com />
        <tx-click />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import TxClick from '@/components/tcbgroup/txclick'
    import FooterCom from '@/components/footer'
    export default{
        data(){
            return {
                
            }
        },
        created(){
            document.title='优便-查看用户'
        },
        components:{
            HeaderCom,
            TxClick,
            FooterCom
        },
        methods:{
          
        }
    }
</script>
<style scoped lang='less'>
</style>
