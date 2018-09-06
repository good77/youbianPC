<template>
    <div>
        <div class="title">
            <p>订单管理>已接收的</p>
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
                <input class="srhtext" type="text" placeholder="请输入订单号" v-model="order_no" @keyup.enter='srh'><button class='srh-btn' @click='srh'>搜索<i class='el-icon-search'></i></button>
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
                        发布人
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
                    <li v-for="(item,key) in yjsd" :key=key>
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
                            {{item.get_order.get_user.name}}
                        </span>
                        <span class='state'>
                            <span v-if="item.status==0">已接单</span>
                            <span v-if="item.status==1" class='color-ea910f'>待确认</span>
                            <span v-if="item.status==2" class='color-f00'>未通过</span>
                            <span v-if="item.status==3||item.status==4">已通过</span>
                            <span v-if="item.status==5||item.status==7" class='color-5cce5c'>已评价</span>
                        </span>
                        <span class='file'>
                           <a :href="item.video_url" v-if="item.video_url">
                                <i class='iconfont icon-paper-clip'></i>
                            </a>
                        </span>
                        <span class='op'>
                            <span v-if="item.status==0"><span class='wancheng' @click='complate(item.order_no)'>确认完成</span><span class='del' @click="del(item.order_no)">删除</span></span>
                            <span v-if="item.status==1"><span>等待确认</span><span class='del' @click="del(item.order_no)">删除</span></span>
                            <span v-if="item.status==2"><span class='cxwc' @click='cxwc(item.order_no)'>重新完成</span><span class='del' @click="del(item.order_no)">删除</span></span>
                            <span v-if="item.status==3||item.status==4"><span class='pingjia' @click='dialog(item.order_no,item.get_order.get_user.id)'>评价</span></span>
                             <!-- <span v-if="item.status==5"><span>等待确认</span><span class='del' @click="del(item.order_no)">删除</span></span> -->
                            <span v-if="item.status==5||item.status==7"><span class='color-5cce5c'></span></span>
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
                be_evaluated:'',
                order_no:'',
                content_receive:'',
            }
        },
        computed:{
            yjsd:function(){
                return this.$store.state.yjsd;
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
                    url:'http://www.youbian.link/api/v1/order/received',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            },
                    }).then(res=>{
                    this.$store.dispatch('getYjsd',res.data.data)
                })
            },
            cxwc(order_no){
                var data= {
                    order_no
                }
                this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/re_completion',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            }
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
            complate(order_no){
                 var data= {
                    order_no
                }
                this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/confirm_completed',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            }
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
            del(order_no){
                 var data= {
                    order_no
                }
                this.$http({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/del_order',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            }
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
                    'http://www.youbian.link/api/v1/order/comment',
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
                        
                        this.dialogFormVisible = false;
                        this.change(this.type)
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
                    url:'http://www.youbian.link/api/v1/order/received',
                    params:data,
                    headers: {
                                token:Token.fetch()
                            },
                    }).then(res=>{
                    if(res.data.code==400){
                        console.log(res)
                    }else{
                        console.log(res.data.data)
                        this.$store.dispatch('getYjsd',res.data.data)
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
                url:'http://www.youbian.link/api/v1/order/received',
                params:data,
                headers: {
                            token:Token.fetch()
                        },
                }).then(res=>{
                if(res.data.code==400){
                    console.log(res)
                }else{
                    console.log(res.data.data)
                    this.$store.dispatch('getYjsd',res.data.data)
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
.wancheng,.cxwc{
     display: inline-block;
    margin-left:10px;
    border:1px solid #ea910f;
    border-radius:3px;
    color:#ea910f;
    height: 25px;
    line-height: 25px;
    width:70px!important;
}
.pingjia{
        height: 25px;
    line-height: 25px;
    width:55px!important;
    display: inline-block;
    border:1px solid #5cce5c;
    color:#5cce5c;
    border-radius:3px;
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
.color-5cce5c{
    color:#5cce5c;
}
.color-f00{
    color:#f00;
}
.color-ea910f{
    color:#ea910f;
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
            line-height: 34px;
            vertical-align: top;
            border:0;
            width: 269px;
            font-size: 14px;
            text-indent: 12px;
            height: 34px;
        }
        .srh-btn{
            font-size:16px;
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
            width: 9%;
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
                width: 20%;
        }
    }
    .listitem{
        overflow-y: scroll;
        height: 440px;
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
                width: 9%;
                text-align: center;
            }
            span:nth-child(1){
                 width: 15%;
            }
            span:nth-child(2){
                 width: 25%;
                 white-space: nowrap;
                overflow: ellipsis;
            }
            span:last-child{
                 width: 20%;
            }
        }
    }
}
</style>

