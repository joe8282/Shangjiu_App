<template>
	<view class="uni-flex uni-column cart order">
		<view class="uni-flex uni-column uni-flex-item" style="margin-bottom: 80upx;">

			<view class="uni-flex uni-column order-address">
				<view class="uni-flex uni-column order-address-box">
					<view class="uni-flex uni-flex-item uni-row">收货信息</view>
					<view class="uni-flex uni-flex-item uni-row">
						xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
					</view>
				</view>				
				<view class="uni-flex uni-flex-item order-address-line">
					<image src="../../../static/cart/line.png" mode="widthFix"></image>
				</view>
			</view>

			<!-- 列表循环 -->
			<view class="uni-flex uni-column uni-flex-item  cart-list" v-for="(item,m) in json" :key="item">
				<view class="uni-flex uni-column item-shop ">
					<!-- 商家 -->
					<view class="uni-flex uni-row  order-line">
						{{item.sj}}
					</view>
					<!-- 图片产品名称价格数量展示 -->
					<view class="uni-flex uni-row  order-item" v-for="pl in json[m].items" :key="pl">
						<!-- 商品图片 -->
						<view class="uni-flex uni-flex-item item-padding item-img">
							<image mode="widthFix" :src="pl.img"></image>
						</view>
						<view class="uni-flex uni-column item-padding uni-flex-item3">
							<view class="uni-flex uni-flex-item">
								{{pl.cp}}
							</view>
							<view class="uni-flex uni-flex-item">
								<view class="uni-flex text cart-attr" v-for="(attr,n) in pl.attr" :key="attr">
									{{attr.name}}：{{attr.value}}
								</view>
							</view>
							<view class="uni-flex uni-row uni-flex-item">
								<view class="uni-flex uni-flex-item5">￥{{pl.jg}}</view>
								<view class="uni-flex uni-flex-item ">x{{pl.sl}}</view>
							</view>
						</view>
					</view>

					<view class="uni-flex uni-row  order-line">
						订单编号：快递
					</view>
					<view class="uni-flex uni-row  order-line">
						买家留言：{{item.message}}
					</view>
					<view class="uni-flex uni-row  order-line">
						配送方式：快递{{item.expressCost}}
					</view>
					<view class="uni-flex uni-row  order-line">
						支付金额：{{item.totalPrice}}
					</view>
				</view>
			</view>

			<view class="uni-flex uni-flex-item">
				<radio-group class="uni-flex-item" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="1" checked="true" />
						</view>
						<view>金YY</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="1" />
						</view>
						<view>支付宝</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="1" />
						</view>
						<view>微信</view>
					</label>
				</radio-group>
			</view>
		</view>


		<view class="uni-flex uni-row footer">
			<view class="uni-flex-item3 uni-flex">付款金额: ￥{{allPrice}}</view>
			<view class="uni-flex uni-flex-item justify-flex-end">
				<view class="uni-flex uni-flex-item btn" @click='pay()'>立即支付</view>
			</view>		
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import cart from '../../../common/cart.js';

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				allPrice: '0.00',
				allNum: 0,
				json: [],
				user: {},
			};
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.json = cart.getOrder();
				this.price();
				if (this.debug) {
					console.log(this.json);
				}
			}
		},
		methods: {
			price() {
				let all = 0;
				for (let j = 0; j < this.json.length; j++) {
					all += parseFloat(this.json[j].expressCost) + parseFloat(this.json[j].totalPrice);
				}
				this.allPrice = all.toFixed(2); //返回数据
			},
			pay() {
				uni.showToast({
					icon: "none",
					title: "未完成"
				})
			}
		}
	}
</script>

<style>


</style>
