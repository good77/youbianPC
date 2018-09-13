<template>
    <div class="info">
        <div class="info-basic">
            <div class='tip'>基本信息</div>
            <ul class="infolist">
               <li>
                  <span class='xinghao'>*</span>标题
                  <div class='iptbox1'>
                    <el-input  placeholder="请输入标题（简单描述服务，20字以内）" v-model="title"  @change="changeTitle" ></el-input>
                  </div>
                </li>
               <li>
                  <span class='xinghao color-fff'>*</span>地址
                  <div class='iptbox1'>
                        <el-cascader
                            size="large"
                            :options="citylist"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                  </div>
                </li>
                <li>
                  <span class='xinghao'>*</span>分类
                  <div class='iptbox'>
                     <el-cascader
                           @change="handleChange"
                            placeholder="请选择分类"
                            :options="options"
                            filterable
                            change-on-select>
                    </el-cascader>
                  </div>
                </li>
                 <li>
                  <span class='xinghao'>*</span>价格
                  <div class='iptbox'>
                    <el-input  placeholder="请输入单价（积分）" v-model="price" @change="changePrice" type='number'></el-input>
                  </div>
                </li>
                 <li>
                  <span class='xinghao'>*</span>次数
                  <div class='iptbox'>
                    <el-input  placeholder="请输入次数（可完成次数）" v-model="number"  @change="changeNumber" type='number'></el-input>
                  </div>
                </li>
                 <li>
                  <span class='xinghao'>*</span>周期
                  <div class='iptbox'>
                    <el-input  placeholder="请输入完成周期 如：(1天)" v-model="cycle" @change="changeCycle"></el-input>
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
                    <el-input  placeholder="请输入视频连接" v-model="video_url"></el-input>
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
                <textarea v-model="describe"></textarea>
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
            <div class="btn" @click='open'>
              确认发布
            </div>
            <div class="btn" @click='goback'>
              取消
            </div>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
import {regionData} from 'element-china-area-data'
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
      isClock:0,
      citylist:regionData,
      selectedOptions:[],
      dialogImageUrl: '',
      dialogVisible: false,
      img:[],
      file:'',
      fileList1:[],
    };
  },
   computed:{
      options:function(){
      return this.$store.state.allCate
    },
    sum:function(){
      return this.price*this.number
    }
   },
  methods: {
    open(){
      this.$confirm('您是否确定发布订单并扣除?'+this.sum+'积分', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.send();          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '发布已取消'
          });          
        });
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
    jiami(){
      if(this.isClock==1){
        this.isClock=0
      }else{
        this.isClock=1;
      }
    },
    handleChange(value) {
      this.province_code=value[0];
      this.city_code = value[1];
      this.area_code = value[2]
    },
    send(){
      console.log(this.describe)
          var title = this.title;
          var price = this.price;
          var number = this.number;
          var cycle = this.cycle;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var province_code = this.province_code;
          var area_code = this.area_code;
          var city_code = this.city_code;
          var video_url =  this.video_url;
          var describe = this.describe;
          var img = this.img.toString();
          var encryption = this.isClock;
          var file = this.file;
          console.log(this.file)
          var data={
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
            img,
            encryption,
            file
          }
          
          this.$http.post(
            'http://www.youbian.link/api/v1/release/release_info',
            data,
            	{headers: {
				token:Token.fetch()}}
          ).then(res=>{
            if(res.data.code==200){
                console.log(this)
                this.$message({
                    message: '发布成功',
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
    handleChange(value) {
      if(value.length==3){
        this.level_one=value[0];
        this.level_two=value[1];
        this.level_three=value[2];
      }
    },
     handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        var formData = new FormData();
        formData.append('img', file)
 
        this.$http({
          url: 'http://www.youbian.link/api/v1/release/img',
          method: 'post',
          data: formData
        })
        .then((result) => {
          let url = result.data.data // Get url from response
          console.log(url)
          Editor.insertEmbed(cursorLocation, 'image',url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
      },
    onChangeArea(a){
      this.area_code=a.code;  
    },
    onChangecity(a){
      this.city_code=a.code;
    },
    onChangeprovince(a){
      this.province_code=a.code;
    },
    changePrice(a){
      this.price=a;
    },
    changeNumber(a){
      this.number=a;
    },
    changeTitle(a){
      if(a.length>20){
        var a = a.substring(0,20);
        this.title = a;
      }else{
        this.title = a;
      }
      this.title=a;
    },
    changeCycle(a){
      this.cycle=a;
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted(){
    this.$store.dispatch('getAllCate');
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
      cursor: pointer;
      opacity: .9;
    }
  }
}
</style>

