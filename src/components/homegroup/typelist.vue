<template>
    <ul class="typelist">
        <li>
            <div class="bgpic">
                <img src="../../assets/pic/type1.png" alt="">
                <div class="circle color-1">
                    {{hotCate[0].name}}
                </div>
            </div>
            <ul class="type-text font-color-1">
                <li v-for='(item,key) in hotCate[0].sons'>
                    <span @click="golist(hotCate[0].id,item.parent_id,item.id)">{{item.name}}　</span>
                </li>
            </ul>
        </li>
        <li>
             <div class="bgpic">
                  <img src="../../assets/pic/type2.png" alt="">
                  <div class="circle color-2">
                        {{hotCate[1].name}}
                    </div>
            </div>
            <ul class="type-text font-color-2">
                 <li v-for='(item,key) in hotCate[1].sons'>
                    <span @click="golist(hotCate[1].id,item.parent_id,item.id)">{{item.name}}　</span>
                </li>
            </ul>
        </li>
        <li>
             <div class="bgpic">
                  <img src="../../assets/pic/type3.png" alt="">
                  <div class="circle color-3">
                    {{hotCate[2].name}}
                </div>
            </div>
            <ul class="type-text font-color-3">
               <li v-for='(item,key) in hotCate[2].sons'>
                    <span @click="golist(hotCate[2].id,item.parent_id,item.id)">{{item.name}}　</span>
                </li>
            </ul>
        </li>
        <li>
             <div class="bgpic">
                  <img src="../../assets/pic/type4.png" alt="">
                  <div class="circle color-4">
                     {{hotCate[3].name}}
                </div>
            </div>
            <ul class="type-text font-color-4">
                <li v-for='(item,key) in hotCate[3].sons'>
                   <span @click="golist(hotCate[3].id,item.parent_id,item.id)">{{item.name}}　</span>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
    export default{
        computed:{
            hotCate:function(){
                return this.$store.state.hotCate;
            }
        },
        watch:{
            hotCate:function(){
                console.log(this.hotCate)
            }
        },
        methods:{
            golist(level_one,level_two,level_three){
                window.open('./#/tcb?level_one='+level_one+'&level_two='+level_two+'&level_three='+level_three)
            }
        }
    }
</script>
<style scoped lang='less'>
/*圆圈颜色*/
.color-1{
    background-color: #ea910f;;
}
.color-2{
    background-color: #3575b4;
}
.color-3{
    background-color: #d84b44;;
}
.color-4{
    background-color: #7a989f;;
}
/*字体颜色*/
.font-color-1{
    color: #ea910f;;
}
.font-color-2{
    color: #3575b4;
}
.font-color-3{
    color: #d84b44;;
}
.font-color-4{
    color: #7a989f;;
}
/**/
.typelist{
    padding:20px 0 40px 0;
    width: 1200px;
    height: 230px;
    margin:auto;
    display: flex;
    justify-content: space-between;
    li{
        width: 290px;
        background-color: #fff;
        list-style:none;
        .bgpic{
            position: relative;
            border-radius:4px;
            width: 100%;
            height: 155px;
            overflow: hidden;
            img{
                width: 100%;
                transition: all 0.3s;
            }
            img:hover{
                transform: scale(1.1);
                cursor: pointer;
            }
            .circle{
                color:#fff;
                font-size:26px;
                font-weight: 400;
                text-align: center;
                position:absolute;
                width: 130px;
                height: 55px;
                padding-top:75px;
                border-radius:50%;
                z-index: 999;
                top:-75px;
                left:73px;
            }
        }
        .type-text{
            padding-top:10px;
            font-size:16px;
            height: 85px;
            overflow: hidden;
            background-color: #fff;
            flex-wrap: wrap;
            padding:8px 0 10px 20px;
            li{
                float: left;
                width: auto;
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin-left:3px;
            }
            li:hover{
                cursor: pointer;
                color:#ccc;
            }
        }
    }
}
</style>

