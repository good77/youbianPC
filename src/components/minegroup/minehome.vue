<template>
    <div class="main">
        <div class="top">
            <div class="userbox">
                <div class="touxiang">
                    <img :src="imgDataUrl" v-if="imgDataUrl">
                    <img :src="userCenter.img" alt=""  v-else="imgDataUrl">
                </div>
                 <a class="txbtn" @click="toggleShow" style='position:absolute;top:125px;left:33px;cursor:pointer'>设置头像</a>
                    <my-upload field="img"
                          @crop-success="cropSuccess"
                          @crop-upload-success="cropUploadSuccess"
                          @crop-upload-fail="cropUploadFail"
                          v-model="show"
                          :width="200"
                          :height="200"
                          url="http://www.youbian.link/api/v1/user/user_edit"
                          :params="params"
                          :headers="headers"
                          img-format="png">
                      </my-upload>
                <div class="ziliao">
                    <p>用户名：<span>{{userCenter.name}}</span></p>
                    <p v-if="userCenter.grade_status==1"><i class='iconfont icon-VIP size-18 '></i>{{userCenter.members_end}}<router-link to="/mine/vipup" tag='span' class='quxufei'>去续费</router-link></p>
                    <p v-if="userCenter.grade_status==0">会员等级：普通会员&nbsp<router-link to="/mine/vipup" tag='span' class='quxufei'>去升级</router-link></p>
                    <p class='jiedan'>我的接单：<span class='color-dd5519'>{{userCenter.receive_num1}}</span></p>
                    <p class='fadan'>我的发单：<span class='color-3d7f4f'>{{userCenter.release_num1}}</span></p>
                </div>
            </div>
            <div class="pointbox">
                <div class="point">
                    <div class="pointtop">
                        积分余额：{{userCenter.integral}}
                    </div>
                    <div class="pointbottom">
                        <router-link tag='div' to='/mine/cz' class="left">积分充值</router-link>
                        <router-link tag='div' to='/mine/tx' class="right">积分提现</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <ul class='pointlist'>
                <li class='title'>
                    <span class='use'>来源/用途</span><span class='change'>积分变化</span><span class='time'>时间</span><span class='remark'>备注</span>
                </li>
                <li v-for='(item,index,key) in userCenter.integral_detail' :key=key :class="{'color-f00':item.status==2,'color-dd5519':item.status==1||item.status==3||item.status==5||item.status==6,'color-3d7f4f':item.status==0||item.status==4}" v-if="index<(now*7)&&index>=((now-1)*7)">
                    <span class='use' v-if="item.status==0">
                        充值
                    </span>
                    <span class='use' v-if="item.status==1">
                        提现
                    </span>
                    <span class='use' v-if="item.status==2">
                        奖励
                    </span>
                    <span class='use' v-if="item.status==3">
                        发布订单
                    </span>
                    <span class='use' v-if="item.status==4">
                        完成订单
                    </span>
                    <span class='use' v-if="item.status==5">
                        开通会员
                    </span>
                    <span class='use' v-if="item.status==6">
                        会员续费
                    </span>
                    <span class='change' v-if="item.status==0||item.status==2||item.status==4">
                        {{'+'+item.recharge}}
                    </span>
                    <span class='change' v-if="item.status==1||item.status==3||item.status==5||item.status==6">
                        {{'-'+item.recharge}}
                    </span>
                    <span class='time'>
                        {{item.update_time.substring(0,10)}}
                    </span>
                    <span class='remark'>
                        {{item.content}}
                    </span>
                </li>
            </ul>
            <div class="pagebox">
                <i class='iconfont icon-caret-left' @click='pre'></i>
                <span class='pagenum'>{{now}}/{{Math.ceil(userCenter.integral_detail.length/7)}}</span>
                <i class='iconfont icon-caret-right' @click='next'></i>
            </div>
        </div>
    </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload'
import Token from '../../store/token'
    export default{
        data(){
            return {
                pager:'',
                now:1,
                show: false,
                params: {},
                headers: {
                    token: Token.fetch(),
                },
                imgDataUrl: '', // the datebase64 url of created image,
            }
        },
        computed:{
            userCenter:function(){
                return this.$store.state.userCenter
            }
        },
        components: {
            myUpload,
        },
        mounted(){
            var obj=this
              this.$store.dispatch('getUserCenter',obj);
        },
        methods:{
            pre(){
                if(this.now>1){
                    this.now--;
                }
            },
            next(){
                if(this.now<Math.ceil(this.userCenter.integral_detail.length/7)){
                    this.now++;
                }
            },
            toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			/**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}   
        }
    }
</script>
<style lang="less" scoped>

.color-dd5519{
    color:#dd5519;
}
.color-3d7f4f{
    color:#3d7f4f;
}
.color-f00{
    color:#f00;
}
.size-18{
    font-size:30px;
}
.icon{
    font-size:18px;
    color:#c5c5c5;
}
.main{
    padding:20px;
    .top{
        height: 185px;
        .userbox{
            position: relative;
            height: 185px;
            float: left;
            .touxiang{
                float: left;
                border-radius:50%;
                width: 120px;
                height: 120px;
                background-color: #000;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .ziliao{
                margin-left:15px;
                float: left;
                line-height: 28px;
                .icon-VIP{
                    color:#ea910f;
                }
                .quxufei{
                    font-size:13px;
                    text-decoration: underline;
                    color:#ea910f;
                }
                .quxufei:hover{ 
                    cursor: pointer;
                }
                .jiedan,.fadan{
                    line-height: 28px;
                    font-weight: 600;
                    color:#404040;
                }
            }
        }
        .pointbox{
            float: left;
            margin-left:110px;
            margin-top:30px;
            .point{
                overflow: hidden;
                text-align: center;
                width: 530px;
                height: 100px;
                border-radius:4px;
                border:1px solid #666;
                .pointtop{
                    border-bottom: 1px solid #666;
                    line-height: 50px;
                    height: 50px;
                    color:#333;
                    background-color: #fff;
                    font-size:22px;
                }
                .pointbottom{
                        font-size:16px;
                        height: 50px;
                        line-height: 50px;
                    .left{
                        text-align: center;
                        width: 265px;
                        float: left;
                        background-color: #eaeaea;
                        color:#333;
                        border-right:1px solid #666;
                    }
                    .right{
                        color:#333;
                        background-color: #eaeaea;
                        width: 264px;
                        text-align: center;
                        float: left;
                    }
                    .left:hover{
                        color:#fff;
                        background-color: #ea910f;
                    }
                    .right:hover{
                        color:#fff;
                        background-color: #ea910f;
                    }
                }
                .pointbottom .left:hover{
                    cursor: pointer;
                    opacity: .9;
                }
                .pointbottom .right:hover{
                    cursor: pointer;
                    opacity: .9;
                }
            }
        }
    }
    .bottom{
        .pointlist{
            border:1px solid #b3b3b3;
            height: 400px;
            li{
                height: 48px;
                line-height: 50px;
                text-align: center;
                border-bottom: 2px solid #b3b3b3;
                font-size:14px;
                span{
                    display: inline-block;
                    overflow: hidden;
                }
            }
            li:first-child{
                font-size:18px;
            }
            .use{
                width: 148px;
            }
            .change{
                width: 220px;
            }
            .time{
                width: 250px;
            }
            .remark{
                text-indent: 140px;
                width: 270px;
            }
        }
        .pagebox{
            float: right;
            line-height: 40px;
            height: 40px;
            .pagenum{
                color:#c5c5c5;
            }
            .iconfont{
                display: inline-block;
                vertical-align: top;
                font-size:30px;
                color:#999;
            }
            .iconfont:hover{
                cursor: pointer;
            }
        }
    }
}
</style>
