<template>
	<view class="body">
		<view class="head">
			<view class="nav">
				<span>总收入</span>
				<span>￥9999.00</span>
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
							<span class="money">本月收入999元</span>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view class="l1">
					<view class="left">
						<view class="left_head">
							<image class="headpic" src="../../static/images/fx_tx.png"></image>
						</view>
						<view class="left_user">
							<span>商九管理员</span>
							<span>2019-12-25 16:00</span>
						</view>
					</view>
					<view class="right">
						<span>+6000元</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="l1">
					<view class="left">
						<view class="left_head">
							<image class="headpic" src="../../static/images/fx_tx.png"></image>
						</view>
						<view class="left_user">
							<span>商九管理员</span>
							<span>2019-12-25 16:00</span>
						</view>
					</view>
					<view class="right">
						<span>+6000元</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="l1">
					<view class="left">
						<view class="left_head">
							<image class="headpic" src="../../static/images/fx_tx.png"></image>
						</view>
						<view class="left_user">
							<span>商九管理员</span>
							<span>2019-12-25 16:00</span>
						</view>
					</view>
					<view class="right">
						<span>+6000元</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="l1">
					<view class="left">
						<view class="left_head">
							<image class="headpic" src="../../static/images/fx_tx.png"></image>
						</view>
						<view class="left_user">
							<span>商九管理员</span>
							<span>2019-12-25 16:00</span>
						</view>
					</view>
					<view class="right">
						<span>+6000元</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/hongbaoshouru/hongbaoshouru.css';
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
	            time: '12:01'
	        }
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
	        }
	    }
	}
</script>

<style>
</style>
