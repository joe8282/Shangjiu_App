<template>
	<view class="jz_myPoint uni-flex uni-column jz_addressServer jz_cashout">
		<view class="myPint_header uni-flex uni-column">
			<view class="t">账户积分</view>
			<view class="p">{{integral}}</view>
		</view>

		<view class="uni-list uni-flex uni-column">
			<view class="uni-list-cell " hover-class="uni-list-cell-hover" v-if="!showBank" @click="goBankList">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class=" showBank">
						{{bank.realName}} {{bank.bankName}} {{bank.bankNo}}
					</view>
				</view>
			</view>
			<view class="uni-list-cell " hover-class="uni-list-cell-hover" v-if="showBank" @click="goBindBank">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class="uni-flex align-items">
						<text style="margin-left: -8upx;">绑定银行</text>
					</view>
				</view>
			</view>
		</view>
		<view class="myPint_pace"></view>
		<view class="uni-flex uni-flex-item  uni-common-mt uni-column">
			<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">到账方式</view>
					<view class="uni-flex uni-flex-item4 uni-form-item">
						<input :value="pickerText" class="uni-input" disabled name="time" placeholder="选择到账方式" @click="showSinglePicker" />
					</view>
				</view>
				<view class="uni-flex uni-row align-items">
					<view class="uni-flex uni-flex-item">提现金额</view>
					<view class="uni-flex uni-flex-item4 justify-align-center uni-form-item">
						<input class="uni-input uni-flex-item" v-model="amount" name="amount" placeholder="请输入提现金额" />
					</view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">支付密码</view>
					<view class="uni-flex uni-flex-item4 uni-form-item"><input class="uni-input" password v-model="password" name="password"
						 placeholder="请输入支付密码" /></view>
				</view>
				<view class="uni-flex justify-align-center add" style="background: #FFFFFF;"><button class="btn" formType="submit">确认提现</button></view>
			</form>

		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	var graceChecker = require('../../../common/graceChecker.js');
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				showBank: false,
				pickerValueArray: [],
				themeColor: '#007AFF',
				pickerSingleArray: [],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerText: '',
				backMoneys: [{
						title: "2小时以内到账（2元手续费）",
						id: 0
					},
					{
						title: "24小时以内到账（1元手续费）",
						id: 1
					}
				],
				integral: '',
				user: {},
				bank: {},
				withDraw: {
					amount: '',
					bank: ''
				},
				bankstr: '',
				id: 0
			}
		},
		components: {
			mpvuePicker
		},
		onLoad(e) {
			this.integral = e.integral;
			this.user = JSON.parse(this.jyyUser);
			if (e.addressId) {
				this.id = e.addressId;
			}
			this.getData();
		},
		methods: {
			formSubmit: function(e) {
				var rule = [{
						name: 'time',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请选择到账方式'
					},
					{
						name: 'amount',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请输入提现金额'
					},
					{
						name: 'password',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请输入支付密码'
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				this.bankstr = this.bank.realName + ',' + this.bank.bankName + ',' + this.bank.bankAddress + ',' + this.bank.bankNo
				this.withDraw.bank = this.bankstr;
				this.withDraw.amount = this.amount;
				this.amount = parseFloat(this.amount);
				this.integral = parseFloat(this.integral);
				if (checkRes) {
					if (this.amount > 0) {
						if (this.amount <= this.integral) {
							uni.request({
								url: this.webUrl + 'SaveWithDraw',
								method: 'POST',
								data: {
									withDraw: JSON.stringify(this.withDraw),
									userid: this.user.id
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: res => {
									uni.hideLoading();

									if (res.data.result.isSuccess) {
										uni.showToast({
											title: res.data.result.resultInfo,
											icon: 'none'
										});
										// uni.redirectTo({
										// 	url: 'bankList?url=' + this.url
										// });
									} else {
										uni.showToast({
											title: res.data.result.resultInfo,
											icon: 'none'
										});
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else {
							uni.showToast({
								icon: "none",
								title: "积分不足"
							})
						}

					} else {
						uni.showToast({
							icon: "none",
							title: "提现金额必须大于0"
						})
					}
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}



			},
			getData() {
				uni.request({
					url: this.webUrl + 'WithDraw',
					data: {
						userid: this.user.id,
						id: this.id
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.bank == null) {
							this.showBank = true;
						} else {
							this.bank = res.data.bank;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goBankList() {
				uni.redirectTo({
					url: "bankList?url=cashOut&integral=" + this.integral
				})
			},
			goBindBank() {
				uni.redirectTo({
					url: "bindBank?url=cashOut&integral=" + this.integral
				})
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.pickerText = e.label;
			},
			// 单列
			showSinglePicker() {
				let singleArray = []
				for (var i = 0; i < this.backMoneys.length; i++) {
					singleArray.push({
						label: this.backMoneys[i].title,
						value: this.backMoneys[i].id
					})
				}
				this.pickerValueArray = singleArray;
				this.mode = 'selector';
				this.deepLength = 1;
				this.$refs.mpvuePicker.show();
			},
		}
	}
</script>

<style>
</style>
