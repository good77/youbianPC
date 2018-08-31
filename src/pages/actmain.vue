<template>
    <div class="main">
        <header-com />
        <act-detail />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import ActDetail from '@/components/actgroup/detail'
    import FooterCom from '@/components/footer'
    export default{
        name:'act',
        data(){
            return {

            }
        },
        components:{
            HeaderCom,
            ActDetail,
            FooterCom
        },
        methods:{
          
        },
        mounted(){
            var id = this.$route.query.id;
            console.log(id)
            this.$store.dispatch('getActMain',id)
        }
    }
</script>
<style scoped lang='less'>
</style>
