import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$serverUrl = 'http://manage.shangjiu360.com'
Vue.prototype.IsReg = function () {  
    if(uni.getStorageSync('userphone')=='')  {
		uni.navigateTo({
			url: '../login/register'
		});
	}
};  
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
