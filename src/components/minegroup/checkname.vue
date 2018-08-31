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

                    </div>
                </div>
                <div class="info-right">
                    <ul class="user-info">
                        <li>
                            <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                            用 户 名 ：<span class='name'>111</span>
                        </li>
                        <li>
                            <div class="shenfenzheng">
                                <div class="zhengmian">
                                    <p>上传身份证正面</p>
                                   <img-inputer  theme="light" :on-change='onChange1'/>
                                </div>
                                <div class="beimian">
                                    <p>上传身份证背面</p>
                                    <img-inputer theme="light" :on-change='onChange2'/>
                                </div>
                            </div>
                        </li>
                        <li class='textbox'>
                            真实姓名：<input type="text" placeholder="请输入姓名" v-model="rel_name">
                        </li>
                        <li class='textbox'>
                            身份证号：<input type="text" placeholder="请输入身份证号" v-model='id_card'>
                        </li>
                    </ul>
                    <button @click='checkname'  class="updateinfo">提交信息</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
    export default{
        data(){
            return {
                file:'',
                rel_name:'',
                id_card:'',
                id_front:'',
                id_back:'',
            }
        },
        methods:{
            onChange1(file,filename){
                this.id_front=file
            },
            onChange2(file,filename){
                this.id_back=file
            },
            checkname(){
                var id_front = this.id_front;
                var id_back = this.id_back;
                var id_card = this.id_card;
                var rel_name = this.rel_name;
                var param = new FormData();
                param.append('id_front',id_front)
                param.append('id_back',id_back)
                 param.append('id_card',id_card)
                param.append('rel_name',rel_name)
                this.$http.post(
                    'http://www.youbian.link/api/v1/user/id_edit',
                    param,
                    {headers: {
				token:Token.fetch()}}
                ).then(res=>{
                    if(res.data.code==200){
                        this.$message()
                        setTimeout(()=>{
                            this.$route.push('/mine/home')
                        },1000)
                    }
                })
            }
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
                    background-color: #fff;
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
                overflow: hidden;
                width: 850px;
                float: right;
                .user-info {
                    li{
                        overflow: hidden;
                    }
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
                    .shenfenzheng{
                        .zhengmian,.beimian{
                            float: left;
                            width: 235px;
                            margin:22px;
                            text-align: center;
                        }
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
                    .textbox{
                        padding-left:60px;
                        font-weight: 600;
                        font-size:18px;
                        line-height: 30px;
                        input{
                            height: 24px;
                            width: 140px;
                            border-radius:4px;
                            border:1px solid #595959;
                            text-indent: 12px;
                        }
                    }
                }
                .updateinfo{
                    font-size:18px;
                    margin-left:230px;
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

