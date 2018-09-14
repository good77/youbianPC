<template>
<div class="main">
     <div class="menu">
        <p class='menu-title'>优便服务分类</p>
        <p class='title-text'>1300万订单等你挑选接收 打造最佳优便品质</p>
        <ul class='menu-list'>
            <li v-for='(item,index,key) in cate' :key=key>
                <div class='menu-item ' :class="'color'+(index+1)">
                    <p class='item-title'>{{item.name}}</p>
                    <ul class='second-list'>
                        <li v-for='(item1,index1,key) in item.son' :key="key" :class="{isActive:flag[index]==index1}" >
                            <span @mouseover="active(index,index1)">{{item1.name}}</span>
                            <ul class='third-list' v-if="flag[index]==index1">
                                <li v-for='(item2,index2,key) in item1.sons' :key="key" v-if="index2<16">
                                    <router-link tag='span' :to="{path:'/tcb',query:{level_one:item.id,level_two:item1.id,level_three:item2.id}}">{{item2.name}} </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <router-link tag='span' :to="{path:'/tcb',query:{level_one:item.id}}">
                      <img :src="'./static/pic/list'+(index+1)+'.png'" alt="" class='item-pic'>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</div>
   
</template>
<script>
export default {
  data() {
    return {
      flag:{
        0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0
      }
    }
  },
  computed: {
    cate: function() {
      return this.$store.state.cate;
    }
  },
  methods:{
    active(index,index1){
      this.flag[index]=index1;
      console.log(this.flag[index]==index1)
    }
  }
};
</script>
<style lang="less" scoped>
.isActive{
  background-color: #fff;
  color:#999!important;
}
/*类别颜色*/
.color1 {
  background-color: #55a3f2;
}
.color2{
  background-color: #47aae9;
}
.color3 {
  background-color: #3abc8f;
}
.color4{
  background-color: #f36668;
}
.color5 {
  background-color: #ff8c4e;
}
.color6{
  background-color: #ffa234;
}
.color7 {
  background-color: #828ad9;
}
.color8{
  background-color: #9481c8;
}
.color9 {
  background-color: #6887de;
}

/**/
.main {
    background-color: #fff;
    width: 100%;
  .menu {
    li {
      list-style: none;
    }
    padding-top: 60px;
    width: 1200px;
    margin: auto;
    .menu-title {
      text-align: center;
      color: #4f4f4f;
      font-size: 36px;
    }
    .title-text {
      text-align: center;
      color: #4f4f4f;
      font-size: 16px;
      padding-bottom: 40px;
    }
    .menu-list {
      overflow: hidden;
      li {
        float: left;
        width: 150px;
        padding-right: 250px;
        padding-bottom: 30px;
      }
      .menu-item {
        position: relative;
        padding-top: 36px;
        width: 150px;
        height: 424px;
        .item-title {
          font-size: 36px;
          color: #fff;
          text-align: center;
        }
        .item-pic {
          width: 200px;
          height: 100px;
          position: absolute;
          left: 170px;
          bottom: 15px;
          transition: all .5s;
          border:1px solid #fff;
        }
        .item-pic:hover{
          cursor: pointer;
          border:1px solid #eaeaea;
        }
        .second-list {
          width: 150px;
          li {
            width: 120px;
            height: 40px;
            line-height: 40px;
            margin-left: 30px;
            text-align: center;
            color: #fff;
            padding-bottom: 0;
          }
        }
        .third-list {
          height: 422px;
          width: 240px;
          border-top: 1px solid #eaeaea;
          border-right: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
          padding-top: 36px;
          margin-right: 10px;
          position: absolute;
          top: 0;
          left: 150px;
          font-size: 14px;
          li {
            margin-left:0;
            padding: 0;
            float: left;
            text-align: center;
            width: 90px;
            margin:0 15px;
            color: #656565;
            line-height: 34px;
            height: 34px;
            span{
              transition: all 1s;
              border-bottom: 3px solid #fff;
            }
          }
          li:hover span{
            cursor: pointer;
            color:#dd5519;
            border-bottom:3px solid #dd5519;
          }
        }
      }
    }
  }
}
</style>

