<template>
    <view>
		<image :src="imgs"></image>
        <progress :percent="percent" strock-width="10"></progress>
        <button type="primary" @tap="cI">chooseImg</button>
    </view>
</template>

<script>
    // 注册一个进度条
    var _self;
    
    export default {
        data() {
            return {
                percent:0,
				imgs:''
            }
        },
        onLoad() {
            _self = this;
			// base64
			
        },
        methods: {
            // cI(){
            //     uni.chooseImage({
            //         count: 1,
            //         sizetype: ['compressed'],
            //         success(res){
            //             // tepFliePaths 保存图片路径 
            //             var imgFiles = res.tempFilePaths;
            //             // 因为没写下标， 直接以数组形式输出
            //             console.log(imgFiles)
            //         }
            //     })
            // }
            cI:function(){
                uni.chooseImage({
                    count: 1,
                    sizeType:['copressed'],
                    success(res) {
                        //因为有一张图片， 输出下标[0]， 直接输出地址
                        var imgFiles = res.tempFilePaths[0];
						console.log(imgFiles)
						this.imgs = imgFiles;
						// base64
						var img = imgFiles;
						var image = new Image();
						image.src = img;
						image.onload = function() {
						    //文件的Base64字符串
						    var newImgUrl = getBase64Image(image);
						    console.log(newImgUrl);
						}
						/**
						 * 图像转Base64
						 */
						function getBase64Image(img) {
						    var canvas = document.createElement("canvas");
						    canvas.width = img.width;
						    canvas.height = img.height;
						    var ctx = canvas.getContext("2d");
						    ctx.drawImage(img, 0, 0, img.width, img.height);
						    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
						    var newImgUrl = canvas.toDataURL("image/" + ext);
						    return newImgUrl;
						}
						// base64 end
						
                        // 上传图片
                        uni.uploadFile({
							
                            // 需要上传的地址
                            url:this.$serverUrl +'/Base_SysManage/Common/UploadFile',
                            // filePath  需要上传的文件
                            filePath: imgFiles,
                            name: 'file',
							formData:{
								fileName: imgFiles,
								fileType:'image',
								data: this.newImgUrl
								
							},
							
							header:{"Content-Type": "multipart/form-data"},
                            success(res1) {
                                // 显示上传信息
                                console.log(res1)
                            }
                        });
                        
                    }
                })
            }
        }
    }
</script>

<style>

</style>