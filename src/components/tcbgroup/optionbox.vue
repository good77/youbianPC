<template>
   <div class="optionbox">
       <div class="optionmain">
           <div class="select">
               <div class="iptbox">
                <span class='ipt-text'>分类</span>
                <el-cascader
                            v-model="type"
                           @change="handleChange"
                            placeholder="请选择分类"
                            :options="options"
                            filterable
                            change-on-select>
                    </el-cascader>
            </div>
            <div class="iptbox">
                    <span class='ipt-text'>日期</span>
                    <el-select v-model="date" placeholder="请选择"  @change='changeDate'>
                        <el-option
                       
                        v-for="item in option_date"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
            <div class="iptbox">
                    <span class='ipt-text'>价格</span>
                    <el-select v-model="price" placeholder="请选择"  @change='changePrice'>
                        <el-option
                        v-for="item in option_price"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
            <div class="iptbox">
                    <span class='ipt-text'>派单</span>
                    <el-select v-model="order" placeholder="请选择"  @change='changeOrder'>
                        <el-option
                        v-for="item in option_order"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
            <div class="iptbox">
                    <span class='ipt-text'>状态</span>
                    <el-select v-model="state" placeholder="请选择"  @change='changeState'>
                        <el-option
                        v-for="item in option_state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
           </div>
       </div>
       
   </div>
</template>
<script>
export default {
  data() {
    return {
      date:'0',
      price:'0',
      state:'0',
      order:'0',
      level_one:this.$route.query.level_one,
      level_two:this.$route.query.level_two,
      level_three:this.$route.query.level_three,
      type:[this.$route.query.level_one,this.$route.query.level_two,this.$route.query.level_three],
      option_date: [
        {
          value: "0",
          label: "不限"
        },
        {
          value: "1",
          label: "今天"
        },
        {
          value: "2",
          label: "三天内"
        },
        {
          value: "3",
          label: "一周内"
        },
        {
          value: "4",
          label: "半个月内"
        },
        {
          value: "5",
          label: "一个月内"
        },
      ],
      option_state: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未开始"
        },
        {
          value: "2",
          label: "进行中"
        },
        {
          value: "3",
          label: "已完成"
        },
      ],
      option_order: [
        {
          value: "0",
          label: "不限"
        },
        {
          value: "1",
          label: "普通"
        },
        {
          value: "2",
          label: "优单"
        },
      ],
      option_price: [
        {
          value: "0",
          label: "不限"
        },
        {
          value: "0-20",
          label: "0-20积分"
        },
        {
          value: "20-50",
          label: "20-50积分"
        },
        {
          value: "50-100",
          label: "50-100积分"
        },
         {
          value: "100-200",
          label: "100-200积分"
        },
         {
          value: "200-300",
          label: "200-300积分"
        },
         {
          value: "300-400",
          label: "300-400积分"
        },
         {
          value: "400-500",
          label: "400-500积分"
        },
         {
          value: "500-99999",
          label: "500积分以上"
        },
      ]
    };
  },
  computed:{
    options:function(){
      return this.$store.state.allCate
    }
  },
  mounted(){
    console.log(this.type)
    this.$store.dispatch('getAllCate');
  },
  methods:{
     handleChange(value) {
        if(value.length==3){
          this.level_one=value[0];
          this.level_two=value[1];
          this.level_three=value[2];
          var type = this.order;
          var order_type = this.state;
          var time = this.date;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            time,
            price,
            type,
            order_type
          }
          this.$http.post(
            'http://www.youbian.link/api/v1/index/same_city',
            data
          ).then(res=>{
            console.log(res)
            if(res.data.code==200){
              var data = res.data.data.order_list.data;
              this.$store.dispatch('srhGoods',data)
            }
          })
        }
      },
      changeDate(value){
         if(value==0){
          this.time= value;
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            price,
            type,
            order_type
          }
        }else{
          this.time = value;
          var time = this.time
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            time,
            price,
            type,
            order_type
          }
        }
        this.$http.post(
            'http://www.youbian.link/api/v1/index/same_city',
            data
          ).then(res=>{
            console.log(res)
            if(res.data.code==200){
              var data = res.data.data.order_list.data;
              this.$store.dispatch('srhGoods',data)
            }
          })
      },
      changePrice(value){
         if(value==0){
           this.price = value
          var time = this.time;
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var data={
            time,
            level_one,
            level_three,
            level_two,
            type,
            order_type
          }
        }else{
          this.price = value;
          var time = this.time
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            time,
            price,
            type,
            order_type
          }
        }
        this.$http.post(
            'http://www.youbian.link/api/v1/index/same_city',
            data
          ).then(res=>{
            console.log(res)
            if(res.data.code==200){
              var data = res.data.data.order_list.data;
              this.$store.dispatch('srhGoods',data)
            }
          })
      },
      changeState(value){
         if(value==0){
          this.state = value
          var time = this.time;
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            time,
            level_one,
            level_three,
            level_two,
            type,
            price
          }
        }else{
          this.state = value;
          var time = this.time
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            time,
            price,
            type,
            order_type
          }
        }
        this.$http.post(
            'http://www.youbian.link/api/v1/index/same_city',
            data
          ).then(res=>{
            console.log(res)
            if(res.data.code==200){
              var data = res.data.data.order_list.data;
              this.$store.dispatch('srhGoods',data)
            }
          })
      },
      changeOrder(value){
          if(value==0){
          this.order = value
          var time = this.time;
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            time,
            level_one,
            level_three,
            level_two,
            price,
            order_type
          }
        }else{
          this.order = value;
          var time = this.time
          var type = this.order;
          var order_type = this.state;
          var level_one = this.level_one;
          var level_two = this.level_two;
          var level_three = this.level_three;
          var price = this.price;
          var data={
            level_one,
            level_three,
            level_two,
            time,
            price,
            type,
            order_type
          }
        }
        this.$http.post(
            'http://www.youbian.link/api/v1/index/same_city',
            data
          ).then(res=>{
            console.log(res)
            if(res.data.code==200){
              var data = res.data.data.order_list.data;
              this.$store.dispatch('srhGoods',data)
            }
          })
      },
  }
};
</script>
<style scoped lang='less'>
/*字体颜色*/
.color-e99a83 {
  color: #e99a83;
}
/**/
.ipt-text {
  display: inline-block;
  width: 60px;
  height: 41px;
  text-align: center;
  line-height: 40px;
  color: #999;
}
.optionbox {
  padding-top: 40px;
  width: 1200px;
  margin:auto;
  height: 200px;
  background-color: #fff;
  margin-top:10px;
  border-radius:4px;
  .optionmain {
    padding-left: 30px;
    width: 1170px;
    margin: auto;
    .select {
      overflow: hidden;
      width: 900px;
      .iptbox {
        float: left;
        width: auto;
        overflow: hidden;
        margin-right: 100px;
        margin-bottom: 27px;
      }
    }
    .search {
      float: left;
      white-space: nowrap;
      overflow: hidden;
      width: 662px;
      height: 40px;
      border: 2px solid #ababab;
      border-radius: 4px;
      .srh-ipt {
        width: 580px;
        height: 40px;
        border: 0;
        outline: none;
        text-indent: 15px;
        line-height: 40px;
        font-size: 16px;
      }
      .srh-btn {
        outline: none;
        color: #fff;
        font-size: 16px;
        background-color: #ababab;
        width: 78px;
        border: 0;
        height: 40px;
      }
    }
  }
  .sum {
    line-height: 40px;
    width: 270px;
    float: right;
    text-align: center;
  }
}
</style>

