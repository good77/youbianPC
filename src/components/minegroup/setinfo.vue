<template>
    <div class="myinfo">
        <div class="title">
            <p>账号管理>个人资料</p>
        </div>
        <div class="main">
            <p class='main-title'>基本信息</p>
            <div class="infobox">
                <div class="info-left">
                    <div class="txbox">
                         <img :src="imgDataUrl">
                    </div>
                    <a class="txbtn" @click="toggleShow">设置头像</a>
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
                </div>
                <div class="info-right">
                    <ul class="user-info">
                        <li>
                            <img src="../../assets/pic/icon-user.png" alt="" class='icon'>
                            用 户 名 ：<input type="text" class='username' placeholder="请输入新名称" v-model="name">
                        </li>
                        <li>
                            <img src="../../assets/pic/icon-sex.png" alt="" class='icon'>
                            性　　别： 
                            <el-radio v-model="sex" label="1" >男</el-radio>
                            <el-radio v-model="sex" label="2">女</el-radio>
                        </li>
                        <li>
                            <img src="../../assets/pic/icon-adress.png" alt="" class='icon'>
                            地　　址：
                            <span>  
                                    <el-cascader
                                        size="large"
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleChange">
                                    </el-cascader>
                            </span>
                        </li>
                        <li>
                            <img src="../../assets/pic/icon-phone.png" alt="" class='icon'>
                            手 机 号 ：<span class='name'>{{userInfo.phone.substring(0,3)}}****{{userInfo.phone.substring(7,11)}}</span><router-link tag='span' to="/mine/change" class='hasNamed'>更换手机号>></router-link>
                        </li>
                        <li>
                            <span class="icon"></span>
                            真实姓名：<span class='name'>{{userInfo.rel_name}}</span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            身份认证：<span class='name' v-if='userInfo.id_card'>{{userInfo.id_card.substring(0,6)}}******{{userInfo.id_card.substring(12,18)}}</span><router-link tag='span' to='/mine/check' class='hasNamed'>更换实名认证信息>></router-link>
                        </li>
                    </ul>
                    <button class="updateinfo" @click='setinfo'>提交信息</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {regionData} from 'element-china-area-data'
import "babel-polyfill";
import myUpload from 'vue-image-crop-upload'
import Token from '../../store/token'
export default {
  data() {
    return {
      radio: "",
      province_code:'',
      city_code:'',
      area_code:'',
      sex:'1',
      name:'',
      show: false,
			params: {},
			headers: {
				token: Token.fetch(),
			},
      imgDataUrl: '', // the datebase64 url of created image,
      options: regionData,
      selectedOptions: []
    }
  },
  components: {
       myUpload,
	},
  methods:{
      setinfo(){
        var data={
          name:this.name,
          sex:this.sex,
          province_code:this.province_code,
          city_code:this.city_code,
          area_code:this.area_code,
        }
        this.$http.post(
          'http://www.youbian.link/api/v1/user/user_edit',
          data,
          {headers: {
		        token:Token.fetch()}}
        ).then(res=>{
          console.log(res)
        })
      },
      handleChange(value) {
        this.province_code=value[0];
        this.city_code = value[1];
        this.area_code = value[2]
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
  },
  computed:{
      userInfo:function(){
        var data = this.$store.state.userInfo;
        this.name= data.name
        this.imgDataUrl = data.img;
        return this.$store.state.userInfo
      },
  },
  mounted(){
    this.$http({
      method:'get',
      url:'http://www.youbian.link/api/v1/user/user_edit',
      headers:{
        token:Token.fetch()
      }
    }).then(res=>{
      var data = res.data.data;
      this.selectedOptions.push(data.province_code);
      this.selectedOptions.push(data.city_code);
      this.selectedOptions.push(data.area_code);
    })
  }
};
</script>
<style lang="less" scoped>
/**/

.distpicker-address-wrapper{
    display: inline;
    font-size:14px !important;
}
//
.myinfo {
  .title {
    text-indent: 15px;
    color: #db5618;
    font-weight: 600;
    font-size: 18px;
    line-height: 77px;
    height: 77px;
    border-bottom: 1px solid #e1e1e1;
  }
  .main {
    .main-title {
      text-indent: 15px;
      color: #404040;
      font-size: 16px;
      line-height: 50px;
      margin-bottom: 36px;
    }
    .infobox {
      .info-left {
        float: left;
        width: 120px;
        padding: 0 15px 0 15px;
        .txbox {
          background-color: #000;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          
          img {
            width: 100%;
          }
        }
        .txbtn{
          margin-top:14px;
          text-align: center;
          color:#db5618;
            display: block;
            width: 120px;
            height: 24px;
          }
        .changetx {
          font-size: 14px;
          padding-top: 20px;
          display: block;
          width: 120px;
          text-align: center;
          color: #db5618;
        }
      }
      .info-right {
        width: 850px;
        float: right;
        .user-info {
          width: 100%;
          color: #666666;
          float: left;
          font-size: 16px;
          line-height: 40px;
          margin-bottom: 40px;
          .username {
              margin-left:6px;
            text-indent: 10px;
            height: 40px;
            width: 214px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.15)
          }
          .icon {
            vertical-align: middle;
            margin: 0 20px 0 20px;
            width: 16px;
            display: inline-block;
          }
          .name {
            color: #595959;
          }
          .hasNamed {
            margin-left: 10px;
            font-size: 14px;
            line-height: 16px;
            color: #db5618;
            img {
              margin-left: 4px;
              vertical-align: middle;
            }
          }
        }
        .updateinfo {
          font-size: 18px;
          margin-left: 50px;
          width: 177px;
          height: 44px;
          border: 0;
          color: #fff;
          background-color: #db5618;
        }
      }
    }
  }
}
</style>
