<template>
	<view class="content">
		<!-- editor -->
		<view class="page-body" v-if="edittt">
			<view class='wrapper'>
				<input type="text" placeholder="可选填" class="editor-topinput" v-model="ShopContent"/>
		
				<editor id="editor" class="ql-container" placeholder="请输入详细介绍内容,可根据需要连续输入文字与连续插入图片(可选填)" showImgSize showImgToolbar showImgResize
				 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" v-model="ShopRemark">
				</editor>
			</view>
			<view class='toolbar insertimg' @tap="format">
				<view class="" @tap="insertImage">插入图片</view>
			</view>
			<view class="next-btn-editor" @click="getCreatShopAdd">
				<span>提交</span>
			</view>
		</view>
		
		<view class="shopAdd-commit-all-wrap" v-if="show">
			<view class="shopAdd-commit-img-wrap">
				<block v-if="imageSrc">
					<image :src="imageSrc" class="image" mode="widthFix"></image>
					<span @click="delimg" class="delimg-icon">X</span>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @click="chooseImage">+ 选择图片</view>
				</block>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号名称：</span>
						<!-- <textarea value="" placeholder="请填写商号名称" class="shopAdd-textarea" /> -->	
					</view>
					<textarea @blur="bindTextAreaBlur" v-model="notedata" auto-height placeholder="请填写商号名称" class="shopAdd-textarea" />
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号所有者身份：</span>
					</view>
					<view v-for="(item , index) in shenfen" @click="changShenfen(index)" :key="index"
						 :class="{active:a === index}" class="shopAdd-cont-list">
						<span>{{ item.Name }}</span>
						<i class="disnone">{{ item.ParentId }}</i>
								
					</view>
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号类型：</span>
					</view>
					<view v-for="(item , index1) in leixing" @click="changLeixing(index1)" :key="index1"
						 :class="{active:b === index1}" class="shopAdd-cont-list">
						<span>{{ item.Name }}</span>
					</view>
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号行业：</span>
					</view>
					<view v-for="(item , index2) in hangye" @click="changHangye(index2)" :key="index2"
						 :class="{active:c === index2}" class="shopAdd-cont-list">
						<span>{{ item.Name }}</span>
					</view>
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号区域：</span>
					</view>
					<pickerAddress @change="change" class="select-city">{{txt}}</pickerAddress>
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>收费设置：</span>
					</view>
					<!-- <view v-for="(item , index2) in chengyuan" @click="changChengyuan(index2)" :key="index2"
						 :class="{active:c === index2}" class="shopAdd-cont-list-three">
						<span>{{ item.name }}</span>
					</view> -->
					<view class="shopAdd-cont-list-three" @click="addbg(i,item)" v-for="(item,i) in text" :class="{active1:i!=nowIndex}">{{item}}</view>
			
					<view v-show="nowIndex === 0" class="content">
					</view>
			
					<view v-show="nowIndex === 1" class="content">
						<view class="nowindex-list">
							<span style="width: 22%;">填写价格</span>
							<input type="text" value="" v-model="PayFee"/>
						</view>
					</view>
			
					<view v-show="nowIndex === 2" class="content">
						<view class="nowindex-list">
							<span style="width: 22%;">填写价格</span>
							<input type="text" value="" v-model="PayFee"/>
						</view>
					</view>
			
			
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="productAdd-ff-list">
						<span>内容来源：</span>
						<view class="pdt-rr">
							<view v-for="(item , index4) in nrly" @click="changNrly(index4)" :key="index4"
								 :class="{active:d === index4}" class="shopAdd-cont-list">
								<span>{{ item.name }}</span>
							</view>
						</view>
						
					</view>
					<!-- <view class="productAdd-ff-list">
						<span>是否公开：</span>
						<view class="pdt-rr">
							<view v-for="(item , index5) in sfgk" @click="changSfgk(index5)" :key="index5"
								 :class="{active:e === index5}" class="shopAdd-cont-list">
								<span>{{ item.name }}</span>
							</view>
						</view>
						
					</view> -->
				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>内容作者：</span>
					</view>
					<input class="uni-input" placeholder="请填写内容作者(可选填)" v-model="proAuthor"/>
					<view class="shopAdd-cont-title">
						<span>内容出处：</span>
					</view>
					<input class="uni-input" placeholder="请填写内容出处(可选填)" v-model="proSource" />
				</view>
			</view>
			
			
			<view class="next-bottomfixed">
				<span @click="clickeditor">下一步</span>
				<!-- <span @click="getCreatShopAdd">下一步</span> -->
			</view>
		</view>	

		


		
	</view>
	
</template>

<script>
	import 'pages/productAdd/productAdd.css';
	// import 'pages/shopAdd/shopAdd.css';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		components:{
            pickerAddress
        },
		data() {
			return {
				readOnly: false,
				show: true,
				edittt: false,
				formats: {},
				title: 'uploadFile',
				imageSrc: '',
				nowIndex: 0,
				notedata:'',
				active_text:'菜单一',
				ShopRemark:'',
				ShopContent:'',
				text: ['开放加入', '审核加入', '付费加入'],
				txt: '选择地址',
				JoinDemand:'',
				JoinFeeOnce:'',
				JoinFeeMonth:'',
				JoinFeeYear:'',
				JoinFeeUnlimited:'',
				Provice:'',
				City:'',
				Area:'',
				Contact:'',
				ContactTel:'',
				ContactAddress:'',
				PayFee:'',
				shenfen: [],
				hangye: [],
				leixing: [],
				proAuthor: '',
				proSource: '',
				a: 0,
				b: 0,
				c: 0,
				e: 0,
				d: 0,
				nrly: [
					{name: '原创'},
					{name: '转载'}
				],
				sfgk: [
					{name: '公开'},
					{name: '私存'}
				],
		
			}
				
		},
		onLoad() {
			this.getShopAddData();
			// this.getCreatShopAdd();
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			});
			
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			delimg: function(){
				this.imageSrc = ''
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
				
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			},
			
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'http://47.97.188.85:1111/Base_SysManage/Common/UploadImage',
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			clickeditor: function(){
				this.show = false;
				this.edittt = true;
			},
			getCreatShopAdd: function(){
				this.editorCtx.getContents({success:(res)=>{
					this.ShopRemark = res.text
					
				},
				fail:(res)=>{
				}
				});
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				// console.log(newIds)
				// console.log(this.imageSrc)
				if( this.d == 0) {
					var FromWays = '原创'
				} else if ( this.d == 1 ) {
					var FromWays = '转载'
				}
				var productId = newIds,
					ProductTitle = this.notedata,
					ProductPic = this.imageSrc,
					ProductRemark = this.ShopRemark,
					ProductContent = this.ShopContent,
					Provice = this.Provice,
					City = this.City,
					Area = this.Area,
					FeeWay = this.nowIndex + 1,
					PayFee = this.PayFee,
					FromWay = FromWays,
					Author = this.proAuthor,
					Source = this.proSource;
					
					
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/SaveData',
					method:"POST",
					// header:{
					// 	'content-type': 'application/x-www-form-urlencoded'
					// },
					data:{
						id: '',
						ProductTitle: ProductTitle,
						ProductPic: ProductPic,
						ProductRemark: ProductRemark,
						ProductContent: ProductContent,
						// ProductContent: ProductContent,
						ShopId: productId,
						UserId: 1133345545746780160,
						TypeId: 1206263002597298176,
						ClassId: 1207231304286998528,
						ChannelId: 1209655228291485696,
						Provice: Provice,
						City: City,
						Area: Area,
						FeeWay: FeeWay,
						PayFee: PayFee,
						FromWay: FromWay,
						Author: Author,
						Source: Source
					},
					success: (res) =>{
						console.log(res)
						
					},
					
				});
			},
			
			getShopAddData(){
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1206262951519064064',
					success: (res) =>{
						for( var i = 0; i <res.data.length; i++ ){
							this.shenfen = res.data
							
						}
					}
				});
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236610573570048',
					success: (res) =>{
						for( var h = 0; h <res.data.length; h++ ){
							this.hangye = res.data
							
						}
					}
				});
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236075598483456',
					success: (res) =>{
						for( var l = 0; l <res.data.length; l++ ){
							this.leixing = res.data
							
						}
					}
				});
			},
			
			
			changShenfen(index) {
				this.a = index;
				
			},
			changLeixing(index1) {
				this.b = index1;
			},
			changHangye(index2) {
				this.c = index2;
			},
			changNrly(index4) {
				this.d = index4;
			},
			changSfgk(index5) {
				this.e = index5;
			},
			change(data) {
				var Provice = data.data[0],
				    City = data.data[1],
				    Area = data.data[2];
					this.Provice = data.data[0],
					this.City = data.data[1],
					this.Area = data.data[2];
				
                this.txt = Provice + '-' + City + '-' + Area
                
                // console.log(data.data)
            },
			addbg(index, active_text) {
				this.nowIndex = index;
				this.active_text= active_text;
			},
			bindTextAreaBlur: function (e) {
				// console.log(e.detail.value)
			},
			hreftwo(){
				this.$router.push({ path:'editor'  })
			}

		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		touch-action: pan-y;
	}
	/* body{
		background-color: #F6F6F6;
	} */
	ul,li{
		list-style: none;
	}
	ul{ 
		margin: 0;
		padding: 0;
	}
	a{
		text-decoration:none;
	}
	img{
		max-width:100%;
		vertical-align:middle;
	}
	em{
		font-style:normal;
	}
	i{
		font-style: normal;
	}
	.content{
		display: flex;
		flex-direction: column;
		background-color: #F6F6F6;
	}
	.shopAdd-commit-img-wrap{
		width: 100%;
		padding: 20px 0px;
		min-height: 100px;
		text-align: center;
	/* 	justify-content: center;
		vertical-align: middle; */
		font-size: 14px;
		/* line-height: 60px; */
		background: #FFFFFF;
		float: left;
	}
	.delimg-icon{
		position: absolute;
		height: 30px;
		width: 30px;
		display: inline-block;
		line-height: 30px;
		background: #cccccc;
		color: #999;
		border-radius: 4px;
		margin-left: 5px;
	}
	.shopAdd-cont-wrap{
		width: 100%;
		background: #FFFFFF;
		margin-top: 10px;
		float: left;
		padding-bottom: 10px;
	}
	.shopAdd-cont-cc{
		width: 92%;
		margin-left: 4%;
	}
	.shopAdd-cont-title{
		width: 100%;
		font-size: 14px;
		height: 34px;
		line-height: 34px;
	}
	.shopAdd-cont-title span{
		display: inline-block;
		width: 100%;
	}
	.shopAdd-textarea{
		width: 95%;
		font-size: 14px;
		min-height: 80px;
		float: left;
		background: #f6f6f6;
		/* text-indent: 10px; */
		padding: 10px;
		border-radius: 4px;
	}
	.shopAdd-cont-list{
		width: 14%;
		display: flex;
		flex-wrap: wrap; 
		float: left;
		margin: 4px 1%;
		align-content:center;
		border: 1px solid #999999;
		color: #999999;
		height: 22px;
		line-height: 22px;
		border-radius: 4px;
	}
	.shopAdd-cont-list span{
		width: 100%;
		display: inline-flex;
		justify-content: center;
		text-align: center;
		font-size: 14px;
		align-content:center;
		
	}
	.shopAdd-cont-list-three{
		width: 30%;
		display: flex;
		flex-wrap: wrap; 
		float: left;
		margin: 4px 1%;
		align-content:center;
		background: #ffffff;
		border: 1px solid #000000;
		color: #000000;
		border-radius: 5px;
		background: url(../../static/images/ygou.png) no-repeat right top;
		height: 22px;
		line-height: 22px;
		border-radius: 5px;
		display: inline-flex;
		justify-content: center;
		text-align: center;
		font-size: 14px;
		align-content:center;
	}
	.active1{
		border: 1px solid #999999 !important;
		color: #999999 !important;
		background: none !important;
	}
	.active{
		background: #ffffff;
		border: 1px solid #000000 !important;
		color: #000000 !important;
		border-radius: 5px;
		background: url(../../static/images/ygou.png) no-repeat right top;
		/* background-size: 50%; */
	}
	.Classification {
		background: #ffffff;
	}
	.blue {
		color: blue;
	}
	.shopAdd-cont-cc .uni-input{
		font-size: 14px;
		background: #f6f6f6;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		border-radius: 4px;
	}
	.pickers-select{
		font-size: 12px;
	}
	.pickers-select-span{
		border: 1px solid #000000;
		font-size: 14px;
		height: 22px;
		line-height: 22px;
		display: inline-flex;
		padding: 0 30px;
	}
	.select-city{
		font-size: 14px;
	}
	
	.next-bottomfixed{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FFFFFF;
		justify-content: center;
		text-align: center;
		float: left;
		margin-top: 10px;
		font-size: 14px;
		color: #b22420;
	}
	.nowindex-list{
		width: 92%;
		float: left;
		margin-left: 4%;
		height: 30px;
		line-height: 30px;
		margin-top: 10px;
	}
	.nowindex-list span{
		display: inline-flex;
		float: left;
		font-size: 14px;
		width: 14%;
		font-weight: bold;
	}
	.nowindex-list input{
		border: 1px solid #c1c1c1;
		float: left;
		height: 22px;
		width: 60%;
		margin-top: 2px;
		border-radius: 3px;
	}
	.nowindex-list label{
		float: right;
		color: #c1c1c1;
		font-size: 14px;
		width: 20%;
	}
	.disnone{
		display: none;
	}
	
	
	/* #editor{
		font-size: 14px;
	} */
	
	.next-btn-editor{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FFFFFF;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
		float: left;
		margin-top: 10px;
		font-size: 14px;
		color: #b22420;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #F1F1F1;
	}
	.insertimg{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FFFFFF;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
		color: #b22420;
		font-size: 14px;
		position: fixed;
		bottom: 50px;
		left: 0;
		border-top: 1px solid #F1F1F1;
	}
	
	/* .editor-topinput{
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: #FFFFFF;
		text-indent: 12px;
	} */
	
	
/* 	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	} */
</style>
