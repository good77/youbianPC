<template>
    <div>
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
        <ul class="sort"  v-if="goodsList.length>0">
            <li :class='{isActive:sort==0}' @click='getsort(0)'>综合↑</li>
            <li :class='{isActive:sort==1}' @click='getsort(1)'>价格↑</li>
            <li :class='{isActive:sort==2}' @click='getsort(2)'>完成时间↑</li>
            <li :class='{isActive:sort==3}' @click='getsort(3)'>发布数量↑</li>
        </ul>
        <div class="nogoods" v-if="goodsList.length<1">
            <p>没有找到您想要的订单！~</p>
            <img src="../../assets/pic/nogoods.png" alt="">
        </div>
        <ul class="goodslist">
            <li v-for='(item,index,key) in goodsList' v-if="index>=((pagenum-1)*10)&&index<(pagenum*10)"  :key=key>
                <div class="item-left">
                    <div class="title">
                        <router-link tag='span' :to='{path:"/tcbmain",query:{id:item.id}}' class='getdetail'>{{item.title}}</router-link>
                        <span v-show="true">
                            <img src="../../assets/pic/icon-you.png" alt="" class='icon-you' v-if='item.order_type==2'>
                        </span>
                        <span v-show="true">
                            <img src="../../assets/pic/icon-lock.png" alt="" class='icon-lock' v-if='item.encryption==1'>
                        </span>
                    </div>
                    <div class="type-date">
                        <p style='text-overflow:ellipsis;width:300px;overflow:hidden;white-space:nowrap;font-size:12px;'>{{item.describe}}</p>
                        <span class='type'><img src="../../assets/pic/icon-type.png" alt="" class='icon-type'>{{item.get_one.name}}-{{item.get_two.name}}-{{item.get_three.name}}</span>
                        <span class='date'><img src="../../assets/pic/icon-date.png" alt="" class='icon-date'>{{item.update_time}}</span>
                    </div>
                    <div class="points">
                        {{item.price}} <span class='jifen'>积分</span>
                    </div>
                </div>
                <div class="item-center">
                    <div class="times">
                        次数：{{item.singular}}/{{item.number}}
                    </div>
                    <div class="months">
                        周期：{{item.cycle}}
                    </div>
                </div>
                <div class="item-right">
                    <span @click="goUser(item.get_user.id)" class='username'><img src="../../assets/pic/icon-vip.png" alt="" class='icon-vip'>{{item.get_user.name}}</span>
                    <button @click="goGoods(item.id)" class='getdetail'>查看详情</button>
                </div>
            </li>
        </ul>
        <div class="pagerbox"  v-if="goodsList.length>0">
            <div class="pager">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="goodsList.length"
                class='pager'
                @prev-click="prev"
                @next-click="next"
                @current-change="current"
                >
            </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                pagenum:1,
                sort:0,
                date:'0',
                price:'0',
                state:'0',
                order:'0',
                level_one:this.$route.query.level_one,
                level_two:this.$route.query.level_two,
                level_three:this.$route.query.level_three,
                type:[this.$route.query.level_one,this.$route.query.level_two,this.$route.query.level_three],
                citycode:window.sessionStorage.getItem('citycode'),
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
                    label: "不限"
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
            }
        },
        watch:{
            $route:function(){
                if(this.$route.query.level_one==10){
                    if(!this.$route.query.level_two){
                    this.type=[10,'',''];
                    var order_type = this.state;
                    var time = this.date;
                    this.level_one = this.type[0];
                    this.level_two = this.type[1];
                    this.level_three = this.type[2];
                    var level_one = this.type[0];
                    var level_two = this.type[1];
                    var level_three = this.type[2];
                    var price = this.price;
                    var type = this.order;
                    var city_code = this.citycode
                    var data={
                        level_one,
                        level_three,
                        level_two,
                        time,
                        price,
                        type,
                        order_type,
                        city_code
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
                }
            }
        },
        methods: {
            goUser(id){
                window.open('./#/gtu?id='+id)
            },
            goGoods(id){
                window.open('./#/tcbmain?id='+id)
            },
            prev(num){
                this.pagenum=num
            },
            next(num){
                this.pagenum=num
            },
            current(num){
                this.pagenum=num
            },
           getsort(num){
               this.sort=num;
                    var data ={
                    level_one:this.level_one,
                    level_two:this.level_two,
                    level_three:this.level_three,
                    order_status:this.sort,
                    time:this.data,
                    price:this.price,
                    type:this.order,
                    order_type:this.state
                }
                console.log(data)
                this.$store.dispatch('getGoodsList',data)
            },
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
                    if(this.level_one==10){
                        var city_code = this.citycode
                         var data={
                            level_one,
                            level_three,
                            level_two,
                            time,
                            price,
                            type,
                            order_type,
                            city_code
                        }
                    }else{
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
                    this.$router.push({path:'/tcb',query:{level_one:this.level_one,level_two:this.level_two,level_three:this.level_three}})
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
                    if(level_one==10){
                        var city_code =this.citycode
                        var data={
                            level_one,
                            level_three,
                            level_two,
                            price,
                            type,
                            order_type,
                            city_code
                        }
                    }else{
                        var data={
                            level_one,
                            level_three,
                            level_two,
                            price,
                            type,
                            order_type
                        }
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
                    if(level_one==10){
                        var city_code = this.citycode;
                        var data={
                            level_one,
                            level_three,
                            level_two,
                            time,
                            price,
                            type,
                            order_type,
                            city_code
                        }
                    }else{
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
                if(level_one==10){
                    var city_code = this.citycode;
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        type,
                        order_type,
                        city_code
                    }
                }else{
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        type,
                        order_type
                    }
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
                    if(city_code==10){
                        var city_code = this.citycode
                        var data={
                            level_one,
                            level_three,
                            level_two,
                            time,
                            price,
                            type,
                            order_type,
                            city_code
                        }
                    }else{
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
                if(level_one==10){
                    var city_code = this.citycode
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        type,
                        price,
                        city_code
                    }
                }else{
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        type,
                        price
                    }
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
                if(level_one==10){
                    var city_code =this.citycode;
                    var data={
                        level_one,
                        level_three,
                        level_two,
                        time,
                        price,
                        type,
                        order_type,
                        city_code
                    }
                }else{
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
                if(level_one==10){
                    var city_code = this.citycode;
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        price,
                        order_type
                    }
                }else{
                    var data={
                        time,
                        level_one,
                        level_three,
                        level_two,
                        price,
                        order_type
                    }
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
                    if(level_one==10){
                        var city_code = this.citycode;
                        var data={
                            level_one,
                            level_three,
                            level_two,
                            time,
                            price,
                            type,
                            order_type
                        }
                    }else{
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
        },
        computed:{
            goodsList:function(){
                return this.$store.state.goodsList;
            },
            total:function(){
                return this.$store.state.goodsList.length;
            },
            options:function(){
                return this.$store.state.allCate
            }
        },
        mounted(){
            this.$store.dispatch('getAllCate');
            if(this.level_one==10){
                var data ={
                    level_one:this.level_one,
                    level_two:this.level_two,
                    level_three:this.level_three,
                    order_status:this.sort,
                    city_code:this.citycode
                }
                this.$store.dispatch('getGoodsList',data)
            }else if(!this.level_one){
                
            }else{
                var data ={
                    level_one:this.level_one,
                    level_two:this.level_two,
                    level_three:this.level_three,
                    order_status:this.sort
                }
                this.$store.dispatch('getGoodsList',data)
            }
        }
    }
</script>
<style lang="less" scoped>
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
//
.isActive{
    color:#ea9314;
    border-bottom: 3px solid #ea9314;
}


/*分页*/
.pagerbox{
    overflow: hidden;
    margin:auto;
    width: 1200px;
    margin-bottom:12px;
    .pager{
        float: right;
    }
}
/*icon*/
.icon-you{
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
.icon-lock{
    width: 21px;
    height: 21px;
    vertical-align: middle;
}
.icon-type{
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-right:4px;
        margin-top: -3px;
}
.icon-date{
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-right:4px;
        margin-top: -4px;
}
/**/
.sort{
    border-top:20px solid #eff3f5;
    background-color: #fff;
    width: 1200px;
    margin:auto;
    display: flex;
    justify-content: flex-start;
    border-bottom:1px solid #eff3f5;
    li{
        width: 100px;
        height: 50px;
        line-height: 50px;
        margin:0 50px;
        text-align: center;
    }
    li:hover{
        cursor: pointer;
        color:#dd5519;
    }
}
.nogoods{
    position: relative;
    border-top:20px solid #eff3f5;
    width: 600px;
    margin:auto;
    background-color: #fff;
    padding:0  300px 100px;
    img{
        width:100%;
    }
    p{
        width: 600px;
        font-size:40px;
        top:40px;
        color:#999;
        position: absolute;
        text-align: center;
    }
}
.goodslist{
    margin:auto;
    width: 1200px;
    background-color: #eff3f5;
    .item-left{
        float: left;
        width: 730px;
    }
    .item-center{
        line-height: 32px;
        text-align: center;
        font-size:16px;
        color:#dd5519;
        border:1px dashed #dd5519;
        margin-top:24px;
        float: left;
        width: 140px;
        height: 65px;
        .times{
            background-color:rgba(234,147,20,0.2);
            height: 32px;
            border-bottom: 1px dashed #ea9314;
        }
    }
    .item-right{
        float: left;
        width: 170px;
        margin-left:100px;
        .username{
            line-height: 30px;
            img{
                vertical-align: middle;
                margin-right:4px;
                margin-left:4px;
            }
        }
        .username:hover{
            cursor: pointer;
        }
        .getdetail{
            margin-top:20px;
            width: 120px;
            height: 30px;
            border-radius:15px;
            border:1px solid #ea9314;
            background-color: #fff;
            color:#ea9314;
        }
        .getdetail:hover{
            background-color: #ea9314;
            color:#fff;
        }
    }
    li{
        padding:25px;
        margin-bottom:20px;
        width: 1150px;
        height: 110px;
        background-color: #fff;   
        .title{
            line-height: 32px;
            font-size:18px;
        }
        .title:hover{
            cursor: pointer;
            color:#999;
        }
        .static{
            font-size:14px;
            color:#8a8a8a;
        }
        .type-date{
            line-height: 30px;
            font-size:14px;
            .type{
                color:#ea9314;
                margin-right:25px;
            }
            .date{
                color:#8a8a8a;
            }
        }
        .points{
            color:#dd5519;
            font-size:18px;
            font-weight: 600;
            .jifen{
                font-size: 14px;
            }
        }
    }
}
</style>

