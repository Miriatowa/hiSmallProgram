<template>
	<view class="content">
		
		<div class="mian">
			<form @submit="formSubmit">
				<div class="question">
					<div class="questionItem">Q1、姓名:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span> <input @input="onPutName" /></div>
					<div class="questionSex">
						Q2、性别:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
						<div class="radio_0">
							<radio-group @change="radioChange_0"><radio style="transform:scale(0.8);color:"  color="#ff6633" value="男">男</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633" value="女">女</radio ></radio-group>  
						</div>
					</div>
					<!-- <div class="questionItem">Q2、性别:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span> 
					<picker @change="onSelSex" :value="index" :range="sexArray"  >
						{{sexArray[index]}}  <icon class="iconfont icon-xiala"></icon>
					</picker>
					</div> -->
					<div class="questionItem">Q3、学校:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span> <input @input="onPutSchool" /></div>
					<div class="questionItem">Q4、专业:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span> <input @input="onPutMajor" /></div>
					<div class="questionItem">Q5、入学时间:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
                    <picker mode="date" :value="beginDate"  @change="bindDateChange">
                        <view class="uni-input">{{beginDate}}<icon class="iconfont icon-xiala"></icon></view>
                    </picker>
				</div>
				<div class="questionItem">Q6、毕业时间:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
				    <picker mode="date" :value="endDate"  @change="bindEndDateChange">
				        <view class="uni-input">{{endDate}}<icon class="iconfont icon-xiala"></icon></view>
				    </picker>
				</div>
				<div class="questionItem">Q7、手机号:<span style="color: #ff6633;margin:0rpx 15rpx;">*</span> <input type="number" maxlength="11" @input="onPutNumber" /></div> 
				<div class="questionItem_other">
					Q8、毕业后的就业方向？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio">
						<radio-group  @change="radioChange_1"><radio style="transform:scale(0.8);color:"  color="#ff6633" value="本专业">本专业</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633" value="学校安排">学校安排</radio ><radio style="transform:scale(0.8);" color="#ff6633" value="其他">其他</radio></radio-group>  
					</div>
				</div>
				<div class="questionItem_other">
					Q9、毕业后的理想就业城市？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio">
						<radio-group @change="radioChange_2"><radio style="transform:scale(0.8);color:"  color="#ff6633" value="武汉">武汉</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633" value="北上广深">北上广深</radio ><radio style="transform:scale(0.8);" color="#ff6633" value="其他">其他</radio></radio-group>  
					</div>
				</div>
				<div class="questionItem_other">
					Q10、是否注册过招聘app？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio_1">
						<radio-group @change="radioChange_3"><radio style="transform:scale(0.8);color:"  color="#ff6633" value="是">是</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633" value="否">否</radio ></radio-group>  
					</div>
				</div>
				<div class="questionItem_other">
					Q11、是否需要就业指导？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio_1">
						<radio-group @change="radioChange_4"><radio style="transform:scale(0.8);"  color="#ff6633" value="是">是</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633" value="否">否</radio ></radio-group>  
					</div>
				</div>
				<div class="questionItem_other">
					Q12、需要就业指导的类型？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio">
						<checkbox-group @change="radioChange_5"><checkbox style="transform:scale(0.8);color:"  color="#ff6633" value="简历指导">简历指导</checkbox ><checkbox style="transform:scale(0.8);color:"  color="#ff6633" value="岗位分析">岗位分析</checkbox><checkbox style="transform:scale(0.8);" color="#ff6633" value="职业规划">职业规划</checkbox><checkbox style="transform:scale(0.8);" color="#ff6633" value="模拟面试">模拟面试</checkbox></checkbox><checkbox style="transform:scale(0.8);" color="#ff6633" value="其它">其他</checkbox></checkbox-group>  
					</div>
				</div>
				<!-- <div class="questionItem_other">
					Q11、可接受指导费用？<span style="color: #ff6633;margin:0rpx 15rpx;">*</span>
					<div class="radio">
						<radio-group><radio style="transform:scale(0.8);color:"  color="#ff6633">需要</radio ><radio style="transform:scale(0.8);color:"  color="#ff6633">不需要</radio ><radio style="transform:scale(0.8);" color="#ff6633">其他</radio></radio-group>  
					</div>
				</div> -->
				<div class="submitForm" @click="onSubmitData">提交</div>
				</div>
				
			</form>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			const beginDate = this.getDate("begin")
			const currentDate = this.getDate({
			            format: true,
			        })		
			return {
				name:"",// 姓名
				sex:"男", //性别
				school:"", //学校
				major:'', //专业
				phone:'', //手机号码
				beginDate: beginDate, //入学时间
				endDate:currentDate,  //毕业时间
				jobDirection:"", //就业方向
				jobCity:"",   //就业城市
				isRes:'',	//是否注册
				isGuide:""  ,//是否需要指导
				guideType:"" ,//指导类型
				index:0
			}
		},
		onLoad() {
			    
		},
		methods: {
			// 姓名
			onPutName(e){
				this.name=e.detail.value
			},
			// // 性别
			radioChange_0(e){
				this.sex=e.target.value
				console.log(e.target.value)
			},
			// 手机号码
			onPutNumber(e){
				this.phone=e.target.value
			},
			// 学校
			onPutSchool(e){
				this.school=e.detail.value
				console.log(this.school)
			},
			// 专业
			onPutMajor(e){
				this.major=e.detail.value
			},
			// 入学时间
			 bindDateChange(e) {
			            this.beginDate = e.target.value
			        },
			// 毕业时间
			bindEndDateChange(e){
				this.endDate=e.target.value
			},
			// 就业方向
			radioChange_1(e){
				this.jobDirection=e.target.value
				console.log(e.target.value)
			},
			// 就业城市
			radioChange_2(e){
				this.jobCity=e.target.value
			},
			// 是否注册过app
			radioChange_3(e){
				this.isRes=e.target.value
			},
			// 是否需要就业指导
			radioChange_4(e){
				this.isGuide=e.target.value
			},
			// 指导类型
			radioChange_5(e){
				this.guideType=e.target.value
			},
			// 提交数据
			onSubmitData(){
				if (this.name == ''||this.sex == ''|| this.school == ''|| this.major == ''|| this.beginDate == '' ||this.endDate == ''||this.jobDirection == ''||this.jobCity == ''||this.isRes == ''||this.isGuide == ''||this.guideType == ''|| this.phone == '' ? true : false){
				        uni.showToast({
				          title: '请把信息填完整',
				          icon: 'loading',
				          duration: 1500,
				          mask: true
				        });
				}else{
					let postData={
						name:this.name,// 姓名
						sex:this.sex, //性别
						school:this.school, //学校
						phone:this.phone, //手机号码
						major:this.major, //专业
						beginDate:this.beginDate, //入学时间
						endDate:this.endDate,  //毕业时间
						jobDirection:this.jobDirection, //就业方向
						jobCity:this.jobCity,   //就业城市
						isRes:this.isRes,	//是否注册
						isGuide:this.isGuide,//是否需要指导
						guideType:this.guideType,//指导类型
					}
					var res={result:postData}
					console.log(res)
					uni.request({
						url:'http://81.71.84.252:8093/question/save',
						data:res,
						method:"POST",
						success:(res)=>{
							console.log(res.data.status)
							if(res.data.status == 200){
								uni.showToast({
								  title: '提交成功',
								  icon: 'success',
								  duration: 1500,
								  mask: true,
								  success: () => {
									setInterval(()=>{
										uni.navigateTo({
											url:"../index/index"
										})
									},2500)
								  	
								  }
								});
							}else{
								uni.showToast({
								  title: '提交失败',
								  icon: "loading",
								  duration: 1500,
								  mask: true
								});
							}
						}
					})
				}
				
			},
			 getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'begin') {
			                year = year - 4;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
			    }
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.mian{
		width: 100%;
		height: 2700rpx;
		background-image: url("https://system.job2020.cn/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201202090917.jpg");
		background-repeat:no-repeat;
		background-attachment:scroll;
		background-position:left top;
		background-size: cover;
		position: relative;
	}
	.question{
		position: absolute;
		top: 950rpx;
		left: 80rpx;
	}
	.questionItem{
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}
	.questionSex {
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}
	.questionItem input{
		display: inline-block;
		border: 2rpx solid #ffcc33;
		width: 10rem;
		margin-top: 5rpx;
	}
	.questionItem picker{
		/* padding: 0rpx rem; */
		border: 2rpx solid #ffcc33;
		width: 10rem;
	},
	.questionItem_other{
		margin-top: 40rpx;
	}
	.radio,.radio_1{
		margin-top: 20rpx;
		
	}
	.radio radio-group,checkbox-group{
		display: flex;
		/* justify-content: space-around; */
		/* width: 600rpx; */
	}
	.radio radio-group radio{
		display: inline-block;
		width: 200rpx;
	}
	.radio checkbox-group{
		display: flex;
		flex-wrap: wrap;
	}
	.radio checkbox-group checkbox{
		display: inline-block;
		width: 200rpx;
	}
	.radio_1 radio-group{
		/* width: 300rpx; */
		display: flex;
		/* justify-content: space-around; */
	}
	.radio_1 radio-group radio{
		display: inline-block;
		width: 200rpx;
	} 
	.submitForm{
		width: 150rpx;
		height: 80rpx;
		text-align: center;
		background-color: #ffcc33;
		color: #ff9933;
		font-weight: 400;
		line-height: 80rpx;
		border-radius: 20rpx;
		box-shadow: 8rpx 8rpx 5rpx #ff9933;
		margin-left: 33%;
		margin-top: 70rpx;
	}
	.icon-xiala{
		margin-left: 18rpx;
		font-size: 22rpx;
		color: #ff9933;
	}
</style>
