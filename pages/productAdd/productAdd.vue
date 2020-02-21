<template>
	<view class="content">
		<view class="shopAdd-commit-img-wrap">
			上传商讯主图 
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商讯标题：</span>
					<!-- <textarea value="" placeholder="请填写商号名称" class="shopAdd-textarea" /> -->	
				</view>
				<textarea @blur="bindTextAreaBlur" auto-height placeholder="请填写商讯标题" class="shopAdd-textarea" />
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>类型：</span>
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
					<span>行业：</span>
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
					<span>商讯区域：</span>
				</view>
				<pickerAddress @change="change" class="select-city">{{txt}}</pickerAddress>
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>收费设置：</span>
				</view>
				<!-- <view v-for="(item , index2) in chengyuan" @click="changChengyuan(index2)" :key="index2"
					 :class="{active:c === index2}" class="shopAdd-cont-list-three">
					<span>{{ item.name }}</span>
				</view> -->
				<view class="shopAdd-cont-list-three" @click="addbg(i,item)" v-for="(item,i) in text" :class="{active1:i!=nowIndex}">{{item}}</view>

				<view v-show="nowIndex === 0" class="content">
				</view>

				<view v-show="nowIndex === 1" class="content">
					<view class="nowindex-list">
						<span>填写价格</span>
						<input type="text" value="" />
					</view>
				</view>

				<view v-show="nowIndex === 2" class="content">
					<view class="nowindex-list">
						<span>填写价格</span>
						<input type="text" value="" />
					</view>
				</view>


			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="productAdd-ff-list">
					<span>内容来源：</span>
					<view class="pdt-rr">
						<view v-for="(item , index4) in nrly" @click="changNrly(index4)" :key="index4"
							 :class="{active:d === index4}" class="shopAdd-cont-list">
							<span>{{ item.name }}</span>
						</view>
					</view>
					
				</view>
				<view class="productAdd-ff-list">
					<span>是否公开：</span>
					<view class="pdt-rr">
						<view v-for="(item , index5) in sfgk" @click="changSfgk(index5)" :key="index5"
							 :class="{active:e === index5}" class="shopAdd-cont-list">
							<span>{{ item.name }}</span>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>内容作者：</span>
				</view>
				<input class="uni-input" placeholder="请填写内容作者(可选填)" />
				<view class="shopAdd-cont-title">
					<span>内容出处：</span>
				</view>
				<input class="uni-input" placeholder="请填写内容出处(可选填)" />
			</view>
		</view>


		<view class="next-bottomfixed">
			<span>下一步</span>
		</view>


		
	</view>
	
</template>

<script>
	import 'pages/productAdd/productAdd.css';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		components:{
            pickerAddress
        },
		data() {
			return {
				nowIndex: 0,

				active_text:'菜单一',

				text: ['免费', '订阅收费', '项目收费'],
				txt: '选择地址',
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
				nrly: [
					{name: '原创'},
					{name: '转载'}
				],
				sfgk: [
					{name: '公开'},
					{name: '私存'}
				],
				a: 0,
				b: 0,
				c: 0,
				d: 0,
				e: 0
		
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
			},
			changNrly(index4) {
				this.d = index4;
			},
			changSfgk(index5) {
				this.e = index5;
			},
			change(data) {
				
                this.txt = data.data.join('')
                console.log(data.data)
            },
			addbg(index, active_text) {
				this.nowIndex = index;
				this.active_text= active_text;
			},
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
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
