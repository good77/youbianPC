<template>
    <div class="mine">
        <div class="mine-nav">
            <router-link tag='p' to='/mine/home' class='title'>个人中心</router-link>
            <p class='vice-title'>账号管理<i class='el-icon-arrow-down'></i></p>
            <router-link tag='div' to='/mine/myinfo' class="navitem" active-class="isActive">
                <img src="../../assets/pic/grzl.png" alt="" class='icon'>个人资料
            </router-link>
            <router-link tag='div' to='/mine/setpwd' class="navitem" active-class="isActive">
                <img src="../../assets/pic/mmsz.png" alt="" class='icon'>密码设置
            </router-link>
            <p class='vice-title'>订单管理<i class='el-icon-arrow-down'></i></p>
            <router-link tag='div' to='/mine/yfbd' class="navitem" active-class="isActive">
                <img src="../../assets/pic/yfbd.png" alt="" class='icon'>已发布的
            </router-link>
            <router-link tag='div' to='/mine/bjsd' class="navitem" active-class="isActive">
               <img src="../../assets/pic/bjsd.png" alt="" class='icon'>被接收的
            </router-link>
            <router-link tag='div' to='/mine/yjsd' class="navitem" active-class="isActive">
                <img src="../../assets/pic/yjsd.png" alt="" class='icon'>已接收的
            </router-link>
        </div>
        <div class="mine-view">
            <router-view>

            </router-view>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.isActive{
    color:#dd5519!important;
}
/*icon*/
.icon{
    height: 14px;
    vertical-align: middle;
    margin-right:8px;
}
/**/
.mine{
    overflow: hidden;
    padding-top:20px;
    width: 1200px;
    margin:auto;
    margin-bottom:90px;
    .mine-nav{
        float: left;
        width: 140px;
        height: 666px;
        border:1px solid #b3b3b3;
        background-color: #eef3f5;
        div:hover{
            cursor: pointer;
            color:#db5618;
        }
        .title{
            text-indent:15px;;
            color:#db5618;
            font-weight: 600;
            font-size:18px;
            line-height: 77px;
            height: 77px;
            border-bottom:1px solid #e1e1e1;
        }
        .title:hover{
            cursor: pointer;
        }
        .vice-title{
            line-height: 52px;
            color:#414141;
            text-indent: 12px;    
        }
        .navitem{
            font-size:14px;
            color:#414141;
            line-height: 30px;
            text-align: center;
        }
    }
    .mine-view{
        width: 1030px;
        height: 666px;
        float: right;
        border:1px solid #b3b3b3;
    }
}
</style>

