<template>
    <div>
      <swiper :options="swiperOption" ref="mySwiper" class='advertise'>
        <!-- slides -->
        <swiper-slide v-for='(item,key) in banner' :key=key>
          <router-link tag='div' :to="{path:'/actmain',query:{id:item.id}}">
            <img :src="item.img" alt="">
          </router-link>
          </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div> 
</template>
<script>
import 'swiper/dist/css/swiper.css' 
    export default {
    data() {
      return {
        swiperOption: {
            autoplay: true,
            direction : 'horizontal',
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        },
      }
    },
    computed:{
      banner:function(){
        console.log(this.$store.state.bannerList)
        return this.$store.state.bannerList
      }
    },
  }
</script>
<style scoped lang='less'>
.advertise{
    margin:auto;
    width: 1200px;
    height: 560px;
    img{
      width: 100%;
    }
}
</style>

