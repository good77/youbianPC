<template>
    <div class="main">
        <div class="loginbox">
            <div class="loginmain">
                <p class='login-text'>登录</p>
                <input type="text" class='username' placeholder="用户名或手机号" v-model="phone">
                <input type="password" class='pwd'  placeholder="密码" v-model="password">
                <button class='login-btn' @click='login'>立即登录</button>
                <router-link tag="p" to='/user/getlose' class='losepwd'>忘记密码</router-link>
                <router-link tag="p" to="/user/register"  class='register'>还没有账号，去注册></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
    export default{
        data(){
            return {
                phone:'15927908090',
                password:'111'
            }
        },
        methods:{
            login(){

                var phone= this.phone;
                var password =this.password;
                var data={
                    phone,
                    password
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/member/login', 
                    qs.stringify(data), 
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                )
                
                    .then(response=> {
                        if(response.data.code==200){
                            console.log(this)
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });
                            console.log(response.data.data)
                            var data=response.data.data;
                            window.sessionStorage.setItem('username',data.user.name)
                            this.$store.dispatch('setToken',data.token)
                            setTimeout(()=>{
                                this.$router.push('/')
                            },1000)
                        }else{
                            this.$message({
                                message: '账号或密码错误',
                                type: 'warning'
                            });
                        }    
                    })
                    .catch(error=> {
                          this.$message({
                                message: '服务器异常',
                                type: 'warning'
                            });
                    });
            }
        }
    }
</script>
<style scoped lang='less'>
.loginbox{
    width: 100%;
    padding-top:20px;
    padding-bottom: 40px;
    border-bottom:1px solid #d3d7d9;
    background-color: #fff;
    .loginmain{
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
        .login-text{
            text-align: center;
            font-size:30px;
            margin-bottom:20px;
            color:#4f4f4f;
        }
        .losepwd{
            text-align: right;
            font-size:16px;
            color:#cfcfcf;
            margin-bottom:10px;
        }
        .register{
            text-align: center;
            color:#dd5519;
        }
    }
}
</style>
