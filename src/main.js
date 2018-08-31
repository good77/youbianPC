// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
/*配置axios*/
import axios from 'axios'
Vue.prototype.$http=axios;
/*省市区三级联动*/ 
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)
/*图片上传*/
Vue.component('ImgInputer', ImgInputer)
/*swiper*/
Vue.use(VueAwesomeSwiper)
//
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
