<template>
	<view class="content">
		<view class="shopAdd-commit-img-wrap">
			上传主图 
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号名称：</span>
					<!-- <textarea value="" placeholder="请填写商号名称" class="shopAdd-textarea" /> -->	
				</view>
				<textarea @blur="bindTextAreaBlur" auto-height placeholder="请填写商号名称" class="shopAdd-textarea" />
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号所有者身份：</span>
				</view>
				<view v-for="(item , index) in shenfen" @click="changShenfen(index)" :key="index"
					 :class="{active:a === index}" class="shopAdd-cont-list">
					<span>{{ item.name }}</span>
				</view>
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号行业：</span>
				</view>
				<view v-for="(item , index1) in hangye" @click="changHangye(index1)" :key="index1"
					 :class="{active:b === index1}" class="shopAdd-cont-list">
					<span>{{ item.name }}</span>
				</view>
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号区域：</span>
				</view>

			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>成员加入：</span>
				</view>
				<view v-for="(item , index2) in chengyuan" @click="changChengyuan(index2)" :key="index2"
					 :class="{active:c === index2}" class="shopAdd-cont-list-three">
					<span>{{ item.name }}</span>
				</view>
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>联系人：</span>
				</view>
				<input class="uni-input" placeholder="请填写联系人名称" />
				<view class="shopAdd-cont-title">
					<span>联系电话：</span>
				</view>
				<input class="uni-input" placeholder="请填写联系电话" />
				<view class="shopAdd-cont-title">
					<span>经营地址：</span>
				</view>
				<textarea @blur="bindTextAreaBlur" auto-height placeholder="请填写经营地址" class="shopAdd-textarea" />
			</view>
		</view>



		
	</view>
	
</template>

<script>
	import 'pages/shopAdd/shopAdd.css';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		data() {
			return {
				shenfen: [
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'}
				],
				hangye: [
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'},
					{name: '身份'}
				],
				chengyuan: [
					{name: '开放加入'},
					{name: '审核加入'},
					{name: '付费加入'}
				],
				a: 0,
				b: 0,
				c: 0
		
			}
				
		},
		onLoad() {

		},
		methods: {
			changShenfen(index) {
				this.a = index;
			},
			changHangye(index1) {
				this.b = index1;
			},
			changChengyuan(index2) {
				this.c = index2;
			}
		}
	}
</script>

<style>
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
