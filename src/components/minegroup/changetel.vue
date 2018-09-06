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
                    <input type="text" class="oldpwd ipt " placeholder="请输入新手机号码" v-model="phone">
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text'>验证码：</span>
                    <input type="text" class="checkcode ipt" placeholder="请输入验证码" v-model="checkcode" ><button class='getcode' @click='getcode' :disabled="disabled">{{m}}</button>
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
                phone:'',
                checkcode:'',
                m:'获取验证码',
                disabled:false
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
                var data = {
                    phone:this.phone,
                    code:this.checkcode
                }
                this.$http({
                    method:'get',
                    url:'http://www.youbian.link/api/v1/user/phone_edit',
                    params:data,
                    headers:{
                        token:Token.fetch()
                    }
                }).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        });
                    }
                })
            },
            getcode(){
                var m=60;
                var timer = window.setInterval(()=>{
                    if(m>1){
                        m--;
                        this.m=m+'秒后重试';
                        console.log(this.m)
                        this.disabled=true
                    }else{
                        this.m='获取验证码'
                        this.disabled=false
                    }
                },1000)
                var data = {
                    phone:this.phone
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/member/sendSms',
                    data,
                ).then(res=>{
                    console.log(res)
                })
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
                .getcode{
                    width: 110px;
                    height: 30px;
                    border:1px solid #ea910f;
                    color:#ea910f;
                    background-color: #fff;
                    margin-left:10px;
                    border-radius:4px;
                }
                .getcode:hover{
                    background-color: #ea910f;
                    color:#fff;
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

