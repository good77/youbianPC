<template>
    <div class="main">
        <header-com />
        <news-detail />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import NewsDetail from '@/components/newsgroup/detail'
    import FooterCom from '@/components/footer'
    export default{
        components:{
            HeaderCom,
            NewsDetail,
            FooterCom
        },
        created(){
            document.title='优便-资讯详情'
        },
    }
</script>
<style scoped lang='less'>
</style>
