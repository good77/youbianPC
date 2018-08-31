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
                           <router-link :to="{path:'/newsmain',query:{title_id:1}}" tag='li'>诚信服务</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:2}}" tag='li'>规则中心</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:3}}" tag='li'>客户中心</router-link>
                           <router-link :to="{path:'/newsmain',query:{title_id:4}}" tag='li'>招商加盟</router-link>
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
                            <li>意见反馈</li>
                            <router-link :to="{path:'/newsmain',query:{title_id:7}}" tag='li'>隐私权条款</router-link>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>关于优便</p>
                        <ul>
                            <router-link :to="{path:'/newsmain',query:{title_id:8}}" tag='li'>了解优便</router-link>
                            <router-link :to="{path:'/newsmain',query:{title_id:9}}" tag='li'>加入优便</router-link>
                            <li>新浪微博</li>
                            <li>优便公众号</li>
                        </ul>
                    </li>
                    <li class='lf'>
                        <p class='service-title'>服务热线</p>
                        <p class='hot-line'>212-2525-2525</p>
                        <p class='service-date'>周一至周日9:00-19:00</p>
                    </li>
                </ul>
            </div>
            <div class="qrcode">
                <img src="../assets/pic/qrcode.png" alt="" class='pic-qrcode'>
            </div>
        </div> 
        <div class="footer-bottom">
            Copyright：武汉中奥互联科技有限公司
        </div>
    </footer>
</template>
<script>
    export default{
    }
</script>
<style scoped lang='less'>
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
                .content{
                    padding:10px;
                    color:#4f4f4f;
                    .content-title{
                        line-height: 40px;
                        font-size:22px;
                    }
                    .content-text{
                        line-height: 20px;
                        font-size:18px;
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
                            color:#333;
                        }
                    }
                }
            }
        }
        .logo{
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
                font-size:18px;
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
                font-size:16px;
                line-height: 32px;
            }
        }
        .qrcode{
            .pic-qrcode{
                width: 94px;
                height: 94px;
            }
        }
    }
    .footer-bottom{
        margin:auto;
        width: 1200px;
        font-size:16px;
        color:#656565;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
}
</style>

