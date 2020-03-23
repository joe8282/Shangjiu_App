<template>
	<view class="uni-flex uni-column  cart jz_cart jz_merchant">
		<view class="uni-flex uni-column" v-if="!ok">
			<view class="uni-flex cart-empty">
				<view class="uni-flex uni-column">
					<view class="uni-flex justify-align-center">
						<image src="../../../static/cart/cartempty.png" mode="widthFix"></image>
					</view>
					<view class="uni-flex justify-align-center cart-empty-title">购物车空空如也~</view>
					<view class="uni-flex justify-align-center cart-empty-title" @click="goMyAgency" style="margin-top: 12upx; font-size: 28upx; background-color: #CA0000;border-radius: 8upx; color: #FFFFFF;">
						代理商品一键下单<image src="../../../static/cart/arrow1.png" mode="widthFix" style="margin-left: 4upx; height: 24upx; width: 24upx;"></image>
					</view>
				</view>
			</view>
			<!-- <recommend :items="items" :src="src"></recommend> -->
			<view class="recommend uni-flex uni-column">
				<view class="push_product_title uni-flex justify-align-center">
					<image :src="src"></image>
					<view class="push_title">为你推荐</view>
				</view>
				<view class="uni-flex lists-wrap">
					<view class="uni-flex uni-row list">
						<view class="uni-product-list" id="list">
							<view class="uni-product" v-for="(item, key) in items" :key="key" @click="goProduct(item.id)">
								<view class="image-view uni-flex justify-align-center">
									<!-- <image :src="item.pic"></image> -->
									<image class="image" :class="{lazy:!item.display}" :id="'lazy'+ key" :data-index="0" @load="imageOnLoad(item)"
									 :src="item.display?item.pic:''" />
									<view class="loadbox" :class="{loaded:item.loaded}">
										<view class="load"></view>
									</view>
								</view>
								<view class="uni-flex uni-column uni-product-title-wrap">
									<view class="uni-product-title uni-flex-item">{{ item.title }}</view>
									<view class="product_details uni-flex uni-row">
										{{item.profile}}
									</view>
									<view class="uni-flex-item prices uni-flex">
										<view class="prices-salePrice">￥{{ item.salePrice }}</view>
										<view class="prices-cart">
											<image src="../../../static/category/cart.png"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>



		</view>

		<view class="uni-flex" v-if="ok">
			<view class="uni-flex uni-column uni-flex-item cart-list">
				<!-- 列表循环 -->
				<view class="uni-flex uni-row " v-for="(item, m) in json" :key="m" v-if="item.show">
					<view class="uni-flex uni-column item-shop uni-flex-item">
						<!-- 商家 -->
						<!-- <view class="uni-flex uni-row  item-shop-name">
							<view class="uni-flex item-sel">
								<view :class="[yuan,{bg:item.select}]" @click.stop="dpSelected(m)"></view>
							</view>
							<view class="uni-flex dp">{{item.sj}}</view>
						</view> -->
						<!-- 图片产品名称价格数量展示 -->
						<view class="uni-flex uni-row cart-item" v-for="(pl, index) in json[m].items" :key="index" v-if="pl.show">
							<!-- 选择按钮 -->
							<view class="uni-flex item-sel">
								<view :class="[yuan, { bg: pl.select }]" @click="selected(m, index, $event)"><text v-if="pl.select" class="gou"></text></view>
							</view>
							<!-- 商品图片 -->
							<view class="uni-flex uni-flex-item cart-item-left">
								<view class="uni-flex uni-flex-item item-padding item-img" @click="goProduct(pl.id)">
									<image mode="widthFix" :src="pl.img"></image>
								</view>
								<view class="uni-flex uni-column uni-flex-item2 item-padding">
									<view class="uni-flex uni-flex-item title">{{ pl.cp }}</view>

									<view class="uni-flex uni-row cart-attr" @click="changeAttr(m,index)">
										<view class="uni-flex  uni-row" style="background-color: #F2F2F2;padding: 8upx;height: 40upx;overflow: hidden; border-radius: 8upx;">
											<view class="uni-flex" v-for="(attr,n) in pl.attr" :key="n">
												<text v-if="(n+1<pl.attr.length)" class="text">{{attr.value}};</text>
												<text v-if="(n+1==pl.attr.length)" class="text">{{attr.value}}</text>
											</view>
											<view class="uni-flex" style=" margin-left: 4upx; width: 30upx;align-items: center;justify-content: center;">
												<image src="../../../static/cart/arrow.png" mode="widthFix"></image>
											</view>
										</view>
									</view>

									<view class="uni-flex uni-row uni-flex-item">
										<view class="uni-flex uni-flex-item3 cartpriceBg">￥{{ pl.jg }}</view>
										<view class="uni-flex uni-row numbers uni-flex-item2">
											<view class="uni-flex number" @click="reduce(m, index)">-</view>
											<input class="uni-flex" disabled="disabled" type="text" v-model="pl.sl" />
											<view class="uni-flex number" @click="add(m, index)">+</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row header">
				<view class="uni-flex uni-flex-item">
					<view class="uni-flex uni-flex-item5">共{{ all }}件宝贝</view>
					<view v-show="open" class="uni-flex manage uni-flex-item" @click="manage()">管理</view>
					<view v-show="!open" class="uni-flex manage uni-flex-item" @click="manage()">完成</view>
				</view>
			</view>
			<view class="uni-flex uni-row footer">
				<view class="uni-flex uni-flex-item ">
					<view class="uni-flex item-sel ">
						<view :class="[yuan, { bg: allSelect }]" @click="AllSelect()"><text v-if="allSelect" class="gou"></text></view>
					</view>
					<view class="uni-flex uni-flex-item itemAll">全选</view>
					<view class="uni-flex uni-flex-item3">￥{{ allPrice }}</view>
					<view class="uni-flex uni-flex-item2 justify-align-center">
						<view v-show="open" class="uni-flex uni-flex-item btn" @click="js()" :class="{'activeBg':bgChange}">结算({{ allNum }})</view>
						<view v-show="!open" class="uni-flex uni-flex-item btn-hollow" :class="{'activeDel':delBgChange}" @click="delAll()">删除({{ allNum }})</view>
					</view>
				</view>
			</view>
		</view>
		<attr-popup :show="showAttr" @hidePopup="hidePopup" :productItems="productItems" :toptitle="toptitle"></attr-popup>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
		<attr :show="showAttr1" ref="child1" :popStock="stock" :staticStock="stock" :user="user" :saleMode="saleMode" :max="max"
		 :weight="weight" :mode="mode" :merchant="merchant" :expressFees="expressFees" :number="stock" :popUnitNum="unitNum"
		 :unit="unit" :popIndex="popIndex" :title="title" :pic="pic" :sale="sale" :popMarketPrice="marketPrice" :popSalePrice="salePrice"
		 :pid="id" :hideAttr="hideAttr" :attr="attr" :popupAttr="popupAttr" :popCarts="json" @selAttrPic="selAttrPic"
		 @ModiAttr="ModiAttr" @hidePopup1="hidePopup1"></attr>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import attrPopup from '../../../components/cartcommon/uni-popup-public.vue';
	import cart from '../../../common/cart.js';
	import util from '../../../common/util.js';
	import attr from '../../../components/uni-popup-attr.vue';
	import backTop from '@/components/uni-top.vue';

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				backTop: {
					src: '../../../static/top.png',
					scrollTop: 0
				},
				delBgChange: false,
				bgChange: false,
				src: '../../../static/pay04.png',
				yuan: 'yuan',
				allPrice: '0.00',
				allSelect: false,
				Show: -1,
				open: true,
				ok: false,
				allNum: 0,
				all: 0,
				json: [],
				user: {},
				items: [],
				showAttr: false,
				productItems: [],
				toptitle: '',
				windowHeight: 0,
				//attr
				product: {},
				showAttr1: false,
				stock: 0,
				saleMode: 0,
				mode: '',
				max: '',
				unit: '',
				unitNum: 1,
				weight: '',
				merchant: {},
				expressFees: [],
				title: '',
				pic: '',
				sale: {
					mode: '0'
				},
				salePrice: '',
				marketPrice: '',
				id: '',
				hideAttr: true,
				attr: [],
				popupAttr: {},
				attrPic: {},
				popIndex: 0,
				//attr
			};
		},
		onShow() {
			this.init();
		},
		onLoad(e) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.init();
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
			util.loads(this.items, 'list', this.windowHeight);
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		components: {
			attrPopup,
			attr,
			backTop
		},
		methods: {
			goMyAgency() {
				uni.navigateTo({
					url: '../myAgency/index'
				})
			},
			selAttrPic(e) {
				if (this.attrPic) {
					for (let i = 0; i < this.attrPic.length; i++) {
						if (this.attrPic[i].name == e) {
							this.pic = this.domain + this.attrPic[i].url;
							break;
						}
					}
				}
			},
			ModiAttr(js) {
				this.hidePopup1();
				this.json = this.cartSort(js);;
				cart.updateCart(this.json);
			},
			cartSort(json) {
				for (let i = 0; i < json.length; i++) {
					json[i].items.sort(function(a, b) {
						return a.id - b.id
					});
				}
				return json;
			},
			hidePopup1() {
				this.showAttr1 = false;
			},
			changeAttr(m, index) {
				this.id = this.json[m].items[index].id;
				this.getProduct();
				this.popIndex = index;
			},
			getProduct() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: this.webUrl + 'Product',
					method: 'POST',
					data: {
						id: this.id,
						userid: this.userid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.product = res.data.result.product;
							this.saleMode = this.product.saleMode;
							this.salePrice = this.product.salePrice.toFixed(2);
							this.marketPrice = this.product.marketPrice.toFixed(2);
							this.stock = this.product.stock;
							this.max = this.product.stock;
							this.pic = this.product.pic;
							this.unitNum = this.product.unitNum;
							this.unit = this.product.unit;
							this.title = this.product.title;
							this.merchant = res.data.result.merchant;
							this.expressFees = res.data.result.expressFees;
							this.weight = this.product.weight;
							if (this.product.attributeList != null) {
								let jsonAttr = JSON.parse(this.product.attributeList);
								this.popupAttr = jsonAttr;
								this.attr = [];
								for (let i = 0; i < this.popupAttr.length; i++) {
									this.attr.push(JSON.parse('{"name":"' + this.popupAttr[i].attrName + '","value":""}'));
								}
							}
							this.sale.mode = 0;
							this.max = this.stock;
							this.showAttr1 = true;
							this.mode = 3;
							this.$refs.child1.groupCartInit();
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
			goProduct(id) {
				uni.navigateTo({
					url: '../../merchant/product/product?id=' + id
				})
			},
			init() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					});
				} else {
					uni.showLoading({
						title: "加载中"
					})
					this.delBgChange = false;
					this.bgChange = false;
					this.user = JSON.parse(this.jyyUser);
					this.json = this.cartSort(cart.getCart());
					console.log(this.json)
					this.userid = this.user.id;
					if (this.json.length > 0) {
						this.ok = true;
						this.reSetSel();
						this.count();
					} else {
						this.getDate();
						this.ok = false;
					}
					uni.hideLoading();
				}
			},
			hidePopup() {
				this.showAttr = false;
			},
			manage() {
				this.open = !this.open;
			},
			getDate() {
				uni.request({
					url: this.webUrl + 'Recommend',
					method: 'POST',
					data: {
						userid: this.userid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.items = res.data.result.resultInfo;
						setTimeout(() => {
							util.loads(this.items, 'list', this.windowHeight);
						}, 300)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			imageOnLoad(e) {
				e.loaded = true;
			},
			selected(m, index) {
				let select = this.json[m].items[index].select;
				this.json[m].items[index].select = !select;
				//this.cpIndex = index;
				let length = this.json[m].items.length;

				//商品全部选中，店铺才选中
				let select1 = true;
				for (let i = 0; i < length; i++) {
					//叠加积累有false就为false
					select1 *= this.json[m].items[i].select;
				}
				if (select1 == true) {
					this.json[m].select = true;
				} else {
					this.json[m].select = false;
				}

				//判断商品是否全部选中，是的话，全选也选中
				let json = this.json.length;
				let all = true;
				for (let i = 0; i < json; i++) {
					all *= this.json[i].select;
				}
				if (all == true) {
					this.allSelect = true;
				}
				this.allSl(); //商品数量
				this.cancel(m, index); //商品没有全部选中就取消全选
				this.price(); //总价
			},
			//结算商品数量
			allSl() {
				let json = this.json.length;
				let js = 0;
				for (let i = 0; i < json; i++) {
					let arr = this.json[i].items;
					for (let j = 0; j < arr.length; j++) {
						if (this.json[i].items[j].show) {
							js += this.json[i].items[j].select;
						}
					}
				}
				this.allNum = js;
				if (this.allNum > 0) {
					this.bgChange = true;
				} else {
					this.bgChange = false;
				}
			},
			count() {
				let json = this.json.length;
				let js = 0;
				for (let i = 0; i < json; i++) {
					let arr = this.json[i].items;
					for (let j = 0; j < arr.length; j++) {
						js++;
					}
				}
				this.all = js;
			},
			//计算价格
			price() {
				let all = 0;
				for (let j = 0; j < this.json.length; j++) {
					//点击循环有多少个商家
					let arr = this.json[j].items; //获取商家下面的列表产品
					for (let i = 0; i < arr.length; i++) {
						//循环产品列表
						if (arr[i].select === true) {
							//列表里面那些为true
							all += arr[i].jg * arr[i].sl; //为true的价格加起来，为总价
						}
					}
				}
				this.allPrice = all.toFixed(2); //返回数据
				if (this.allPrice > 0) {
					this.delBgChange = true;
				} else {
					this.delBgChange = false;
				}
			},
			//选择属于某个商家地所有产品
			dpSelected(index) {
				//商家选中
				let select = this.json[index].select;
				this.json[index].select = !select;

				let arr = this.json[index].items; //获取店铺下面的产品数量
				for (let i = 0; i < arr.length; i++) {
					//循环产品数量
					if (arr[i].select == false) {
						//判断有那些产品未选中
						arr[i].select = true; //选中咯
					}
					if (this.json[index].select === false) {
						//当店铺取消全选的时候
						arr[i].select = false; //产品全部没选中
					}
				}
				let select1 = true; //创建一个为真的变量
				for (let i = 0; i < this.json.length; i++) {
					if (this.json[i].select == false) {
						//如果有商家没选中全选则为false
						this.allSelect = false;
					}
					select1 *= this.json[i].select;
				}

				if (select1 == true) {
					this.allSelect = true;
				}

				this.allSl(); //商品数量
				this.price();
			},
			AllSelect() {
				let selected = this.allSelect;
				this.allSelect = !selected;

				let dp = this.json.length; //获取店铺数量
				for (let i = 0; i < dp; i++) {
					//循环店铺
					let arr = this.json[i].items; //获取每个店铺的商品
					for (let j = 0; j < arr.length; j++) {
						//循环每个店铺里面的商品为选中
						if (this.json[i].items[j].show) {
							if (this.allSelect == true) {
								this.json[i].items[j].select = true;
							}
							if (this.allSelect == false) {
								this.json[i].items[j].select = false;
							}
						}
					}
					if (this.json[i].show) {
						if (this.allSelect == true) {
							this.json[i].select = true;
						} else {
							this.json[i].select = false;
						}
					}
				}
				this.allSl(); //商品数量
				this.price();
			},
			//商品没有全部选中就取消全选
			cancel(m, index) {
				if (this.json[m].items[index].select == false) {
					this.allSelect = false;
				}
			},
			//商品--
			reduce(m, index) {
				if (this.json[m].items[index].sl <= 1) {
					return;
				}
				this.json[m].items[index].sl--;
				this.price();
				cart.updateCart(this.json);
			},
			//商品++
			add(m, index) {
				this.json[m].items[index].sl++;
				let id = this.json[m].items[index].id;
				let attrMode = this.json[m].items[index].attrMode;
				let count = 0;
				let stock = 0;
				if (attrMode) {
					for (let j = 0; j < this.json[m].items.length; j++) {
						if (this.json[m].items[j].attrMode == true & this.json[m].items[j].id == id) {
							count += this.json[m].items[j].unitNum * this.json[m].items[j].sl;
						}
					}
					stock = this.json[m].items[index].stock;
				} else {
					count = this.json[m].items[index].sl * this.json[m].items[index].unitNum;
					stock = this.json[m].items[index].attrStock;
				}
				if (count >= stock) {
					uni.showToast({
						title: '库存不足',
						icon: 'none'
					});
					this.json[m].items[index].sl--;
				} else {
					// this.json[m].items[index].jg = (this.json[m].items[index].sl * this.json[m].items[index].unitNum * this.json[m].items[
					// 	index].unitPrice).toFixed(2);
					this.price();
					cart.updateCart(this.json);
				}


			},
			delAll() {
				if (this.delBgChange) {
					const jsons = [];
					let f = false;
					for (let j = 0; j < this.json.length; j++) {
						let arr = this.json[j].items;
						let items = [];
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].select === false) {
								items.push({
									id: arr[i].id,
									cp: arr[i].cp,
									jg: arr[i].jg,
									img: arr[i].img,
									sl: arr[i].sl,
									attr: arr[i].attr,
									unitNum: arr[i].unitNum,
									unit: arr[i].unit,
									attrMode: arr[i].attrMode,
									select: false,
									show: true,
									weight: arr[i].weight,
									expressFees: arr[i].expressFees
								});
							} else {
								f = true;
							}
						}
						if (items.length > 0) {
							const item = {
								mid: this.json[j].mid,
								sj: this.json[j].sj,
								no: '',
								totalPrice: '',
								select: false,
								show: true,
								message: '',
								expressCost: '',
								items: items,
								count: '',
								sale: this.json[j].sale
							};
							jsons.push(item);
							this.allPrice = '0.00';
							this.allNum = 0;
						}
					}
					if (!f) {
						uni.showToast({
							icon: 'none',
							title: '请选择商品'
						});
					} else {
						let that = this;
						uni.showModal({
							title: '提示',
							content: '是否删除',
							success: function(res) {
								if (res.confirm) {
									that.json = jsons;
									cart.updateCart(that.json);
									if (jsons.length == 0) {
										that.ok = false;
										that.init()
									}
									that.allPrice = '0.00';
									that.allNum = 0;
									that.delBgChange = false;
									that.bgChange = false;
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});

					}
				}
			},
			reSetSel() {
				for (var i = 0; i < this.json.length; i++) {
					this.json[i].select = false;
					for (var j = 0; j < this.json[i].items.length; j++) {
						this.json[i].items[j].select = false;
					}
				}
				this.allSelect = false;
				this.allPrice = '0.00';
				this.allNum = 0;
				this.open = true;
			},
			//结算支付
			js() {
				if (this.bgChange) {
					if (this.allPrice == 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择商品'
						});
					} else {
						const jsons = [];
						let f = false;
						for (let j = 0; j < this.json.length; j++) {
							let arr = this.json[j].items;
							let items = [];
							for (let i = 0; i < arr.length; i++) {
								if (arr[i].select === true) {
									items.push({
										id: arr[i].id,
										cp: arr[i].cp,
										jg: arr[i].jg,
										img: arr[i].img,
										sl: arr[i].sl,
										attr: arr[i].attr,
										unitNum: arr[i].unitNum,
										weight: arr[i].weight,
										unit: arr[i].unit,
										attrMode: arr[i].attrMode
									});
								} else {
									f = true;
								}
							}
							if (items.length > 0) {
								const item = {
									mid: this.json[j].mid,
									sj: this.json[j].sj,
									no: '',
									totalPrice: '',
									message: '',
									expressCost: '',
									items: items,
									count: '',
									sale: this.json[j].sale
								};
								jsons.push(item);
							}
						}

						uni.showLoading({
							title: '订单保存中'
						});
						uni.request({
							url: this.webUrl + 'SaveOrder',
							method: 'POST',
							data: {
								user: JSON.stringify(this.user),
								data: JSON.stringify(jsons)
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: res => {
								uni.hideLoading();
								if (res.data.result.isSuccess) {
									cart.setOrder(res.data.orders);
									//cart.updateCart([]);
									uni.navigateTo({
										url: '../order/order'
									});
								} else {
									this.showAttr = true;
									this.toptitle = res.data.result.resultInfo;
									this.productItems = res.data.result.resultInfo2;
									// uni.showToast({
									// 	title: res.data.result.resultInfo,
									// 	icon: 'none'
									// });
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			}
		}
	};
</script>

<style>
	.recommend {
		overflow-x: hidden;
	}

	.push_product_title image {
		width: 100%;
		height: 48rpx;

	}

	.push_product_title .push_title {
		width: 100%;
		position: absolute;
		left: 50%;
		margin-left: -30rpx;
		color: #333333;

	}

	.uni-flex-item2 input {
		display: inline-block;
		width: 20upx;
	}

	page {
		background: #ffffff;
	}

	.jz_cart .btn {
		border-radius: 6upx;
		background: #cdcdcd;
		letter-spacing: 4upx;
	}

	.jz_cart .activeBg {
		background: #dd0101;
	}

	.jz_cart .activeDel {
		background: #dd0101;
	}

	.gou {
		display: block;
		text-align: center;
		color: #ffffff;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
	}

	.push_product_title {
		width: 100%;
		padding: 30upx 0 0 0;
		position: relative;
	}

	.push_product_title image {
		width: 100%;
		height: 48upx;
	}

	.push_product_title .push_title {
		width: 100%;
		position: absolute;
		left: 50%;
		margin-left: -30upx;
		color: #333333;
	}
</style>
