<template>
	<view class="main">
		<view class="head">
			<view class="count">
				<span>总计:<b>168</b>人</span>
			</view>
			<view class="head_tab">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
					<span>{{ item.text }}</span>
				</view>
			</view>
		</view>
		<view class="mon">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
							<view class="riqi">
								<view class="uni-input">{{date}}</view>
								<image src="../../static/images/zongh2.png"></image>
							</view>
							<span class="money">本月拓客<b>4</b>人</span>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-show="tabCurrentIndex === 0">
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="username">
					<span>业务员姓名</span>
				</view>
				<view class="new_add">
					<span>新增5人</span>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="username">
					<span>业务员姓名</span>
				</view>
				<view class="new_add">
					<span>新增5人</span>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="username">
					<span>业务员姓名</span>
				</view>
				<view class="new_add">
					<span>新增5人</span>
				</view>
			</view>
		</view>
		<view class="content1" v-show="tabCurrentIndex === 1">
			<view class="list1">
				<view class="head_pic1">
					<image src="../../static/images/fx_pl.png"></image>
				</view>
				<view class="username1">
					<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
				</view>
				<view class="new_add1">
					<span>新增客户</span>
					<span>12580</span>
				</view>
			</view>
			<view class="list1">
				<view class="head_pic1">
					<image src="../../static/images/fx_pl.png"></image>
				</view>
				<view class="username1">
					<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
				</view>
				<view class="new_add1">
					<span>新增客户</span>
					<span>12580</span>
				</view>
			</view>
			<view class="list1">
				<view class="head_pic1">
					<image src="../../static/images/fx_pl.png"></image>
				</view>
				<view class="username1">
					<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
				</view>
				<view class="new_add1">
					<span>新增客户</span>
					<span>12580</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/myAgentCustomer/myAgentCustomer.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
	    data() {
	        const currentDate = this.getDate({
	            format: true
	        })
	        return {
	            title: 'picker',
	            array: ['中国', '美国', '巴西', '日本'],
	            index: 0,
	            date: currentDate,
	            time: '12:01',
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '业务员',
					},
					{
						state: 1,
						text: '商号',
					}
				],
	        }
	    },
		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
		},
	    computed: {
	        startDate() {
	            return this.getDate('start');
	        },
	        endDate() {
	            return this.getDate('end');
	        }
	    },
	    methods: {
	        bindDateChange: function(e) {
				let checked=e.target.value.split('-');
	            this.date =checked[0]+'年'+checked[1]+'月';
	        },
	        getDate(type) {
	            const date = new Date();
	            let year = date.getFullYear();
	            let month = date.getMonth() + 1;
	            // let day = date.getDate();
	            if (type === 'start') {
	                year = year - 60;
	            } else if (type === 'end') {
	                year = year + 2;
	            }
	            month = month > 9 ? month : '0' + month;;
	            // day = day > 9 ? day : '0' + day;
	            return `${year}年${month}月`;
	        },
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//点击选择排序方式
			addClass(){
				console.log(this.length);
			}
	    }
	}
</script>

<style>
</style>
