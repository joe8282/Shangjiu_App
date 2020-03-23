<template>
	<view class="jz_agentProduct">
		<view class="agentProduct-bg"><image src="../../../static/product10.png"></image></view>
		<view class="productcontent uni-flex uni-column ">
			<view class="uni-flex content-top align-items">
				<view class="img uni-flex justify-align-center" @click="goMerchProduct"><image :src="product.pic"></image></view>
				<view class="messages uni-flex uni-column">
					<view class="product-title">{{ product.title }}</view>
					<view class="uni-flex">
						<view class="salePrice">￥{{ product.salePrice }}</view>
						<view class="marketPrice">￥{{ product.marketPrice }}</view>
					</view>
				</view>
			</view>
			<view class="uni-flex-item content-bottom align-items uni-flex">
				<view class="area">地区</view>
				<input :value="pickerText" class="uni-flex-item" disabled name="area" placeholder="选择地区" @click="showMulLinkageThreePicker" />
				<view class="search uni-flex justify-align-center" @click="search">
					<image src="../../../static/search02.png"></image>
					<view class="btnTitle">搜索</view>
				</view>
			</view>
		</view>
		<view class="agentMessage uni-flex uni-column ">
			<view class="messageItem uni-flex align-items itemTitle">代理信息</view>
			<view class="messageItem uni-flex align-items" v-for="(item, index) in areaArr" :key="index" v-if="areaArr.length > 0">
				<view class="circle"></view>
				<view class="">{{ item.areaStr }}</view>
			</view>
			<view class="messageItem uni-flex align-items noMessage space-between" v-if="key == '' && areaArr.length == 0"><view class="uni-flex">暂无</view></view>
			<view class="messageItem uni-flex align-items noMessage space-between" v-if="key != '' && areaArr.length == 0">
				<view class="uni-flex">当前区域可申请代理</view>
				<view class="agencyBtn uni-flex justify-align-center" @click="goAgency">点击申请</view>
			</view>
		</view>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
			@onReset="onReset"
		></mpvue-city-picker>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	data() {
		return {
			key: '',
			id: 0,
			product: {
				title: '',
				salePrice: '',
				marketPrice: ''
			},
			areaArr: [],
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			address: {},
			agency: {}
		};
	},
	components: {
		mpvueCityPicker
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
	},

	onLoad(e) {
		this.id = e.id;
		this.init();
	},
	methods: {
		goAgency() {
			let agent = {};
			agent = this.agency;
			agent.productId = this.id;
			agent.productTitle = this.product.title;
			agent.productPic = this.product.pic;
			agent.address = this.key;
			uni.navigateTo({
				url: 'applyfor?agency=' + encodeURIComponent(JSON.stringify(agent))
			});
		},
		goMerchProduct() {
			uni.navigateTo({
				url: '../../merchant/product/product?id=' + this.id
			});
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onCancel(e) {
			//console.log(e)
		},
		onReset() {
			this.pickerText = '';
		},
		onConfirm(e) {
			this.agency = e;
			this.pickerText = e.label;
			this.address.province = e.value[0];
			this.address.city = e.value[1];
			this.address.district = e.value[2];
			this.address.siteStr = e.label;
		},
		init() {
			this.getData();
			this.getAgentArea();
		},
		search() {
			this.key = this.pickerText;
			this.getAgentArea();
		},
		getData() {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: this.webUrl + 'Product',
				method: 'POST',
				data: {
					id: this.id,
					key: this.key
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					uni.hideLoading();
					if (res.data.result.isSuccess) {
						this.product = res.data.result.product;
					} else {
						uni.showModal({
							title: '系统提示',
							content: res.data.result.resultInfo
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		getAgentArea() {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: this.webUrl + 'ProductAgency',
				method: 'POST',
				data: {
					id: this.id,
					key: this.pickerText
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					uni.hideLoading();
					this.areaArr = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}

.jz_agentProduct .agencyBtn {
	border-radius: 8upx;
}
</style>
