<template>
    <div class="main">
        <div class="getlosebox">
            <div class="getlosemain">
                <p class='getlose-text'>找回密码</p>
                <input type="text" class='telephone' placeholder="请输入手机号" v-model="phone">
                <input type="password" class='pwd'  placeholder="请输入密码" v-model="password">
                <input type="password" class='repwd'  placeholder="请确认密码" v-model="password_confirm">
                <input type="text" class='checkcode'  placeholder="请输入验证码" v-model="code">
                <button class='checkcode-btn' @click='getcode'>{{m}}</button>
                <button class='getlose-btn' @click='getlose'>确认找回</button>
                <router-link tag='p' to='/user/login' class='getlose'>去登录></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
    export default{
        data(){
            return {
                phone:'',
                password:'',
                password_confirm:'',
                code:'',
                m:'获取验证码',
                disabled:false,
                timer:''
            }
        },
        methods:{
            getcode(){
                if(this.phone){
                    window.clearInterval(this.timer)
                    var m=60;
                    this.timer = window.setInterval(()=>{
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

                    })
                }else{
                    this.$message({
                            message: '手机号不能为空',
                            type: 'warning'
                    });
                }
             },
            getlose(){
                var phone= this.phone;
                var password = this.password;
                var password_confirm = this.password_confirm;
                var code = this.code;
                var data={
                    phone,
                    password,
                    password_confirm,
                    code
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/member/retrieve_password', 
                    qs.stringify(data), 
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                )
                
                    .then(function (response) {
                    console.log(response);
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
            }
        }
    }
</script>
<style scoped lang='less'>
/*zcxy*/
.zcxy{
    color:#dd5519;
}
/**/
.getlosebox{
    width: 100%;
    padding-bottom:40px;
    padding-top:20px;
    background-color: #fff;
    border-bottom:1px solid #d3d7d9;
    .getlosemain{
        button,input{
            outline: none;
            height: 50px;
            border-radius:4px;
            border:1px solid #d3d7d9;
            margin-bottom:10px;
            font-size:18px;
        }
        input{
            text-indent: 15px;
            width: 398px;
            border:1px solid #d3d7d9;
            color:#4f4f4f;
        }
        button{
            width: 400px;
            background-color: #dd5519;
            color:#fff;
        }
        width: 400px;
        margin:auto;
        padding:40px 100px 40px 100px;
        border:1px solid #d3d7d9;
        border-radius:4px;
        .getlose-text{
            text-align: center;
            font-size:30px;
            margin-bottom:20px;
            color:#4f4f4f;
        }
        .agree{
            text-align: right;
            font-size:16px;
            color:#cfcfcf;
            margin-bottom:10px;
        }
        .getlose{
            text-align: center;
            color:#dd5519;
        }
        .checkcode{
            width: 270px;
        }
        .checkcode-btn{
            width: 120px;
            background-color: #fff;
            border:1px solid #dd5519;
            color:#dd5519;
        }
        .checkcode-btn:hover{
            color:#fff;
            background-color: #dd5519;
        }
    }
}
</style>
