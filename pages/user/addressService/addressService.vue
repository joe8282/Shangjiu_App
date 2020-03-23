<template>
	<view class="uni-flex jz_addressServer">
		<view class="uni-flex uni-flex-item  uni-common-mt uni-column">
			<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
				<view class="uni-flex uni-row align-items">
					<view class="uni-flex uni-flex-item">收货人</view>
					<view class="uni-flex uni-flex-item4 justify-align-center uni-form-item">
						<input class="uni-input uni-flex-item" v-model="address.nickName" name="nickName" placeholder="请填写收货人姓名" />
						<view class="uni-flex justify-align-center"><image src="../../../static/address/05.png" class="addPeopleImg"></image></view>
					</view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">手机号码</view>
					<view class="uni-flex uni-flex-item4 uni-form-item"><input class="uni-input" v-model="address.mobile" name="mobile" placeholder="请填写收货人手机号"/></view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">地区</view>
					<view class="uni-flex uni-flex-item4 uni-form-item">
						<input :value="pickerText" class="uni-input" disabled name="area" placeholder="选择地区" @click="showMulLinkageThreePicker"  />
					</view>
				</view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item">详细地址</view>
					<view class="uni-flex uni-flex-item4 uni-form-item"><input class="uni-input" v-model="address.addStr" name="addStr" placeholder="如街道、楼牌号等" /></view>
				</view>
				<view class="spaceone"></view>
				<view class="space"></view>
				<view class="uni-flex  uni-row align-items">
					<view class="uni-flex uni-flex-item4">设为默认</view>
					<view class="uni-flex uni-flex-item"><switch :checked="checked" @change="switch1Change" color="#e40001" /></view>
				</view>
				<view class="uni-flex justify-align-center add"><button class="btn" formType="submit">⊕ 保存地址</button></view>
			</form>
			
		</view>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
		></mpvue-city-picker>
	</view>
</template>

<script>
var graceChecker = require('../../../common/graceChecker.js');

import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue';

import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			address: {},
			user: {},
			checked: false,
			url: ''
		};
	},
	components: {
		mpvueCityPicker
	},
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	methods: {
		switch1Change: function(e) {
			this.address.defaultVal = e.target.value;
		},
		onCancel(e) {
			//console.log(e)
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			this.pickerText = e.label;
			this.address.province = e.value[0];
			this.address.city = e.value[1];
			this.address.district = e.value[2];
			this.address.siteStr = e.label;
		},
		formSubmit: function(e) {
			var rule = [
				{
					name: 'nickName',
					checkType: 'notnull',
					checkRule: '1,4',
					errorMsg: '请填写收货人'
				},
				{
					name: 'mobile',
					checkType: 'string',
					checkRule: '11',
					errorMsg: '手机号码11个字符'
				},
				{
					name: 'area',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请选择地区'
				},
				{
					name: 'addStr',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请填写详细地址'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				uni.request({
					url: this.webUrl + 'SaveAddress',
					method: 'POST',
					data: {
						address: JSON.stringify(this.address),
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
							uni.redirectTo({								
								url: '../address/address?url=' + this.url
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
		getData() {
			uni.request({
				url: this.webUrl + 'Address',
				method: 'POST',
				data: {
					id: this.address.id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.result.isSuccess) {
						this.showAddress = true;
						this.address = res.data.address;
						this.cityPickerValueDefault = [res.data.address.province, res.data.address.city, res.data.address.district];
						this.pickerText = res.data.address.siteStr;
						this.checked = res.data.address.defaultVal;
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
			this.url = e.url;
			this.user = JSON.parse(this.jyyUser);
			if (e.id == undefined) {
				this.address.id = 0;
				uni.setNavigationBarTitle({
					title: '添加收货地址'
				});
			} else {
				this.address.id = e.id;
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				});
				this.getData();
			}
		}
	},
	onBackPress() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
		}
	}
};
</script>

<style>



</style>
