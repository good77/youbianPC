<template>
    <div class="chongzhi">
        <div class="title">
            <p>提现</p>
        </div>
        <div class="main">
            <div class="czbox">
                <p>
                    　可提金额：<span class='points'>{{points}}</span>积分
                </p>
                　提现积分：<input type="text" class="czipt" placeholder="请输入数值" v-model='recharge'><br />
                 支付宝账号：<input type="text" class="czipt" placeholder="单行输入" v-model='alipay'><br />
                　真实姓名：<input type="text" class="czipt" placeholder="单行输入" v-model="rel_name">
                <button class='czbtn' @click='tixian'>确认提现</button>
            </div>
            <div class="static">
                <p class='static-title'>积分充值说明：</p>
                <p class='static-content'>
                    1、积分提现唯一途径为支付宝交易。
                </p>
                <p class='static-content'>
                    2、“可提金额” 为用户最大可提金额。
                </p>
                <p class='static-content'>
                    3、“提现积分” 处填写本次提现金额。
                </p>
                <p class='static-content'>
                    4、“支付宝账号” 处填写本次提现金额到账支付宝账户。
                </p>
                <p class='static-content'>
                   5、“真实姓名” 处填写本次提现金额到账支付宝账户真实用姓名。
                </p>
                <p class='static-content'>
                    6、提交成功后，后台审核通过，即转账到指定账户。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
    export default{
        data(){
            return {
                alipay:'',
                recharge:'',
                rel_name:''
            }
        },
        computed:{
            points:function(){
                return this.$store.state.userCenter.integral;
            }
        },
        methods:{
            tixian(){
                var data= {
                    alipay:this.alipay,
                    recharge:this.recharge,
                    rel_name:this.rel_name
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/money/withdrawal',
                    data,
                    {headers:{token:Token.fetch()}}
                ).then(res=>{
                    if(res.data.code==400){
                        this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                    }else{
                        this.$message({
                                message: '提现成功，请等待审核',
                                type: 'success'
                            });
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.chongzhi{
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
        width: 100%;
        padding-top:30px;
        div{
            width: 270px;
            margin:auto;  
        }
         .tip{
             line-height: 24px;
            .el-icon-warning{
                color:#f40b0b;
                font-size:20px;
                margin:0 10px 0 15px;
            }
        }
        .czbox{
            .points{
                font-size:24px;
                color:#dd5519;
            }
            padding-top:20px;
            line-height: 36px;
            .czipt{
                width: 160px;
                height: 24px;
                border-radius:4px;
                text-indent: 4px;
                border:1px solid #b3b3b3;
            }
            .czbtn{
                margin-top:15px;
                margin-bottom:15px;
                width: 220px;
                height: 40px;
                color:#fff;
                background-color: #dd5519;
                border:0;
                font-size:18px;
            }
        }
        .static{
            text-indent: -20px;
            .static-title{
                margin-bottom: 10px;
                color:#404040;
                font-weight: 600;
            }
            .static-content{
                margin-bottom: 10px;
                font-size:14px;
                color:#8f8f8f;
            }
        }
    }
}
</style>

