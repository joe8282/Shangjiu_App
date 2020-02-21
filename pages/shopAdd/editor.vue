<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				

				<editor id="editor" class="ql-container" placeholder="请输入详细介绍内容,可根据需要连续输入文字与连续插入图片(可选填)" showImgSize showImgToolbar showImgResize
				 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
			</view>
			<view class='toolbar insertimg' @tap="format">
				<view class="" @tap="insertImage">插入图片</view>
			</view>
			<view class="next-btn-editor">
				<span>提交</span>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
                readOnly: false,
				formats: {}
			}
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		},
		onLoad() {
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
	}
</script>

<style>
	@import "editor-icon.css";
	uni-page-body{
		height: 100%;
		position: relative;
	}
	.container, .page-body{
		position: relative;
		height: 100%;
	}
	.wrapper {
		padding: 5px;
	}
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
		position: relative;
		height: 100%;
	}
	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}
	#editor{
		font-size: 14px;
	}
	.ql-active {
		color: #06c;
	}
	.next-btn-editor{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FFFFFF;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
		float: left;
		margin-top: 10px;
		font-size: 14px;
		color: #b22420;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #F1F1F1;
	}
	.insertimg{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FFFFFF;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
		color: #b22420;
		font-size: 14px;
		position: fixed;
		bottom: 50px;
		left: 0;
		border-top: 1px solid #F1F1F1;
	}
</style>