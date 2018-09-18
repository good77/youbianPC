<template>
    <div class="main">
        <header-com />
        <news-list />
        <footer-com />
    </div>
</template>
<script>
    import HeaderCom from '@/components/header'
    import NewsList from '@/components/newsgroup/list'
    import FooterCom from '@/components/footer'
    export default{
        components:{
            HeaderCom,
            NewsList,
            FooterCom
        },
        created(){
            document.title='优便-资讯中心'
        },
    }
</script>
<style scoped lang='less'>
</style>
