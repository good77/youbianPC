<template>
    <div class="chongzhi">
        <div class="title">
            <p>充值</p>
        </div>
        <div class="main">
            <div class="qrcode">
                <img src="../../assets/pic/pay-qrcode.png" alt="">
            </div>
            <div class="tip">
                <i class='el-icon-warning'></i>扫码转账需备注手机号
            </div>
            <div class="czbox">
                充值金额： <input type="text" class='czipt ' placeholder="单行输入" v-model="recharge">
                <button class='czbtn' @click='chongzhi'>已转账</button>
            </div>
            <div class="static">
                <p class='static-title'>积分充值说明：</p>
                <p class='static-content'>
                    1、积分充值唯一途径为支付宝转账。
                </p>
                <p class='static-content'>
                    2、用户打开支付宝扫描上方二维码，等价输入所需充值金额，并备注所充值账户手机号等价输入所属。
                </p>
                <p class='static-content'>
                    3、转账成功后，后台审核通过，即转账到指定账户,等价输入所属。
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
                recharge:'',
            }
        },
        methods:{
            chongzhi(){
                var data = {
                    recharge : this.recharge
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/money/recharge',
                    data,
                    {headers:{token:Token.fetch()}}
                ).then(res=>{
                    if(res.data.code==400){

                    }else{
                         this.$message({
                                message: '充值成功，请等待审核',
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
        .qrcode{
            img{
                width: 80%;
                margin:auto;
            }
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
            padding-top:20px;
            line-height: 26px;
            .czipt{
                width: 120px;
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

