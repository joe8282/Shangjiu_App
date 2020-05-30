<template>
	<view class="content">
		<view class="shopAdd-commit-all-wrap" v-if="show">
			<view class="shopAdd-commit-img-wrap">
				<block v-if="imageSrc">
					<image :src="imageSrc" style="width: 200px; height: 200px;" mode="aspectFit"></image>
					<span @click="delimg" class="delimg-icon">X</span>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @click="chooseImage"><br /><br />+ 选择图片</view>
				</block>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号名称：</span>
						<!-- <textarea value="" placeholder="请填写商号名称" class="shopAdd-textarea" /> -->
					</view>
					<textarea @blur="bindTextAreaBlur" v-model="ShopTitle" auto-height placeholder="请填写商号名称" class="shopAdd-textarea" />
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
						<!-- <i class="disnone">{{ item.ParentId }}</i> -->	
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
						<span>成员加入：</span>
					</view>
					<!-- <view v-for="(item , index2) in chengyuan" @click="changChengyuan(index2)" :key="index2"
						 :class="{active:c === index2}" class="shopAdd-cont-list-three">
						<span>{{ item.name }}</span>
					</view> -->
					<view class="shopAdd-cont-list-three" @click="addbg(i,item)" v-for="(item,i) in text" :class="{active1:i!=nowIndex}">{{item}}</view>

					<view v-show="nowIndex === 0" class="content">
					</view>

					<view v-show="nowIndex === 1" class="content">
						<textarea @blur="bindTextAreaBlur" style="margin-top: 10px;" auto-height placeholder="请输入加入条件" class="shopAdd-textarea" v-model="JoinDemand" />
					</view>

					<view v-show="nowIndex === 2" class="content">
						<view class="nowindex-list">
							<span>次费</span>
							<input type="text" value="" v-model="JoinFeeOnce"/>
							<label>可选填</label>
						</view>
						<view class="nowindex-list">
							<span>月费</span>
							<input type="text" value="" v-model="JoinFeeMonth" />
							<label>可选填</label>
						</view>
						<view class="nowindex-list">
							<span>年费</span>
							<input type="text" value="" v-model="JoinFeeYear" />
							<label>可选填</label>
						</view>
						<view class="nowindex-list">
							<span>不限</span>
							<input type="text" value="" v-model="JoinFeeUnlimited" />
							<label>可选填</label>
						</view>
					</view>


				</view>
			</view>
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>联系人：</span>
					</view>
					<input class="uni-input" placeholder="请填写联系人名称" v-model="Contact" />
					<view class="shopAdd-cont-title">
						<span>联系电话：</span>
					</view>
					<input class="uni-input" placeholder="请填写联系电话" v-model="ContactTel"/>
					<view class="shopAdd-cont-title">
						<span>经营地址：</span>
					</view>
					<textarea @blur="bindTextAreaBlur" auto-height placeholder="请填写经营地址" class="shopAdd-textarea" v-model="ContactAddress"/>
				</view>
			</view>
<!-- 			<view class="next-bottomfixed">
				<a @click="clickeditor">下一步</a>
			</view> -->
		</view>	
		<!-- editor -->
		<view class="page-body" v-if="edittt">
			<view class="shopAdd-cont-wrap">
				<view class="shopAdd-cont-cc">
					<view class="shopAdd-cont-title">
						<span>商号简介：</span>
					</view>
					<!-- <input type="text" placeholder="商号摘要,可选填" class="editor-topinput" v-model="ShopRemark"/> -->
					<textarea @blur="bindTextAreaBlur" v-model="ShopRemark" auto-height placeholder="商号简介,可选填" class="shopAdd-textarea" />
				</view>
			</view>
			<view class='wrapper'>
				<view class='toolbar' @tap="format">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<!-- <view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view> -->
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
					 data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
					 data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
					 data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
					 data-value="justify"></view>
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
					 data-value="2"></view>
<!-- 					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
					 data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
					 data-value="20px"></view>
					<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
					 data-name="marginBottom" data-value="20px"></view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
					 data-value="24px"></view> -->
				
					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
					 data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
					 data-name="backgroundColor" data-value="#00ff00"></view>
				
					<!-- <view class="iconfont icon-date" @tap="insertDate"></view> -->
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
					 data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
					 data-value="bullet"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
				
					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
					 :data-value="1"></view>
<!-- 					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
					 data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
					 data-value="super"></view> -->
					<view class="iconfont icon-shanchu" @tap="clear"></view>
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
					 data-value="rtl"></view>
				
				</view>
				
				<editor id="editor" class="ql-container"  v-model="ShopContent" placeholder="请输入详细介绍内容,可根据需要连续输入文字与连续插入图片(可选填).." showImgSize showImgToolbar showImgResize
				 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
				<view class="bottom"></view>
			</view>
<!-- 			<view class='toolbar insertimg' @tap="format">
				<view class="" @tap="insertImage">插入图片</view>
			</view> -->
			<view class="next-btn-editor" @click="getCreatShopAdd">
				<span>提交</span>
			</view>
		</view>

	</view>
	
</template>

<script>
	import 'common/editor-icon.css';
	// import 'pages/shopAdd/shopAdd.css';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		components:{
            pickerAddress
        },
		data() {
			return {
				//
                readOnly: false,
				formats: {},
				//
				show: true,
				edittt: true,
				title: 'uploadFile',
				nowIndex: 0,
				active_text:'开放加入',
				text: ['开放加入', '审核加入', '付费加入'],
				txt: '请选择区域',
				ShopTitle:'',
				ShopRemark:'',
				ShopContent:'',
				imageSrc: '',
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
				shenfen: [],
				hangye: [],
				leixing: [],
				a: 0,
				b: 0,
				c: 0
		
			}
				
		},
		onLoad() {
			this.getShopTypeData();
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
			//
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
			// removeFormat() {
			// 	this.editorCtx.removeFormat()
			// },
			// insertDate() {
			// 	const date = new Date()
			// 	const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			// 	this.editorCtx.insertText({
			// 		text: formatDate
			// 	})
			// },
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.uploadFile({
							url: this.$serverUrl + '/Base_SysManage/Common/UploadImage',
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								this.editorCtx.insertImage({
									src: res.data,
									alt: '图像',
									success: function() {
										console.log('insert image success')
									}
								})
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
							}
						});
					}
				})
			},
			//
			delimg: function(){
				this.imageSrc = ''
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
							url: this.$serverUrl + '/Base_SysManage/Common/UploadImage',
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
								this.imageSrc = res.data
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
			// clickeditor: function(){
			// 	this.show = false;
			// 	this.edittt = true;
			// },
			getCreatShopAdd: function(){
				this.editorCtx.getContents({success:(res)=>{
					this.ShopContent = res.html
				},
				fail:(res)=>{
				}
				});
				// console.log(this.imageSrc)
				var ShopTitle = this.ShopTitle,
					shenfen = this.shenfen[this.a].Id,
					leixing = this.leixing[this.b].Id,
					hangye = this.hangye[this.c].Id,
					Provice = this.Provice,
					City = this.City,
					Area = this.Area,
					JoinWay = this.nowIndex,
					JoinDemand = this.JoinDemand,
					JoinFeeOnce = this.JoinFeeOnce,
					JoinFeeMonth = this.JoinFeeMonth,
					JoinFeeYear = this.JoinFeeYear,
					JoinFeeUnlimited = this.JoinFeeUnlimited,
					Contact = this.Contact,
					ContactTel = this.ContactTel,
					ContactAddress = this.ContactAddress,
					ShopContent = this.ShopContent,
					ShopRemark = this.ShopRemark;
					console.log(ShopRemark)
				if(ShopTitle==''){
					uni.showToast({
						title: '商号标题不能为空！',
						icon: 'none',
						duration: 2000
					})
				}else if(this.imageSrc==''){
					uni.showToast({
						title: '请上传商号主图！',
						icon: 'none',
						duration: 2000
					})
				}else if(Provice==''){
					uni.showToast({
						title: '请选择商号所在区域！',
						icon: 'none',
						duration: 2000
					})
				}else{
					uni.request({
						url:this.$serverUrl + '/Shop/Dev_Shop/SaveData',
						method:"POST",
						data:{
							ShopTitle: ShopTitle,
							ShopPic: this.imageSrc,
							UserId: uni.getStorageSync('userid'),
							TypeId: leixing,
							ClassId: hangye,
							ChannelId: shenfen,
							Provice: Provice,
							City: City,
							Area: Area,
							Contact: Contact,
							ContactTel: ContactTel,
							ContactAddress: ContactAddress,
							JoinWay: JoinWay,
							JoinDemand: JoinDemand,
							JoinFeeOnce: JoinFeeOnce,
							JoinFeeMonth: JoinFeeMonth,
							JoinFeeYear: JoinFeeYear,
							JoinFeeUnlimited: JoinFeeUnlimited,
							ShopContent: ShopContent,
							ShopRemark: ShopRemark
							
							
						},
						success: (res) =>{
							uni.showToast({
								title: '商号创建成功！',
								icon: 'success',
								duration: 2000
							})
							this.Timer = setInterval(() => {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 2000)

						}
					});
				}

			},
			
			getShopTypeData(){
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

	/* 编辑器 */
	.wrapper {
		padding: 10px 20px;
		margin-top: 10px;
		float: left;
		background-color: #fff;
	}
	
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	
	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	
	
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #f6f6f6;
		margin-top: 0px;
		font-size: 16px;
		line-height: 1.5;
	}
	
	.ql-active {
		color: #06c;
	}
	
	/* 编辑器 */
	
/* 	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	} */

</style>
