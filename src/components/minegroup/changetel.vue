<template>
    <div class="setpwd">
        <div class="title">
            <p>账号管理>个人资料</p>
        </div>
        <div class="main">
            <div class="infobox">
                <div class="username">
                    <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                    用 户 名 ：<span class='name'>{{username}}</span>
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text' >新手机号：</span>
                    <input type="password" class="oldpwd ipt " placeholder="请输入新手机号码" v-model="password">
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text'>验证码：</span>
                    <input type="text" class="checkcode ipt" placeholder="请输入验证码" v-model="password2" >
                </div>
            </div>
           <button class="updateinfo" @click='changetel'>完成修改</button>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
import qs from 'qs'
    export default{
        data(){
            return {
                password:'',
                password2:'',
                password2_confirm:'',
                m:0
            }
        },
        computed:{
            username:function(){
                return this.$store.state.userInfo.name
            }
        },
        mounted(){
            var obj = this
            this.$store.dispatch('getUserInfo',obj)
        },
        methods:{
            changetel(){
                
            }
        }
    }
</script>
<style lang="less" scoped>
.setpwd{
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
        .username{
            padding:40px 70px 20px 70px;
            line-height: 40px;
            img{
                margin-right:10px;
                vertical-align: middle;
            }
        }
        .infobox{
            padding-bottom: 40px;
            .iptbox{
                line-height: 44px;
                .star{
                    display: inline-block;
                    width: 80px;
                    text-align: right;
                    color:#db5618;
                }
                .text{
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    color:#595959;
                }
                .ipt{
                    text-indent: 10px;
                    height: 30px;
                    width: 280px;
                    border-radius:4px;
                    border:1px solid #e1e1e1;
                    background-size:16px 16px;
                }
                .checkcode{
                    width: 160px;
                }
            }
        }
        .updateinfo{
            font-size:18px;
            margin-left:70px;
            width: 177px;
            height: 44px;
            border:0;
            color:#fff;
            background-color: #db5618;
        }
        .getlose{
            font-size:14px;
            margin-left:20px;
            color:#404040;
        }
    }
}
</style>

