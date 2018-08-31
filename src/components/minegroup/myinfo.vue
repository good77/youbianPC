<template>
    <div class="myinfo">
        <div class="title">
            <p>账号管理>个人资料</p>
        </div>
        <div class="main">
            <p class='main-title'>基本信息</p>
            <div class="infobox">
                <div class="info-left">
                    <div class="txbox">
                        <img :src="userInfo.img" alt="">
                    </div>
                </div>
                <div class="info-right">
                    <ul class="user-info">
                        <li>
                            <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                            用 户 名 ：<span class='name'>{{userInfo.name}}</span>
                        </li>
                        <li>
                            <img src="../../assets/pic/icon-sex.png" alt="" class='icon'>
                            性　　别：<span class='name'>{{userInfo.sex}}</span>

                        </li>
                        <li>
                            <img src="../../assets/pic/icon-adress.png" alt="" class='icon'>
                            地　　址：<span class='name'>{{userInfo.province_code+userInfo.city_code+userInfo.area_code}}</span>
                        </li>
                        <li>
                            <img src="../../assets/pic/icon-phone.png" alt="" class='icon'>
                            手 机 号 ：<span class='name'>{{userInfo.phone.substring(0,3)}}****{{userInfo.phone.substring(7,11)}}</span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            真实姓名：<span class='name'>{{userInfo.rel_name}}</span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            身份认证：<span class='name' v-if="userInfo.id_card">{{userInfo.id_card}}</span><span class='hasNamed'  v-if="userInfo.id_card">已实名<img src="../../assets/pic/icon-hasnamed.png" alt=""></span>
                        </li>
                    </ul>
                    <router-link tag='button' to='/mine/setinfo' class="updateinfo">修改基本信息</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        computed:{
            userInfo:function(){
                return this.$store.state.userInfo
            }
        },
        mounted(){
            var obj = this
            this.$store.dispatch('getUserInfo',obj)
        }
    }
</script>
<style lang="less" scoped>
.myinfo{
    .title{
        text-indent:15px;;
        color:#db5618;
        font-weight: 600;
        font-size:18px;
        line-height: 77px;
        height: 77px;
        border-bottom:1px solid #e1e1e1;
    }
    .main{
        .main-title{
            text-indent:15px;;
            color:#404040;
            font-size:16px;
            line-height: 50px;
            margin-bottom: 36px;
        }
        .infobox{
            .info-left{
                float: left;
                width: 120px;
                padding:0 15px 0 15px;
                .txbox{
                    background-color: #000;
                    width: 120px;
                    height: 120px;
                    border-radius:50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
            }
            .info-right{
                width: 850px;
                float: right;
                .user-info {
                    width: 100%;
                    color: #666666;
                    float: left;
                    font-size: 16px;
                    line-height: 28px;
                    margin-bottom: 40px;
                    .icon {
                        vertical-align: middle;
                        margin: 0 20px 0 20px;
                        width: 16px;
                        display: inline-block;
                    }
                    .name{
                        color:#595959;
                    }
                    .hasNamed{
                        margin-left:10px;
                        font-size:14px;
                        line-height: 16px;
                        color:#db5618;
                        img{
                            margin-left:4px;
                            vertical-align: middle;
                        }
                    }
                }
                .updateinfo{
                    font-size:18px;
                    margin-left:50px;
                    width: 177px;
                    height: 44px;
                    border:0;
                    color:#fff;
                    background-color: #db5618;
                }
            }
        }

    }
}
</style>

