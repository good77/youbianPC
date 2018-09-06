<template>
  <div id="app">
    <router-view/>
    <div class="lianxikefu">
        <div class="kefu">
          <i class='iconfont icon-kefu'></i>
        </div>
        <div class="gotop">
          <i class='iconfont icon-top' @click='gotop'></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
       this.$store.dispatch('getIndex')
        this.$store.dispatch('getFooter')
  },
  methods:{
    gotop(){
          var scrollToTop = window.setInterval(function() {
              var pos = window.pageYOffset;
              if ( pos > 0 ) {
                  window.scrollTo( 0, pos - 50 ); // how far to scroll on each step
              } else {
                  window.clearInterval( scrollToTop );
              }
          }, 5);
    }
  }
}
</script>

<style>
@import 'http://at.alicdn.com/t/font_750395_mtdj62zl78.css';
*{
  padding:0;
  margin:0;
}
body{
  background-color: #eff3f5;
  font-size:14px;
}
input,button,textarea{
  outline: none !important;
}
li{
  list-style: none;
}
button:hover{
  cursor: pointer;
}
/**/
.lianxikefu{
  position:fixed;
  bottom: 50px;
  right:50px;
  background-color: #fff;
  border:1px solid #eaeaea;
  padding:4px;
  border-radius:3px;
}
.kefu,.gotop{
  width: 50px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color:#999;
}
.kefu:hover,.gotop:hover{
  color:#dd5519;
  cursor: pointer;
}
.kefu{
  border-bottom:1px solid #eaeaea;
}
.icon-kefu{
  font-size:40px!important;
}
.icon-top{
  font-size:50px!important;
}
</style>
