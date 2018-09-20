<template>
    <footer>
        <div class="footer-top">
            <ul class='footerlist'>
                <li>
                    <div class="circle">
                        <img src="../assets/pic/footer-icon1.png" alt="" class='footer-icon'>
                    </div>
                    <div class="content">
                        <p class='content-title'>特色服务</p>
                        <p class='content-text'>服务自定义，排难解忧</p>
                    </div>
                </li>
                <li>
                    <div class="circle">
                        <img src="../assets/pic/footer-icon2.png" alt="" class='footer-icon'>
                    </div>
                     <div class="content">
                        <p class='content-title'>极速回复</p>
                        <p class='content-text'>快速回复，沟通无忧</p>
                    </div>
                </li>
                <li>
                    <div class="circle">
                        <img src="../assets/pic/footer-icon3.png" alt="" class='footer-icon'>
                    </div>
                     <div class="content">
                        <p class='content-title'>优便保障</p>
                        <p class='content-text'>信息保密，交易保证</p>
                    </div>
                </li>
                <li>
                    <div class="circle">
                        <img src="../assets/pic/footer-icon4.png" alt="" class='footer-icon'>
                    </div>
                     <div class="content">
                        <p class='content-title'>服务全面</p>
                        <p class='content-text'>分类详尽，服务全方位</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer-main">
            <div class="logo">
                <img src="../assets/pic/logo.png" alt=""  class='logomain'>
            </div>
            <div class="service">
                <ul>
                    <li class='lf'>
                        <p class='service-title'>服务支持</p>
                        <ul>
                           <router-link :to="{path:'/newsmain',query:{title_id:1}}" tag='li' @click='hasClick(1)' :class="{hasClick:hasClick==1}">诚信服务</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:2}}" tag='li' @click='hasClick(2)' :class="{hasClick:hasClick==2}">规则中心</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:3}}" tag='li' @click='hasClick(3)' :class="{hasClick:hasClick==3}">客户中心</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:4}}" tag='li' @click='hasClick(4)' :class="{hasClick:hasClick==4}">招商加盟</router-link>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>交流分享</p>
                        <ul>
                            <router-link :to="{path:'/news',query:{id:0}}" tag='li'>优便动态</router-link>
                            <router-link :to="{path:'/news',query:{id:1}}" tag='li'>经验学堂</router-link>
                            <router-link :to="{path:'/news',query:{id:2}}" tag='li'>优单展示</router-link>
                            <router-link :to="{path:'/news',query:{id:3}}" tag='li'>赚钱经验</router-link>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>帮助中心</p>
                        <ul>
                            <router-link :to="{path:'/newsmain',query:{title_id:5}}" tag='li'>常见分类</router-link>
                            <router-link :to="{path:'/newsmain',query:{title_id:6}}" tag='li'>更多帮助</router-link>
                            <router-link to='/suggest' tag='li'>意见反馈</router-link>
                            <router-link :to="{path:'/newsmain',query:{title_id:7}}" tag='li'>隐私权条款</router-link>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>关于优便</p>
                        <ul>
                            <router-link :to="{path:'/newsmain',query:{title_id:8}}" tag='li'>了解优便</router-link>
                            <router-link :to="{path:'/newsmain',query:{title_id:9}}" tag='li'>加入优便</router-link>
                            <li class='sina'>
                                <a href="https://weibo.com/u/6635640782?refer_flag=1001030201_&is_hot=1" target="_blank">新浪微博</a>
                            <li style='position:relative'  class='wechat'>
                                优便公众号
                                <div class="wechatbox">
                                    <img src="../assets/pic/wechat.jpg" alt="">
                                    <div class="right">
                                        <p>轻松关注优便</p>
                                        <p>1.打开微信扫一扫</p>
                                        <p>2.对准二维码即可关注</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>服务热线</p>
                        <p class='hot-line'>181-3363-5661</p>
                        <p class='service-date'>周一至周日8:00-20:00</p>
                    </li>
                </ul>
            </div>
            <div class="qrcode">
                <img src="../assets/pic/kfwx.jpg" alt="" class='pic-qrcode'>
                <p style='font-size:14px'>优便官方微信号</p>
            </div>
        </div> 
        <div class="footer-bottom">
            CopyRight：2018-2019 优便官方网站 [ youbian.link ]版权所有 | 皖ICP备18015008号-1 
        </div>
    </footer>
</template>
<script>
    export default{
        data(){
            return {
                hasClick:''
            }
        },
        methods:{
            hasClick(id){
                this.hasClick=id
            }
        }
    }
</script>
<style scoped lang='less'>
.hasClick{
    color:#dd5519!important;
}
.sina a{
    color:#8c8c8c;
    text-decoration: none;
}
.sina:hover a{
    color:#dd5519
}
.wechat:hover .wechatbox{
    display: block;
}
.wechatbox{
    left:90px;
    bottom: 15px;
    position:absolute;
    background-color: #fff;
    padding:5px;
    width: 240px;
    border-radius:4px;
    border:1px solid #eaeaea;
    z-index: 9999;
    display: none;
    .right{
        margin-left:10px;
        float: left;
        p{
            font-size:12px;
            color:#4f4f4f;
        }
        p:first-child{
            color:#dd5519;
            font-size: 14px;
            font-weight: 600;
        }
    }
    img{
        margin-top:5px;
        float: left;
        display: block;
        width: 90px;
        padding-right:10px;
        border-right:1px solid #eaeaea;
    }
}
/**/
.lf{
    margin-left:38px;
    margin-right:38px;
    float: left;
}
footer{
    background-color: #fff;
    li{
        list-style: none;
    }
    height: 500px;
    .footer-top{
        border-top:1px solid #eaeaea;
        padding:45px 0;
        height: 80px;
        width:100%;
        background-color: #eff3f5; 
        .footerlist{
            width: 1200px;
            margin:auto;
            li{
                div{
                    float: left;
                }
                float: left;
                width: 300px;
                .circle{
                    transition: all 1s;
                    display:inline-block;
                    vertical-align: middle;
                    line-height: 80px;
                    width: 40px;
                    height: 40px;
                    padding:16px 20px 24px 20px;
                    border-radius:50%;
                    background-color: #ea910f;
                    .footer-icon{
                        width: 40px;
                        height: 40px;
                    }
                }
                .circle:hover{
                    transform:rotate(360deg);
                }
                .content{
                    padding:5px 10px;
                    color:#4f4f4f;
                    .content-title{
                        line-height: 40px;
                        font-size:18px;
                    }
                    .content-text{
                        line-height: 20px;
                        font-size:16px;
                    }
                }
            }
        }
    }
    .footer-main{
        padding-top:70px;
        margin:auto;
        width: 1200px;
        height: 200px;
        line-height: 200px;
        div{
            float: left;
            ul{
                li{
                    ul{
                        li{
                            cursor: pointer;
                        }
                        li:hover{
                            color:#dd5519;
                        }
                    }
                }
            }
        }
        .logo{
            padding-top:15px;
            .logomain{
                vertical-align: top;
                width: 154px;
                height: 84px;
                padding-right:12px;
                }
        }
        .service{
            line-height: 16px;

            .service-title{
                font-size:16px;
                color:#4f4f4f;
                font-weight: bold;
                margin-bottom:10px;
            }
            .hot-line{
                color:#dd5519;
                font-size: 24px;
            }
            li{
                color:#8c8c8c;
                font-size:14px;
                line-height: 32px;
            }
        }
        .qrcode{
            padding-top:2px;
            line-height: 20px;
            .pic-qrcode{
                margin-left: 2px;
                width: 94px;
                height: 94px;
            }

        }
    }
    .footer-bottom{
        margin:auto;
        width: 1200px;
        font-size:14px;
        color:#656565;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
}
</style>

