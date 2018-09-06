<template>
    <div class="setpwd">
        <div class="title">
            <p>账号管理>密码设置</p>
        </div>
        <div class="main">
            <div class="infobox">
                <div class="username">
                    <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                    用 户 名 ：<span class='name'>{{username}}</span>
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text' >旧密码：</span>
                    <input type="password" class="oldpwd ipt " placeholder="请输入旧密码" v-model="password">
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text'>新密码：</span>
                    <input type="password" class="newpwd ipt " placeholder="请输入6-16个字符 密码区分大小写" v-model="password2" @keyup="strong">
                    <div class="mima">
                        安全强度：
                        <div class="colorbox">
                            <span :class='{weak:m==1}'>弱</span>
                            <span :class='{normal:m==2}'>中</span>
                            <span :class='{strong:m==3}'>强</span>
                        </div>
                    </div>
                </div>
                <div class="iptbox">
                    <span class='star'>*</span><span class='text'>确认密码：</span>
                    <input type="password" class="repwd ipt" placeholder="请确认新密码" v-model="password2_confirm">
                </div>
            </div>
           <button class="updateinfo" @click='changepwd'>完成修改</button>
           <router-link to='/user/getlose' tag='span' class='getlose'>忘记密码？</router-link>
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
            strong(){
                this.m=0; 
                //匹配数字
                if (/\d+/.test(this.password2)) {
                this.m++;
                };
                //匹配字母
                if (/[A-Za-z]+/.test(this.password2)) {     
                this.m++;
                };
                //匹配除数字字母外的特殊符号
                if (/[^0-9a-zA-Z]+/.test(this.password2)) {      
                this.m++;
                };
                console.log(this.m)
            },
            changepwd(){
                var token = Token.fetch();
                var password = this.password;
                var password2 = this.password2;
                var password2_confirm = this.password2_confirm;
                var data={
                    password,
                    password2,
                    password2_confirm
                }
                this.$http.post('http://www.youbian.link/api/v1/user/password_edit',
                qs.stringify(data), 
                {headers: {'Content-Type': 'application/x-www-form-urlencoded',token}}
                )
                 .then(response=> {
                                                 console.log(response.data)
                        if(response.data.code==200){
                            console.log(this)
                            this.$message({
                                message: '密码修改成功',
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.$router.push('/mine/home')
                            },1000)
                        }else{
                            this.$message({
                                message:response.data.message,
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
<style lang="less" scoped>
.mima{
    margin-left:10px;
    display: inline-block;
    font-size:14px;
    color:#666;
    .colorbox{
        height: 20px;
        line-height: 20px;
        width: 160px;
        display: inline-block;
        vertical-align: middle;
        span{
            display: inline-block;
            text-align: center;
            width: 50px;
            margin:0;
            background-color: #fff;
            background-color: #d1d1d1;
            color:#fff;
        }
        .strong{
            background-color: #7FFF00;
        }
        .normal{
            background-color: #ee0;
        }
        .weak{
            background-color: #f00;
        }
    }
}
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
                    background:#fff url("../../assets/pic/mmsz.png") no-repeat 250px;
                    background-size:16px 16px;
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
        .getlose:hover{
            cursor: pointer;
            color:#db5618;
        }
    }
}
</style>

