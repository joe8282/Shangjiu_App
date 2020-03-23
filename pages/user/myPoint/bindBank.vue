<template>
	<view class="uni-flex jz_addressServer jz_bindBank">
		<view class="uni-flex uni-flex-item  uni-common-mt uni-column">
			<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">银行名称</view>
					<view class="uni-flex uni-flex-item4 uni-form-item">
						<input v-model="bankObj.bankName" class="uni-input" disabled name="bankName" placeholder="请选择银行" @click="showSinglePicker" />
					</view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">开户地址</view>
					<view class="uni-flex uni-flex-item4 uni-form-item">
						<input v-model="bankObj.bankAddress" class="uni-input" name="bankAddress" placeholder="请输入地址" />
					</view>
				</view>
				<view class="uni-flex uni-row align-items">
					<view class="uni-flex uni-flex-item">开户姓名</view>
					<view class="uni-flex uni-flex-item4 justify-align-center uni-form-item">
						<input class="uni-input uni-flex-item" v-model="bankObj.realName" name="realName" placeholder="请输入收款人姓名" />
						<view class="uni-flex justify-align-center">
							<image src="../../../static/address/05.png" class="addPeopleImg"></image>
						</view>
					</view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">银行卡号</view>
					<view class="uni-flex uni-flex-item4 uni-form-item"><input class="uni-input" v-model="bankObj.bankNo" name="bankNo"
						 placeholder="请输入银行卡号" /></view>
				</view>
				<view class="spaceone"></view>
				<view class="space"></view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item4">设为默认</view>
					<view class="uni-flex uni-flex-item">
						<switch :checked="bankObj.defaultVal" @change="switch1Change" color="#e40001" />
					</view>
				</view>
				<view class="uni-flex justify-align-center add"><button class="btn" formType="submit">⊕ 保存银行信息</button></view>
			</form>

		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	var graceChecker = require('../../../common/graceChecker.js');

	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				themeColor: '#007AFF',
				integral: '',
				pickerText: '',
				mode: '',
				address: {},
				user: {},
				url: '',
				id: '',
				pickerValueArray: [],
				pickerSingleArray: [],
				deepLength: 1,
				pickerValueDefault: [0],
				bankPickerText: '',
				banks: [],
				bankObj: {
					bankName: '',
					bankAddress: '',
					realName: '',
					bankNo: '',
					defaultVal: false
				}
			};
		},
		components: {
			mpvuePicker
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		methods: {
			// 单列
			showSinglePicker() {
				let singleArray = []
				for (var i = 0; i < this.banks.length; i++) {
					singleArray.push({
						label: this.banks[i].remark,
						value: this.banks[i].value
					})
				}
				this.pickerValueArray = singleArray;
				this.mode = 'selector';
				this.deepLength = 1;
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				this.bankObj.bankName = e.label;
			},
			switch1Change: function(e) {
				this.bankObj.defaultVal = e.target.value;
			},
			onCancel(e) {
				//console.log(e)
			},
			formSubmit: function(e) {
				var rule = [{
						name: 'bankName',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请选择银行'
					},
					{
						name: 'bankAddress',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请选择地区'
					},
					{
						name: 'realName',
						checkType: 'string',
						checkRule: '2,15',
						errorMsg: '请输入开户姓名'
					},
					{
						name: 'bankNo',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请输入银行卡号'
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url: this.webUrl + 'SaveBank',
						method: 'POST',
						data: {
							bank: JSON.stringify(this.bankObj),
							id: this.address.id,
							userid: this.user.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: 'none'
							});
							if (res.data.result.isSuccess) {
								if (this.url == undefined) {
									this.url = 'bindBank'
								}
								uni.redirectTo({
									url: 'bankList?url=' + this.url + '&integral=' + this.integral
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
			getBanks() {
				uni.request({
					url: this.webUrl + 'Banks',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.banks = res.data.banks;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getData() {
				uni.request({
					url: this.webUrl + 'GetBank',
					method: 'POST',
					data: {
						userid: this.user.id,
						id: this.address.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.bank != null) {
							this.bankObj = res.data.bank;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			formReset: function(e) {
				console.log('清空数据');
				this.chosen = '';
			}
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				this.getBanks();
				this.url = e.url;
				this.user = JSON.parse(this.jyyUser);
				this.integral = e.integral;
				if (e.id == undefined) {
					this.address.id = 0;
					uni.setNavigationBarTitle({
						title: '添加银行信息'
					});
				} else {
					this.address.id = e.id;
					uni.setNavigationBarTitle({
						title: '修改银行信息'
					});
					this.getData();
				}
			}
		},
		onBackPress() {},
		onUnload() {}
	};
</script>

<style>
</style>
