<template>
	<view class="content">
			<view class="btn">
				<view class="tt">
					<label>姓名：</label>
					<input type="text" placeholder="个人请输入真实姓名,企业请输入真实企业名" />
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>手机号码：</label>
					<input type="number" placeholder="请输入11位手机号码" />
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>验证码：</label>
					<input type="number" placeholder="请输入6位验证码" />
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>代理地区：</label>
					<pickerAddress @change="change" class="select-city">{{txt}}</pickerAddress>
					<view class="pic"><image src="../../static/images/xyi.png"></image></view>
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>所在地区：</label>
					<pickerAddress @change="change1" class="select-city">{{txt1}}</pickerAddress>
					<view class="pic"><image src="../../static/images/xyi.png"></image></view>
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>详细地址：</label>
					<input type="text" placeholder="请输入您的详细地址" />
				</view>
			</view>
			<view class="btn">
				<view class="tt">
					<label>证件上传：</label>
					<pickerAddress @change="change2" class="select-city">{{txt2}}</pickerAddress>
					<view class="pic"><image src="../../static/images/xyi.png"></image></view>
				</view>
			</view>
			<view class="btn_text">
				<view class="tt">
					<label>简介：</label>
				</view>
			</view>
			<view class="word">
				<textarea style="overflow: hidden;" placeholder="简单描述您的情况或者企业信息"></textarea>
			</view>
			<view class="commit">
				<button class="tijiao">提交</button>
			</view>
	</view>
</template>

<script>
	import 'pages/myAgentReg/myAgentReg.css';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
	   components:{
	       pickerAddress
	   },
	   data(){
		   return{
			   txt: '请填写代理的地区',
			   txt1: '请填写收货人所在的地区',
			   txt2: '点击选择证件上传'
		   }
	   },
	   methods: {
		   change(data) {
		       this.txt = data.data.join(' ')
		       console.log(data.data)
		   },
		   change1(data) {
		       this.txt1 = data.data.join(' ')
		       console.log(data.data)
		   },
		   change2(data) {
		       this.txt2 = data.data.join(' ')
		       console.log(data.data)
		   },
		 },
	}
</script>

<style>
</style>
