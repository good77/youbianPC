<template>
<div class="main">
    <header-com />
    <div class="detail">
        <p class='guide'>帮助中心>　<span class='vice-guide'>意见反馈</span></p>
    </div>
    <div class="suggest">
        <div style='text-align:center;font-size:18px;margin-bottom:30px;color:#666;'>请于此提交您的宝贵建议</div>
        <div class="type">
            <div class='title'>
                意见类型
            </div>
            <ul class="typelist">
                <li :class='{isActive:isActive==1}' @click='isActive=1'>信息分类建议</li>
                <li :class='{isActive:isActive==2}' @click='isActive=2'>区域划分建议</li>
                <li :class='{isActive:isActive==3}' @click='isActive=3'>创意点子</li>
                <li :class='{isActive:isActive==4}' @click='isActive=4'>其他建议</li>
            </ul>
        </div>
        <div class="content">
            <div class='title'>
                意见内容
            </div>
            <textarea v-model="content"></textarea>
        </div>
        <div class="upload">
            <div class='title'>
                上传图片
            </div>
            <div class="img">
                <el-upload
                    action="http://www.youbian.link/api/v1/release/img"
                    list-type="picture-card"
                    name='img'
                    :on-success='success'
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="suggestbtn" @click='suggest'>
            提交
        </div>
    </div>
    <footer-com />
</div>

</template>
<script>
import Token from '../store/token'
    import HeaderCom from '@/components/header'
    import FooterCom from '@/components/footer'
    export default{
        data(){
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                img:[],
                isActive:1,
                content:''
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            success(res, file, fileList){
                this.img.push(res.data)
                console.log(this.img)
            },
            suggest(){
                var data = {
                    type:this.isActive,
                    content:this.content,
                    img:this.img.toString()
                }
                this.$http({
                    method:'post',
                    url:'http://www.youbian.link/api/v1/footer/feedback',
                    data:data,
                    headers: {
                        token:Token.fetch()
                    }             
                }).then(res=>{
                    console.log(res)
                })
            }
        },
        computed:{
            detail:function(){
                return this.$store.state.footer1
            }
        },
        mounted(){
            var id = this.$route.query.id;
            var title_id = this.$route.query.title_id;
            if(id){
                this.$store.dispatch('getFooter3',id)
            }
            if(title_id){
                 this.$store.dispatch('getFooter1',title_id)
            }
            window.scrollTo(0,0);  
        },
        components:{
            HeaderCom,
            FooterCom
        }
    }
</script>
<style lang="less" scoped>
.isActive{
      background-color: #ea910f!important;
    color:#fff!important;
}
.main{
    width: 100%;
    background-color: #fff;
    .detail{
        width: 1200px;
        margin:auto;
        .guide{
            font-size:16px;
            padding:20px 0 20px 0;
            color:#3f3f3f;
            .vice-guide{
                color:#dd5519;
            }
        }
    }
    .suggest{
        color:#999;
        border:1px solid #E2E2E2;
        width: 940px;
        margin:auto;
        background-color: #FBFBFB;
        margin-bottom:30px;
        padding:30px 130px;
        .type{
            height: 50px;
            .title{
                float: left;
                line-height: 24px;
                color:#666;
            }
            .typelist{
                float: left;
                display: flex;
                justify-content: space-around;
                li{
                    height: 20px;
                    border:1px solid #eaeaea;
                    background-color: #fff;
                    text-align: center;
                    line-height: 20px;
                    padding:2px 5px;
                    margin-left:30px;
                    cursor: pointer;
                }
                li:hover{
                    background-color: #ea910f;
                    color:#fff;
                }
            }
        }
        .content{
            .title{
                float: left;
                color:#666;
            }
            textarea{
                padding:10px;
                box-sizing: border-box;
                width: 600px;
                margin-left:30px;
                height: 160px;
                border:1px solid #eaeaea;
            }
        }
        .upload{
            padding-top:5px;
            overflow: hidden;
            .title{
                float: left;
                color:#666;
                margin-right:30px;
            }
            .img{
                float: left;
                width: 625px;
            }
        }
    }
    .suggestbtn{
        margin-top:10px;
        margin-left:90px;
        width: 150px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #ea910f;
        color:#fff;
        border-radius:4px;
    }
}
</style>

