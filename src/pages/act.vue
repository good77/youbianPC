<template>
    <div class="main">
        <header-com />
        <act-list />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import Advertise from '@/components/advertise'
    import ActList from '@/components/actgroup/list'
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
            ActList,
            FooterCom
        },
        methods:{
          
        },
        mounted(){
            this.$store.dispatch('getAct',0)
        },
        created(){
            document.title='优便-活动中心'
        },
    }
</script>
<style scoped lang='less'>
</style>
