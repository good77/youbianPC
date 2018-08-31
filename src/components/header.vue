<template>
    <header>
        <div class="topbox">
            <div id='top'>
            <div class="top-left">
                <span class='font-city'>{{city}}</span>
                <span style='position:relative'>
                    <span @click='showCity'>[切换城市]</span>
                    <div class="citybox" v-if="show">
                        <p>城市选择</p>
                        <ul class='limit'>
                            <li @click='limit(1)' :class='{isLimit:isLimit==1}'>热门</li>
                            <li @click='limit(2)' :class='{isLimit:isLimit==2}'>ABCDE</li>
                            <li @click='limit(3)' :class='{isLimit:isLimit==3}'>FGHJ</li>
                            <li @click='limit(4)' :class='{isLimit:isLimit==4}'>KLMN</li>
                            <li @click='limit(5)' :class='{isLimit:isLimit==5}'>PQRST</li>
                            <li @click='limit(6)' :class='{isLimit:isLimit==6}'>WXYZ</li>
                        </ul>
                        <div class="citylist">
                            <div class="title">热门</div>
                            <div class='itembox'>
                                <ul class="item">
                                    <li v-for="(item,key) in cityList.hot" :key="key" @click='changecity(item.name)'>
                                        {{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
            <div class="icon-box" style='position:relative'>
                <span class='sina'>
                    <i class='iconfont icon-sina'></i>
                </span>
                <div class="sinabox">
                    <img src="../assets/pic/sina.png" alt="">
                </div>
                <span class='wechat'>
                    <i class='iconfont icon-wechat'></i>
                </span>
                <div class="wechatbox">
                    <img src="../assets/pic/wechat.jpg" alt="">
                </div>
            </div>
            <div class="top-right">
                <div class="login-register" v-if="!username">
                    请<span class='font-login'>
                        <router-link tag="span" to="/user/login">登录</router-link>/
                        <router-link tag="span" to="/user/register">注册</router-link>
                    </span>
                </div>
                 <div class="login-register" v-if="username">
                    <span class='font-login'>
                        {{username}}
                        <span class='logout' @click='logout'>退出</span>
                    </span>
                </div>
                <ul class="nav">
                    <router-link tag='li' to='/mine/home' class='nav-text'>个人中心</router-link>
                    <router-link tag='li' to='/mine/vipup'>会员升级</router-link>
                    <router-link :to="{path:'/newsmain',query:{title_id:6}}" tag='li'>帮助中心</router-link>
                    <li class='lastson'>
                        快速导航
                    </li>
                </ul>
            </div>
        </div>
        </div>
        <div class='srh-box'>
            <div class="logo">
                <img src="../assets/pic/logo.png" alt=""  class='logomain'>
                <img src="../assets/pic/logoelse.png" alt="" class='logoelse'>
            </div>
            <div class="slogan">
                <p>优质服务</p>
                <p>便你左右</p>
            </div>
            <div class="srh-btn">
                <img src="../assets/pic/icon-srh.png" alt="" class='icon-srh'>
                <input type="text" class='ipt' placeholder="请输入您想要搜索的关键字" v-model='srhtext' @keyup.enter="srh">
                <button class='btn' @click='srh'>搜索</button>
                <div class="wordlist">
                    <span>同城便</span>
                    <span>同城便</span>
                    <span>同城便</span>
                </div>
            </div>
            <router-link tag='div' :to="{path:'/push/info'}" class="sent-info">
                发布信息
            </router-link>
        </div>
        <div class='navbox'>
            <ul class="navlist">
                <router-link tag='li' to='/' class='first-child' exact-active-class="active">
                    <img src="../assets/pic/home.png" alt="" class='icon-home'>
                    首页
                </router-link>
                <router-link tag="li" :to="{path:'/tcb',query:{level_one:10}}"  class='other-child' active-class="active" v-on:click="isActive='2'">同城便</router-link>
                <router-link tag="li" to="/act"  class='other-child' active-class="active">活动专区</router-link>
                <router-link tag="li" to="/rank/send" class='other-child' active-class="active">发布榜单</router-link>
                <router-link tag="li" to="/rank/rec"  class='other-child' active-class="active">接收榜单</router-link>
            </ul>
        </div>
    </header>  
</template>
<script>
import cityList from 'china-city-data';
    export default{
        data(){
            return {
                city:'武汉',
                srhtext:'',
                username:window.sessionStorage.getItem('username'),
                isLimit:1,
                cityList,
                show:false
            }
        },
        methods:{
            changecity(city){
                this.show=false;
                this.city=city
            },
            logout(){
                sessionStorage.clear();
                this.$router.push('/user/login')
            },
            srh(){
                console.log(this.srhtext)
                var data ={
                    search_top:this.srhtext
                }
                this.$http.post(
                    'http://www.youbian.link/api/v1/index/search',data
                ).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.$store.dispatch('srhGoods',res.data.data)
                        this.$router.push('/tcb')
                    }
                })
            },
            showCity(){
                this.show=true;
            },
            limit(num){
                this.isLimit=num;
            }
        }
    }
</script>
<style lang="less" scoped>
header{
    background-color: #fff;
}
/*hover*/
.login-register{
    cursor: pointer;
    width: 170px;
    text-align: right;
    .logout{
        display: inline-block;
        text-indent: 6px;
        color:#666;
    }
}
.nav-text:hover{
    cursor: pointer;
    color:#dd5519;
}
/*active*/
.active{
    background-color: #ea910f;
    color:#fff !important;
}
.font-city{
    font-weight: 600;
    color:#dd5519;
}
.font-login{
    color:#dd5519;
}
.icon{
    display:inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
}
.icon-left{
        margin-right:14px;
    }
.icon-list{
    width: 16px;
    height: 16px;
}
#city{
    border:0;
    width: 0;
}
/*最顶部，城市-登录-注册等*/
.topbox{
    width: 100%;
    border-bottom:1px solid #eaeaea;
    background-color: #fff;
}
.sinabox,.wechatbox{
    position:absolute;
    top:30px;
    background-color: #fff;
    width: 100px;
    height: 100px;
    padding:10px;
    border-radius:4px;
    border:1px solid #eaeaea;
    z-index: 9999;
    display: none;
    img{
        width: 100%;
    }
}
.sinabox{
    left:-55px;
}
.wechatbox{
    left:-30px;
}
#top{
    line-height: 36px;
    font-size:14px;
    margin:auto;
    width: 1200px;
    height: 36px;
    background-color: #fff;
    div{
        float: left;
    }
    .top-left{
        margin-right:36px;
    }
    .icon-box{
        margin-right:450px;
        .iconfont{
            font-size:18px;
            color:#999;
        }
        .sina:hover .icon-sina{
            color:#f00;
        }
        .sina:hover + .sinabox{
            display: block;
        }
        .wechat:hover .icon-wechat{
            color:#85DA46;
        }
        .wechat:hover+.wechatbox{
            display: block;
        }
    }
    .top-right{
        float: right;
        .nav{
            float: right;
            display: flex;
            justify-content: flex-end;
            height: 36px;
            li{
                float: left;
                width: 90px;
                text-align: right;
                list-style:none;
            }
            li:hover{
                cursor: pointer;
                color:#ea910f;
            }
            .lastson{
                box-sizing: border-box;
                padding-left:20px;
            }
        }
    }
}
//城市选择器
.isLimit{
    color:#fff!important;
    background-color: #d0000e!important;
}
.citybox{
    font-size:12px;
    top:20px;
    left:0px;
    width: 330px;
    padding:12px;
    background-color: #fff;
    border:1px solid #eaeaea;
    box-shadow:1px 1px 5px #eaeaea;
    position:absolute;
    .limit{
        display: flex;
        justify-content: space-around;
        li{
            height: 20px;
            padding:0 10px;
            line-height: 20px;
            background-color: #f2f2f3;
        }
        li:hover{
            color:#d0000e;
        }
    }
    .citylist{
        padding-top:10px;
        .title{
            float: left;
            width: 40px;
            font-size:15px;
            color:#d0000e;
        }
        .itembox{
            width: 280px;
            float: left;
            .item{
                display: flex;
                justify-content: space-start;
                flex-wrap: wrap;
                li{
                    margin-left:5px;
                }
                li:hover{
                    color:#d0000e;
                    cursor: pointer;
                }
            }
        }
    }
}
/*搜索部分*/
   .srh-box{
       display: flex;
       justify-content: space-around;
        line-height: 160px;
        width: 1200px;
        height: 160px;
        margin:auto;
        .logo{
            float: left;
            .logomain{
            vertical-align: middle;
            width: 154px;
            height: 84px;
            padding-right:12px;
            border-right:2px solid #dd5519;
            }
            .logoelse{
                vertical-align: middle;
                margin:8px;
            }
        }
        .slogan{
            padding-top:60px;
            float: left;
            font-size:18px;
            display: block;
            line-height: 23px;
            color:#f9ac78;
        }
        .srh-btn{
            position: relative;
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            margin:60px 0 0 60px;
            width: 600px;
            height: 40px;
            float: left;
            border:2px solid #ea910f;
            .wordlist{
                position:absolute;
                top:40px;
                font-size:12px;
                color:#ababab;
            }
            .icon-srh{
                margin-top:8px;
                margin-left:6px;
                width: 22px;
                height: 22px;
            }
            .ipt{
                margin-right:2px;
                vertical-align: middle;
                height: 40px;
                width: 470px;
                outline: none;
                border:0;
                font-size:18px;
                text-indent: 10px;
                font-weight: 500;
            }
            .btn{
                outline: none;
                vertical-align: middle;
                font-size:22px;
                color:#fff;
                width: 90px;
                height: 40px;
                background-color: #ea910f;
                border:0;
            }
            .btn:hover{
                cursor: pointer;
                opacity: .9;
            }
        }
        .sent-info{
            font-size:22px;
            line-height: 44px;
            margin-top:60px;
            float: right;
            width: 168px;
            height: 44px;
            background-color: #dd5519;
            color:#fff;
            text-align: center;
        }
        .sent-info:hover{
            opacity: .9;
            cursor: pointer;
        }
    }
    /*choose*/
.choose{
    background-color: #ea910f;
    color:#fff !important;
}
/*tab*/
    .navbox{
        height: 39px;
        width: 100%;
        line-height: 39px;
        border-bottom:3px solid #ea910f;
        .navlist{
            width: 1200px;
            margin:auto;
            li{
                font-size:16px;
                color:#3f3f3f;
                font-weight: 600;
                list-style: none;
                float: left;
                text-align: center;
                .icon-home{
                    padding-bottom: 11px;
                    vertical-align: bottom;
                    width: 17px;
                    height: 17px;
                }
            }
            li:hover{
                cursor: pointer;
                background-color: #ea910f;
                color:#fff !important;
            }
            .first-child{
                    width: 154px;
                }
            .other-child{
                width: 115px;
            }
        }
    }
</style>

