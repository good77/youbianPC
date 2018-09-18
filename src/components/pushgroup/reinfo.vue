<template>
    <div class="info">
        <div class="info-basic">
            <div class='tip'>基本信息</div>
            <ul class="infolist">
               <li>
                  <span class='xinghao'>*</span>标题
                  <div class='iptbox1'>
                    <el-input  placeholder="请输入标题（简单描述服务）" v-model="detail.title"  @change="changeTitle"></el-input>
                  </div>
                </li>
                 <li>
                  <span class='xinghao'>*</span>周期
                  <div class='iptbox'>
                    <el-input  placeholder="请输入完成周期 如：(1天)" v-model="detail.cycle" @change="changeCycle"></el-input>
                  </div>
                </li>
               
            </ul>
        </div>
        <div class="info-basic">
            <div class='tip'>信息补充（选填）</div>
               <ul class="infolist">
               <li>
                  视频
                  <div class='iptbox'>
                    <el-input  placeholder="请输入视频连接" v-model="detail.video_url"></el-input>
                  </div>
                </li>  
               <li style="overflow:hidden;height:auto">
                  <div style='float:left'>附件</div>
                  <div class='iptbox' style="float:left">
                    <el-upload
                      action="http://www.youbian.link/api/v1/release/file"
                      :on-success='success1'
                      name='img'
                      :limit="1"
                       @on-remove='removeFile'
                      :file-list="fileList1">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <span class='jiami' :class='{isClock:isClock==1}' @click='jiami'><i class='el-icon-success'>文件加密</i></span>
                  </div>
                </li>         
            </ul>
        </div>
        <div class="info-basic">
            <div class='tip'>详情描述（必填）</div>
            <div class="content">
                <div class='title'>
                    描述内容
                </div>
                <textarea v-model="detail.describe" placeholder="请对服务的内容进行详细的描述（限制100字以内）" @keyup="checkzishu"></textarea>
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
        </div>
        <div class="btnbox">
            <div class="btn" @click='send'>
              确认修改
            </div>
            <router-link tah='div' to="/mine/yfbd" class="btn">
              取消
            </router-link>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
export default {
  data() {
    return {
      title:'',
      level_one:'',
      level_two:'',
      level_three:'',
      video_url:'',
      price:'',
      number:'',
      cycle:'',
      describe: '',
      province_code:'',
      city_code:'',
      area_code:'',
      isClock:false,
      selectedOptions:[],
      dialogImageUrl: '',
      dialogVisible: false,
      img:[],
      file:'',
      fileList1:[]
    };
  },
   computed:{
      options:function(){
        return this.$store.state.allCate
      },
      detail:function(){
        return this.$store.state.order_detail
      }
   },
  methods: {
     checkzishu(){
      if(this.describe.length>100){
        this.describe = this.describe.substring(0,100)
      }
    },
    jiami(){
      if(this.isClock){
        this.isClock=false
      }else{
        this.isClock=true;
      }
    },
    send(){
          var id = this.detail.id;
          var title = this.detail.title;
          var price = this.detail.price;
          var number = this.detail.number;
          var cycle = this.detail.cycle;
          var level_one = this.detail.level_one;
          var level_two = this.detail.level_two;
          var level_three = this.detail.level_three;
          var province_code = this.detail.province_code;
          var area_code = this.detail.area_code;
          var city_code = this.detail.city_code;
          var video_url =  this.detail.video_url;
          var describe = this.detail.describe;
          var encryption = this.detail.encryption;
          if(this.file.length>0){
            var file = this.file
          }else{
            var file = this.detail.file
          }
          if(this.img.length>0){
            var img = this.img.toString()
          }else{
            var img = this.detail.img.toString();
          }
          var data={
            id,
            title,
            price,
            number,
            cycle,
            level_one,
            level_two,
            level_three,
            province_code,
            area_code,
            city_code,
            video_url,
            describe,
            img
          }
          this.$http.post(
            'http://www.youbian.link/api/v1/release/edit',
            data,
            	{headers: {
				      token:Token.fetch()}}
          ).then(res=>{
              if(res.data.code==200){
                console.log(this)
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.$router.push('/mine/yfbd')
            }else{
                this.$message({
                    message: res.data.message,
                    type: 'warning'
                });
            }    
          })
    },
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
    success1(res, file, fileList){
        this.file=res.data
    },
    removeFile(){
      this.file=''
    },
    changePrice(a){
      this.price=a;
    },
    changeNumber(a){
      this.number=a;
    },
    changeTitle(a){
      this.title=a;
    },
    changeCycle(a){
      this.cycle=a;
    },
  },
  mounted(){
    var data = {
      id :this.$route.query.id
    }
    this.$http({
      methods:'get',
      url:'http://www.youbian.link/api/v1/release/edit',
      params:data,
      headers:{token:Token.fetch()}
    }).then(res=>{
      var data= res.data.data;
      this.$store.dispatch('getOrderDetail',data)
    })
  }
};
</script>
<style lang="less" scoped>
//
.color-fff{
  color:#fff !important;
}
.isClock{
  color:#ea910f;
}
.jiami{
  position: absolute;
}
//
.info {
  color:#999;
  width: 100%;
  background: #eff3f5;
  padding-top: 20px;
  .tip{
    height: 48px;
    line-height: 48px;
    border-bottom:1px solid #eaeaea;
    margin-bottom:20px;
  }
  .info-basic {
    padding: 30px;
    width: 1140px;
    margin: auto;
    background-color: #fff;
    margin-bottom:30px;
    border-radius:10px;
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
    .infolist{
      
      li{
        line-height: 40px;
        height: 40px;
        margin-bottom:20px;
      }
       .xinghao{
          color:#ea910f;
          padding-right:20px;
        }
        .iptbox{
          margin-left:20px;
          display: inline-block;
          width: 220px;
        }
        .iptbox1{
          margin-left:20px;
          display: inline-block;
          width: 620px;
        }
    }
  }
  .btnbox{
     overflow: hidden;
    width: 1200px;
    margin:auto;
    .btn{
      float: left;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color:#fff;
      border-radius:4px;
      width: 240px;
      margin-left:30px;
      margin-bottom:30px;
      background-color: #ea910f;
    }
    .btn:hover{
      opacity: .9;
      cursor: pointer;
    }
  }
}
</style>

