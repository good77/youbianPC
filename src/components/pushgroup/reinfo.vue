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
                <li>
                  附件
                  <div class='iptbox'>
                    <input type="file">
                    <span class='jiami' :class='{isClock:isClock==1}' @click='jiami'><i class='el-icon-success'>文件加密</i></span>
                  </div>
                </li>        
            </ul>
        </div>
        <div class="info-basic">
            <div class='tip'>详情描述（必填）</div>
               <vue-editor id="editor"
               useCustomImageHandler
               @imageAdded="handleImageAdded"
                v-model="detail.describe">
              </vue-editor>
        </div>
        <div class="btnbox">
            <div class="btn" @click='send'>
              确认发布
            </div>
        </div>
    </div>
</template>
<script>
import Token from '../../store/token'
import { VueEditor } from 'vue2-editor'
import VDistpicker from 'v-distpicker'
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
    };
  },
  components: {
       VueEditor,
       VDistpicker
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
            describe
          }
          this.$http.post(
            '/api/release/edit',
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
          url: '/api/release/img',
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
      url:'/api/release/edit',
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
    width: 1200px;
    margin:auto;
    .btn{
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
  }
}
</style>

