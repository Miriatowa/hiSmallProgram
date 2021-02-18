<script>
export default {
	globalData: {
	            session: '' ,
				uid:'',
				isLogin:false,
	        },
	onLaunch: function() {
		let p = new Promise((resolve, reject) => {
			uni.login({
			    provider: 'weixin',
			    success: function(res) {
			        var code = res.code;
			        //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
			        resolve(code)
			    },
			})
		})
		.then((code)=>{
			return new Promise((resolve, reject)=>{
				uni.request({
				    url: "https://user.job2020.cn/details/do",
				    method: 'POST',
					data:{
						 code
					},
				    success: (res) => {
						resolve(res) 				
				    }
				});
			})
		})
		.then((res)=>{
			console.log(res)
			if(res.data == 0){
				uni.showModal({
				    title: '温馨提示',
				    content: '亲，本产品需登录方可使用...',
					showCancel: false,
					confirmText: '前往登录',
					confirmColor:'#44a1ff',
				    success: (res) => {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:'/pages/home/registered/identityChoice/identityChoice'
				           })
				        } 
				    }
				})
			}else{
				getApp().globalData.session = res.data[1]
				getApp().globalData.uid = res.data[0]
				getApp().globalData.isLogin = true
			}
		})
		console.log('App Launch');
	},
	onShow: function() {
		
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
/* @font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
} */
/* #endif */
/*每个页面公共css */
@import url("./static/fonts/fonts.css")
</style>
