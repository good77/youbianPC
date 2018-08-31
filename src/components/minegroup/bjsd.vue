<template>
    <div>
        <div class="title">
            <p>订单管理>被接收的</p>
        </div>
        <div class="main">
             <ul class='tabs'>
                <li  @click='change(5)' :class="{isActive:type==5}">
                    全部
                </li>
                <li  @click='change(1)' :class='{isActive:type==1}'>
                    已接单
                </li>
                <li  @click='change(2)' :class='{isActive:type==2}'>
                    待确认
                </li>
                <li  @click='change(3)' :class='{isActive:type==3}'>
                    未通过
                </li>
                <li  @click='change(4)' :class='{isActive:type==4}'>
                    已通过
                </li>
            </ul>
            <div class="srh">
                <input class="srhtext" type="text" v-model="order_no" placeholder="请输入订单号" @keyup.enter="srh"><button class='srh-btn' @click='srh'>搜索<i class='el-icon-search'></i></button>
            </div>
            <div class="orderlist">
                <ul class="listtitle">
                    <li>
                        订单号
                    </li>
                    <li>
                        名称
                    </li>
                    <li>
                        金额
                    </li>
                    <li>
                        接单人
                    </li>
                    <li>
                        订单状态
                    </li>
                    <li>
                        附件
                    </li>
                    <li>
                        操作
                    </li>
                </ul>
                 <ul class="listitem">
                    <li v-for="(item,key) in bjsd" :key=key>
                         <span class='order_no'>
                            {{item.order_no}}
                        </span>
                        <span class='order_title'>
                            {{item.get_order.title}}
                        </span>
                        <span class='price'>
                             {{item.get_order.price}}
                        </span>
                        <span class='user'>
                            {{item.get_user.name}}
                        </span>
                        <span class='state'>
                            <span v-if="item.status==0" class='color-ea910f'>已接单</span>
                            <span v-if="item.status==1" class='daiqueren'>待确认</span>
                            <span v-if="item.status==2" class='color-f00'>未通过</span>
                            <span v-if="item.status==3||item.status==5" class='color-5cce5c'>已通过</span>
                            <span v-if="item.status==4||item.status==7" class='color-5cce5c'>已评价</span>
                        </span>
                        <span class='file'>
                           <a :href="item.video_url" v-if="item.video_url">
                                <i class='iconfont icon-paper-clip'></i>
                            </a>
                        </span>
                        <span class='op'>
                             <span v-if="item.status==0">等待对方完成</span>
                            <span v-if="item.status==1"><span class='butongguo' @click='unpass(item.order_no)'>不通过</span>　<span class='tongguo' @click='pass(item.order_no)'>通过</span></span>
                            <span v-if="item.status==2" >等待对方再次完成</span>
                            <span v-if="item.status==3||item.status==5" class='pingjia' @click="dialog(item.order_no,item.get_user.id)">评价</span>
                            <span v-if="item.status==4||item.status==7"></span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog title="添加评价" :visible.sync="dialogFormVisible" width="30%">
            <div>
                <textarea class='area' v-model="content_receive"></textarea>
            </div>
            <div slot="footer" class="dialog-footer">
               <button class='comment' @click='sendComment'>发表评论</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Token from '../../store/token'
    export default{
        data(){
            return {
                type:5,
                dialogFormVisible: false,
                content:'',
                be_evaluated:'',
                order_no:'',
                content_receive:'',
            }
        },
        computed:{
            bjsd:function(){
                return this.$store.state.bjsd;
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
                    url:'http://www.youbian.link/api/v1/order/be_received',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            },
                    }).then(res=>{
                    this.$store.dispatch('getBjsd',res.data.data)
                })
            },
            pass(id){
                var data={
                    type:3,
                    order_no:id
                }
                 this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/through',
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
                                message: res.data.message,
                                type: 'success'
                            });
                            this.change(this.type)
                        }
                })
            },
            unpass(goods_id){
                 var data={
                    type:2,
                    order_no:goods_id
                }
                 this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/through',
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
                                message: res.data.message,
                                type: 'success'
                            });
                            this.change(this.type)
                        }
                })
            },
            dialog(order_no, be_evaluated){
                this.content_receive= ''
                this.dialogFormVisible = true;
                this.order_no=order_no;
                this.be_evaluated=be_evaluated;
            },
            sendComment(){
                var data = {
                    order_no:this.order_no,
                    be_evaluated:this.be_evaluated,
                    content_receive:this.content_receive
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/order/be_comment',
                    data,
                    {
                        headers:{token:Token.fetch()}
                    }
                ).then(res=>{
                     if(res.data.code==400){
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.change(this.type)
                        this.dialogFormVisible = false;
                    }
                })
            },
            srh(){
                this.type=5;
                var data = {
                    order_no:this.order_no
                }
                 this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/be_received',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            },
                    }).then(res=>{
                    if(res.data.code==400){
                        console.log(res)
                    }else{
                        console.log(res.data.data)
                        this.$store.dispatch('getBjsd',res.data.data)
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
                url:'http://www.youbian.link/api/v1/order/be_received',
                params:data,
                headers: {
                            token:Token.fetch()
                        },
                }).then(res=>{
                if(res.data.code==400){
                    console.log(res)
                }else{
                    console.log(res.data.data)
                    this.$store.dispatch('getBjsd',res.data.data)
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
.color-f00{
    color:#f00;
}
.color-ea910f{
    color:#ea910f;
}
.color-5cce5c{
    color:#5cce5c;
}
.tongguo{
        border:1px solid #ea910f;
    color:#ea910f;
    border-radius:3px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.daiqueren{
    color:#ea910f
}
.yijiedan{
    color:#ea910f;
}
.pingjia{
    border:1px solid #ea910f;
    color:#ea910f;
    border-radius:3px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    width:55px!important;
}
.area{
    width: 100%;
    height: 160px;
    font-size:16px;
    text-indent: 24px;
}
.comment{
    height: 30px;
    width: 90px;
    background-color: #db5618;
    color:#fff;
    border:0;
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
    .srh{
        position: absolute;
        right:30px;
        top:26px;
        border:1px solid #ea910f;
        height: 34px;
        width: 400px;
        overflow: hidden;
        line-height: 34px;
        .srhtext{
            border:0;
            width: 269px;
            font-size: 16px;
            text-indent: 12px;
            height: 34px;
        }
        .srh-btn{
            font-size:18px;
            width: 131px;
            height: 38px;
            line-height: 34px;
            border:0;
            background-color: #ea910f;
            color:#fff;
        }
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
        li:nth-child(1){
                width: 15%;
        }
        li:nth-child(2){
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
            span{
                width: 10%;
                text-align: center;
            }
            span:nth-child(1){
                 width: 15%;
            }
            span:nth-child(2){
                 width: 25%;
            }
            span:last-child{
                 width: 15%;
            }
        }
    }
}
</style>

