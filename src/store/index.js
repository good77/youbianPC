import vue from 'vue'
import vuex from 'vuex'
import router from 'vue-router'
vue.use(vuex);


//注册state项目
const state={
	//主页banner
	bannerList:[],
	//主页三级分类
	cate:[],
	hotCate:[],
	tcbCate:[],
	allCate:[],
	//三级分类option
	option:[],

	//底部栏
	//新闻详情
	footer1:'',
	//新闻列表
	footer2:'',

	//活动列表
	actList:[],
	//活动页大图
	actBanner:'',
	//活动详情
	actMain:'',
	//接发榜单
	rank:'',
	//同城便商品列表
	goodsList:[],
	goodsDetail:'',
	//
	username:'',
	userInfo:'',
	userCenter:'',
	//VIP升级
	vip:[],
	//
	bjsd:[],
	yjsd:[],
	yfbd:[],
	//
	order_detail:'',
	user_detail:'',
};
import Token from "./token";
import $http from 'axios';
import qs from 'qs'
export default new vuex.Store({
	state,
	//状态方法管理
	mutations:{
		//修改数据的方法
		//首页banner图
		setBanner(context,data){
			state.bannerList=data.banner;
		},
		//首页三级分类
		setCate(context,data){
			state.cate=data.cate
			var flag=state.cate;
			var reflag = []
			for(var i=0;i<flag.length;i++){
				var json ={
					value:flag[i].id,
					label:flag[i].name,
					children:[]
				};
				reflag.push(json);
				for(var j=0;j<flag[i].son.length;j++){
					var json ={
						value:flag[i].son[j].id,
						label:flag[i].son[j].name,
						children:[]
					};
					reflag[i].children.push(json);
					for(var l=0;l<flag[i].son[j].sons.length;l++){
						var json ={
							value:flag[i].son[j].sons[l].id,
							label:flag[i].son[j].sons[l].name,
						};
						reflag[i].children[j].children.push(json);
					}
				}
				state.option=reflag;
			}
		},
		setHotcate(context,data){
			state.hotCate = data.popular
		},
		//底部导航
		setFooter1(context,data){
			state.footer1=data
		},
		setFooter2(context,data){
			state.footer2=data
		},
		//活动列表
		setActList(context,data){
			console.log(data.activity_list)
			state.actList=data.activity_list
		},
		//活动页大图
		setActBanner(context,data){
			state.actBanner=data.banner
		},
		//活动详情
		setActMain(context,data){
			state.actMain=data
		},
		//榜单
		setRank(context,data){
			state.rank=data
		},
		//tcb商品列表
		setGoodsList(context,data){
			state.goodsList=data
		},
		//tcb商品详情
		setGoodsDetail(context,data){
			state.goodsDetail=data
		},
		setUserInfo(context,data){
			state.userInfo = data
		},
		setUserCenter(context,data){
			state.userCenter = data
		},
		setAllCate(context,data){
			var flag=data.cate;
			var reflag = []
			for(var i=0;i<flag.length;i++){
				var json ={
					value:flag[i].id,
					label:flag[i].name,
					children:[]
				};
				reflag.push(json);
				for(var j=0;j<flag[i].son.length;j++){
					var json ={
						value:flag[i].son[j].id,
						label:flag[i].son[j].name,
						children:[]
					};
					reflag[i].children.push(json);
					for(var l=0;l<flag[i].son[j].sons.length;l++){
						var json ={
							value:flag[i].son[j].sons[l].id,
							label:flag[i].son[j].sons[l].name,
						};
						reflag[i].children[j].children.push(json);
					}
				}
				console.log(reflag)
				state.allCate=reflag;
			}
		},
		setTcbCate(context,data){
			state.tcbCate=data
		},
		setVip(context,data){
			state.vip= data;
		},
		setBjsd(context,data){
			state.bjsd = data
		},
		setYjsd(context,data){
			console.log(data);
			state.yjsd = data
		},
		setYfbd(context,data){
			state.yfbd = data
		},
		setOrderDetail(context,data){

			state.order_detail = data
		},
		setUserDetail(context,data){
			console.log(data)
			state.user_detail = data
		},
	},
	actions:{
		setToken(context,token){
			Token.save(token)
		},
		getIndex(context) {
            $http({
            methods: "get",
            url:'http://www.youbian.link/api/v1/index/index',
            headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
            }).then(response=>{
                var result = response.data;
                if(result.code==400){

                }else{
					var data = result.data;
					context.commit('setHotcate',data)
					context.commit("setBanner",data);
					context.commit("setCate",data);
                }
            });
		},
		getAllCate(context){
			$http.get(
				'http://www.youbian.link/api/v1/index/all_cate',
			).then(res=>{
				if(res.data.code==200){
					context.commit('setAllCate',res.data.data)
				}
			})
		},
		getFooter1(context,id,) {
			var data = {
				title_id :id
			}
            $http({
            methods: "get",
			url:'http://www.youbian.link/api/v1/footer/title_content',
			params:data,
            }).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(1)
                }else{
					console.log(result)
					var data = result.data;
					context.commit("setFooter1",data);
                }
            });
		},
		getFooter3(context,id,) {
			var data = {
				id :id
			}
            $http({
            methods: "get",
			url:'http://www.youbian.link/api/v1/footer/title_content',
			params:data,
            }).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(1)
                }else{
					console.log(result)
					var data = result.data;
					context.commit("setFooter1",data);
                }
            });
		},
		getFooter2(context,id) {
			var data = {
				id
			}
            $http({
            methods: "get",
			url:'http://www.youbian.link/api/v1/footer/share_list',
			params:data
            }).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(1)
                }else{
					console.log(result)
					var data = result.data;
					context.commit("setFooter2",data);
                }
            });
		},
		getAct(context,type) {
            var data={
                type
			}
			$http.post(
				'http://www.youbian.link/api/v1/activity/index', 
				qs.stringify(data), 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(result)
                }else{
					var data = result.data;
					context.commit("setActList",data);
					context.commit("setActBanner",data);
                }
            });
		},	
		getActMain(context,id) {
            var data={
                id
			}
			$http.get(
				'http://www.youbian.link/api/v1/activity/activity_details', 
				{params:data}, 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(result)
                }else{
					var data = result.data;

					context.commit("setActMain",data);
                }
            });
		},	
		getRankSend(context,type){
			var data={
                type
			}
			$http.get(
				'http://www.youbian.link/api/v1/index/release_list', 
				{params:data}, 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(result)
                }else{
					var data = result.data;
					context.commit("setRank",data);
                }
            });
		},
		getRankRec(context,type){
			var data={
                type
			}
			$http.get(
				'http://www.youbian.link/api/v1/index/list_orders', 
				{params:data}, 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(result)
                }else{
					var data = result.data;
					context.commit("setRank",data);
                }
            });
		},
		getGoodsList(context,obj){
			$http.post(
				'http://www.youbian.link/api/v1/index/same_city',
				obj
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					console.log(result)
                }else{
					console.log(result)
					var data = result.data;
					context.commit("setGoodsList",data.order_list.data);
                }
            });
		},
		srhGoods(context,data){
			context.commit("setGoodsList",data);
		},
		getGoodsDetail(context,order_id){
			$http.get(
				'http://www.youbian.link/api/v1/index/order_details',
				{params:{order_id}}
			).then(res=>{
				if(res.data.code=='200'){
					var data = res.data.data;
					context.commit('setGoodsDetail',data)
				}
			})
		},
		getUserCenter(context,obj){
			$http.get(
				'http://www.youbian.link/api/v1/user/info', 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded',
				token:Token.fetch()}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					obj.$message({
						message: '您还没有登录',
						type: 'warning'
					});
					setTimeout(()=>{
						obj.$router.push('/user/login')
					},1000)
                }else{
					var data = result.data;
					context.commit("setUserCenter",data);
                }
            });
		},
		getUserInfo(context,obj){
			$http.get(
				'http://www.youbian.link/api/v1/user/index', 
				{headers: {'Content-Type': 'application/x-www-form-urlencoded',
				token:Token.fetch()}}
			).then(response=>{
                var result = response.data;
                if(result.code==400){
					obj.$message({
						message: '您还没有登录',
						type: 'warning'
					});
					setTimeout(()=>{
						obj.$router.push('/user/login')
					},1000)
                }else{
					var data = result.data;
					context.commit("setUserInfo",data);
                }
			})

		},
		getVip(context,data){
			context.commit('setVip',data);
		},
		getBjsd(context,data){
			context.commit('setBjsd',data);
		},
		getYjsd(context,data){
			context.commit('setYjsd',data);
		},
		getYfbd(context,data){
			context.commit('setYfbd',data);
		},
		getOrderDetail(context,data){
			context.commit('setOrderDetail',data)
		},
		getUserDetail(context,data){
			context.commit('setUserDetail',data);
		}
	}
})