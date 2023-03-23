<template>
	<view class="mask" v-show="isShow" @click="_hide()" @touchmove.stop.prevent="disabledScroll" @catchtouchmove="disabledScroll">
		<view class="content">
			<view class="title">
				<button class="off" @click.stop="_hide()">取消</button>
				<text class="title-text">{{title}}</text>
				<button v-show="isSuper" class="ok" @click.stop="superOk">确定</button>
			</view>
			<view class="select-box">
				<view class="select-item" v-for="(item, index) in selectList" :key="index" @click.stop ="selectOnclick(item, index)">
					{{item[namekey]}}
				</view>
			</view>
			<view class="query-box" @touchmove.stop.prevent="disabledScroll" @catchtouchmove="disabledScroll">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="query-item" v-for="(item, index) in showList" :key="index" @click.stop="itemOnclick(item, index)">
						{{item[namekey]}}
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"gljy-data-picker",
		props:{
			title:{
				type:String,
				default:"请选择"
			},
			initList:{
				type:Array,
				default:function(){
					return [];
				}
			},
			isLoad:{
				type:Boolean,
				default:false
			},
			//是否允许选择上级
			isSuper:{
				type:Boolean,
				default:false
			},
			idkey:{
				type:String,
				default:"RegionCode"
			},
			namekey:{
				type:String,
				default:"RegionName"
			},
			childrenkey:{
				type:String,
				default:"Children"
			}
		},
		data() {
			return {
				isShow:false,
				//选择到的列表数据
				selectList:[],
				//查询的所有数据
				queryList:[],
				//显示的选择列表
				showList:[]
			};
		},
		created(){
			if(this.initList.length > 0){
				this.showList = this.initList;
				this.queryList = this.initList;
			}

		},
		onLoad() { 
			if(this.initList.length > 0){
				this.showList = this.initList;
				this.queryList = this.initList;
			}
		},
		methods:{
			_show() {
				this.isShow = true;
			},
			_hide() {
				//关闭后,将选中的数据也清空掉, 并将选择内容恢复成初始状态
				this.selectList = [];
				this.showList = this.queryList;
				this.isShow = false
			},
			//点击子项的时候
			itemOnclick(item, index){
				
				//判断是不是懒加载模式
				if(this.isLoad){
					//如果是懒加载模式的话, 那么执行load
					this.load(item, 2);
					return;
				} 
				//如果不是的话,找到数据位置,查找是否有下级数据
				let _item = item;
				if(_item[this.childrenkey] != null && _item[this.childrenkey].length > 0){
					this.showList = _item[this.childrenkey];
					//将选中的数据设置到候选区中
					this.selectList.push(item);
				}else{
					//选择完成, 候选区清空
					this.$emit("itemOnclick", item);
					this._hide();//关闭
				}
			},
			//点击的时候, 开始懒加载数据
			load(item, type){
				//type 1:点击子项激活 2:回退上级激活
				this.$emit("load", item, val => {
					//如果返回的数组是有数据的,那么就将数据设置进去
					if(val.length > 0){
						this.showList = val;
						//将选中的数据设置到候选区中
						if(type === 2) this.selectList.push(item);
					}else{
						//如果没有的话, 那么就说明是最后一个,这样就直接关闭就行了
						this.$emit("itemOnclick", item);
						this._hide();//关闭
					}
				});
			},
			//点击确定按钮, 选择上级
			superOk(){
				//获取到 已选区的数据
				let item = this.selectList[this.selectList.length-1];
				/* 这里不做处理, 由开发者自己接收数据后,自行处理
				if(item == null || item == undefined){
					uni.showToast({
						title:"请先选择",
						icon:"none"
					})
					return;
				}*/
				this.$emit("itemOnclick", item);
				this._hide();
			},
			//待选区被点击了
			selectOnclick(item, index){
				//将大于 index的 item剔除出去
				this.selectList.splice(index, this.selectList.length-index);
				if(this.isLoad){
					//如果是懒加载模式, 执行回调
					//候选区点击后,应该是传入当前选区的上一级选区回去, 候选区点击后,返回上一级
					if(index > 0){
						this.load(this.selectList[index-1], 1);
					}else{
						//如果返回为空, 说明要从第一级开始, 这里直接将初始化的数据重置进来就行了
						this.showList = this.initList;
					}
					return;
				}
				if(item[this.idkey] == undefined){
					console.log("没有获取到idkey值，请检查是否匹配了idkey");
				}
				//如果不是懒加载的话, 那么就要去 queryList中找到对应的值
				let newItem = this.findListItem(item[this.idkey], this.queryList);
				this.showList = newItem;
			},
			//传入指定的id,根据id去找到对应的item
			findListItem(id, list){
				for(var i=0;i<list.length;i++){
					//获取到当前的数据的id
					var newId = list[i][this.idkey];
					//如果id相等, 那么就说明找到了
					if(id === newId){
						return list;
					}
					//继续查找有没有下级
					var newList = list[i][this.childrenkey];
					if(newList != null && newList.length > 0){
						var resultList = this.findListItem(id, newList);
						if(resultList != undefined && resultList.length > 0){
							return resultList;
						}
					}
				}
			},
			//禁止父级窗口滚动
			disabledScroll(){
				return;
			}
		},
		watch:{
		  //监听传入的 initList 的值, 如果发生变化了
		  initList: {
			deep:true,
			handler(newVal,oldVal) {
				if(newVal.length > 0){
					this.showList = newVal;
					this.queryList = newVal;
				}
			}
		  }
		}
	}
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}
.mask {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 900;//不能设置1000, 不然toast被遮住了
	background-color: $uni-bg-color-mask;
	.content {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: #FFFFFF;
		.title {
			position: relative;
			text-align: center;
			border-bottom: 1px solid $uni-border-color;
			line-height: 80rpx;
			font-weight: bold;
			.off {
				position:absolute;
				left: 10rpx;
				top: 10rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 25rpx;
				font-weight: normal;
			}
			.ok {
				position:absolute;
				right: 10rpx;
				top: 10rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 25rpx;
				font-weight: normal;
			}
		}
		.select-box {
			display: flex;
			height: 90rpx;
			padding-left: 30rpx;
			border-bottom: 1px solid $uni-border-color;
			.select-item {
				height: 40rpx;
				line-height: 40rpx;
				padding: 10rpx;
				padding-left: 15rpx;
				padding-right: 15rpx;
				border: 1px solid $uni-border-color;
				border-radius: 10rpx;
				margin-right: 10rpx;
				margin-top: 15rpx;
			}
		}
		.query-box {
			height: 90rpx;
			line-height: 90rpx;
			height: 100%;
			.query-item {
				padding-left: 30rpx;
				border-bottom: 1px solid $uni-border-color;
			}
			.scroll-Y{
				height: 800rpx;
			}
		}
	}
}
</style>
