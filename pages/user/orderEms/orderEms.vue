<template>
	<view class="uni-flex uni-column jz_ems">
		<view v-if="status=='0'">
			<uni-steps :options="list" direction="column" :active="2"></uni-steps>
		</view>
		<view class="uni-flex  justify-align-center ems" v-if="status!='0'&status!=''">
			<view class="tipImg">
				<image src="../../../static/warn.png"></image>
			</view>
			<view class="uni-flex uni-column msgs">
				<view class="titile">抱歉，查询物流失败！</view>
				<view class="tip">请稍后再试。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		uniSteps
	} from "@/components/uni-steps/uni-steps.vue"

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		components: {
			uniSteps
		},
		methods: {
			getData() {
				uni.request({
					url: this.webUrl + 'OrderLogistics',
					method: 'POST',
					data: {
						id: this.orderId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.status = JSON.parse(res.data.data).status;
						if (this.status == "0") {
							this.list = JSON.parse(res.data.data).result.list;
							let b = JSON.stringify(this.list).replace(/status/g, "title");
							let c = b.replace(/time/g, "desc");
							this.list = JSON.parse(c);
						}
					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}
		},
		onLoad(e) {
			this.orderId = e.order.replace(/"/g,"");
			this.getData();
		},
		data() {
			return {
				orderNo: '',
				list: [],
				status: ''
			};
		}
	}
</script>
<style>
	.jz_ems .ems {
		margin-top: 300upx;
	}

	.jz_ems .tipImg image {
		width: 80upx;
		height: 80upx;
	}

	.jz_ems .titile {
		font-weight: bold;
		margin-top: -22upx;
	}

	.jz_ems .msgs {
		margin-left: 20upx;
	}

	.jz_ems .tip {
		margin-top: -5upx;
	}
</style>
