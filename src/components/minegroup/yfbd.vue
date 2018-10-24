<template>
    <div>
        <div class="title">
            <p>订单管理>已发布的</p>
        </div>
        <div class="main">
             <ul class='tabs'>
                <li  @click='change(0)' :class="{isActive:type==0}">
                    全部
                </li>
                <li  @click='change(1)' :class='{isActive:type==1}'>
                    待接单
                </li>
                <li  @click='change(2)' :class='{isActive:type==2}'>
                    进行中
                </li>
                <li  @click='change(3)' :class='{isActive:type==3}'>
                    已完成
                </li>
            </ul>
            <div class="clear-all" @click="dialogVisible = true">
               清除已完成订单
            </div>
            <div class="orderlist">
                <ul class="listtitle">
                    <li>
                        名称
                    </li>
                    <li>
                        金额
                    </li>
                    <li>
                        次数
                    </li>
                    <li>
                        已接单数
                    </li>
                    <li>
                        已通过数
                    </li>
                    <li>
                        状态
                    </li>
                    <li>
                        审核状态
                    </li>
                    <li>
                        操作
                    </li>
                </ul>
                 <ul class="listitem">
                    <li v-for="(item,key) in yfbd" :key=key>
                         <span class='order_no'>
                            {{item.title}}
                        </span>
                        <span class='order_title'>
                            {{item.price}}
                        </span>
                        <span class='price'>
                             {{item.number}}
                        </span>
                        <span class='user fat'>
                            {{item.singular}}
                        </span>
                        <span class='user fat'>
                            {{item.pass}}
                        </span>
                        <span class='state'>
                            <span v-if="item.type==0" class='color-ea910f'>待接单</span>
                            <span v-if="item.type==1" class='daiqueren'>进行中</span>
                            <span v-if="item.type==2">已完成</span>
                        </span>
                        <span class='state'>
                            <span v-if="item.status==0" class='color-ea910f'>未审核</span>
                            <span v-if="item.status==1" class='daiqueren'>已审核</span>
                            <span v-if="item.status==2" >审核不通过</span>
                        </span>
                        <span class='op'>
                            <span >
                                <router-link :to="{path:'/push/reinfo',query:{id:item.id}}" tag='span' class='xiugai' v-if="item.type==0&&(item.status==0||item.status==2)">修改</router-link>
                                <span  class='clear' @click='del(item.id)' v-if="item.type==0&&item.status==1">删除</span>
                                </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>是否要删除已完成订单</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="clearAll">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Token from '../../store/token'
    export default{
        data(){
            return {
                type:0,
                dialogVisible: false,

            }
        },
        computed:{
            yfbd:function(){
                return this.$store.state.yfbd;
            }
        },
        methods:{
            change(num){
                this.type=num;
                var data = {
                    type:this.type
                }
                this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/release_order',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            },
                    }).then(res=>{
                    this.$store.dispatch('getYfbd',res.data.data)
                })
            },
            clearAll(){
                this.dialogVisible = false;
                this.$http({
                     methods: "get",
                    url:'http://www.youbian.link/api/v1/order/clear_order',
                     headers: {
                                token:Token.fetch()
                            },
                }).then(res=>{
                     if(res.data.code==400){
                          this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                    }else{
                        this.$message({
                            message: '订单删除成功',
                            type: 'success'
                        });
                        this.change(this.type)
                    }
                })
            },
            del(id){
                var data={
                    goods_id:id
                }
                this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/del',
                    params:data,
                    headers: {
                            token:Token.fetch()
                        },
                }).then(res=>{
                    if(res.data.code==400){
                          this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                    }else{
                        this.$message({
                            message: '订单删除成功',
                            type: 'success'
                        });
                        this.change(this.type)
                    }
                })
            }
        },
        mounted(){
            var data = {
                type:this.type
            }
            this.$http({
                methods: "get",
                url:'http://www.youbian.link/api/v1/order/release_order',
                params:data,
                headers: {
                            token:Token.fetch()
                        },
                }).then(res=>{
                if(res.data.code==400){
                    console.log(res)
                }else{
                    console.log(res.data.data)
                    this.$store.dispatch('getYfbd',res.data.data)
                }
            })
        }
    }
</script>
<style lang="less" scoped>
.icon-paper-clip{
    color:#e1e1e1;
}
.isActive{
    border-bottom:3px solid #db5618!important;
}
.butongguo{
    color:#f00;
    border:1px solid #f00;
    color:#f00;
    border-radius:3px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.butongguo:hover{
    cursor: pointer;
    background-color:#f00;
    color:#fff;
}
.color-ea910f{
    color:#ea910f;
}
.fat{
    font-weight: 600;
    color:#db5618;
}
.del{
    display: inline-block;
    margin-left:10px;
    border:1px solid #659AE3;
    border-radius:3px;
    color:#659AE3;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.xiugai{
    border:1px solid #999;
    color:#999;
    border-radius:3px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.xiugai:hover{
    cursor: pointer;
    background-color:#999;
    color:#fff;
}
.clear{
    border:1px solid #659AE3;
    color:#659AE3;
    border-radius:3px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.clear:hover{
    cursor: pointer;
    background-color:#659AE3;
    color:#fff;
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
.main{
    padding:30px;
    position: relative;
    .tabs{
        width: 400px;
        display: flex;
        justify-content: space-around;
        margin-bottom:10px;
        border-bottom: 1px solid #eaeaea;
        li{
            padding-bottom:10px;
        }
    }
    .clear-all{
        text-align: center;
        position: absolute;
        right:30px;
        top:26px;
        background-color: #eaeaea;
        color:#999;
        height: 34px;
        width: 150px;
        margin-right:20px;
        overflow: hidden;
        line-height: 34px;
    }
    .clear-all:hover{
        background-color: #999;
        cursor: pointer;
        color:#fff;
    }
    .listtitle{
        font-weight: 600;
        width: 950px;
        height: 60px;
        line-height: 60px;
        background-color: #e6e6e6;
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
        li{
            width: 10%;
            text-align: center;
        }
        li:nth-child(2){
                width: 15%;
        }
        li:nth-child(1){
                width: 25%;
                white-space: nowrap;
                overflow: ellipsis;
        }
        li:last-child{
                width: 15%;
        }
    }
    .listitem{
        overflow-y: scroll;
        height: 410px;
        color:#666;
        font-size:13px;
        li{
            line-height: 40px;
            height: 40px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            border-bottom:1px solid #eaeaea;
            overflow: hidden;
            span{
                width: 10%;
                text-align: center;
            }
            span:nth-child(2){
                 width: 12%;
            }
            span:nth-child(1){
                 width: 26%;

            }
            span:last-child{
                 width: 15%;
            }
        }
    }
}
</style>

