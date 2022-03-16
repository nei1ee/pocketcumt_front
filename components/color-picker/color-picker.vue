<template>
	<view class="" id="pick_color">
		<view class="pick_area">
			<view class="left_color"  @touchstart="changeColor" @touchmove="changeColor" :style="[{'background-color':areaColor},{'width':`${areaWidth}px`},{'height':`${areaWidth}px`}]">
				<view class="pick_dot" :style="[{top:`${areaTop}px`},{left:`${areaLeft}px`}]"></view>
			</view>
			<view class="right_hsl" @touchstart="changeHue" @touchmove="changeHue" :style="[{'width':`${rightWidth}px`},{'height':`${areaWidth}px`}]">
				<view class="pick_btn" :style="[{top:`${btnTop}px`},{'width':`${btnWidth}px`}]"></view>
			</view>
		</view>
<!-- 		<view class="pre_view">
			<view class="show" :style="{'background-color':showColor}"></view>
			<view class="">{{showColorText}}</view>
		</view> -->
	</view>
</template>

<script>
	import {hsv2rgb,rgb2hsv,rgb2Hex} from "./hsl.js"
	export default {
		data() {
			return {
				position:{
					top:0,
					left:0,
					scrollTop:0,
					scrollLeft:0
				},
				btnTop:-5,
				rightWidth:40,
				btnWidth:50,
				areaWidth:300,
				areaColor:"rgb(255,0,0)",
				areaLeft:290,
				areaTop:0,
				areaColorRgb:{
					r:255,
					g:0,
					b:0
				},
				showColor:"#ff0000",
				showColorText:""
			};
		},
		mounted() {
			let that = this;
			this.rightWidth = this.unitWidth;
			this.btnWidth = this.unitWidth + 10;
			this.areaWidth = this.unitWidth * 7 + 20;
			this.areaLeft = this.areaWidth - 10;
			const n = uni.createSelectorQuery().in(this)
			n.select("#pick_color").boundingClientRect()
			n.selectViewport().scrollOffset()
			n.exec(function(nodes){
				that.position = {
					top:nodes[0].top,
					left:nodes[0].left,
					scrollTop:nodes[1].scrollTop,
					scrollLeft:nodes[1].scrollLeft
				}
			})
		},
		props:{
			unitWidth:{
				type:Number,
				required:true,
				default:40,
			}
		},
		methods:{
			changeHue(e){
				let btnTop = e.changedTouches[0].clientY - this.position.top - this.position.scrollTop ;
				this.btnTop = btnTop -5 < -5 ? -5 :btnTop > this.areaWidth - 5 ? this.areaWidth - 5: btnTop -5;
				let h = (this.btnTop + 5) / (this.areaWidth)*360;
				let rgb =hsv2rgb(h,1,1)
				this.showColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
				this.areaColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
				this.showColorText = rgb2Hex(rgb.r,rgb.g,rgb.b)
				this.areaTop = 0;
				this.areaLeft = this.areaWidth - 10;
				this.areaColorRgb = rgb;
				this.changeParent({rgb,hex:rgb2Hex(rgb.r,rgb.g,rgb.b),hsv:{h:h,s:1,v:1}})
			},
			changeColor(e){
				let areaLeft = e.changedTouches[0].clientX - this.position.left - this.position.scrollLeft ;
				let areaTop = e.changedTouches[0].clientY - this.position.top - this.position.scrollTop ;
				this.areaLeft = areaLeft < 0 ? 0 : areaLeft > this.areaWidth -10 ? this.areaWidth - 10 : areaLeft -5;
				this.areaTop = areaTop < 0 ? 0 : areaTop > this.areaWidth -10 ? this.areaWidth - 10 : areaTop -5;
				let s = areaLeft / this.areaWidth
				let l = (this.areaWidth - areaTop) / this.areaWidth
				let hsv = rgb2hsv(this.areaColorRgb.r,this.areaColorRgb.g,this.areaColorRgb.b)
				let rgb =hsv2rgb(hsv.h,s,l)
				this.showColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
				this.showColorText = rgb2Hex(rgb.r,rgb.g,rgb.b)
				this.changeParent({rgb,hex:rgb2Hex(rgb.r,rgb.g,rgb.b),hsv:{h:hsv.h,s:s,v:l}})
			},
			changeParent(r){
				// console.log(r)
				this.$emit("callBack",r)
			}
		}
	}
</script>

<style lang="scss">
	.pre_view{
		width: 100%;
		height: 50px;
		.show{
			height: 50px;
			width: 50px;
			margin:  0 auto;
		}
	}
	.pick_area{
		display: flex;
		justify-content: space-between;
		.right_hsl{
			background-image: linear-gradient(top,#ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 67%,#ff00ff 83%,#ff0000 100%);
			position: relative;
			.pick_btn{
				position: absolute;
				height: 10px;
				border-radius: 5px;
				background-color: rgba(255,255,255,.5);
				left: -5px;
				box-sizing: border-box;
				border: 1px solid #999;
			}
		}
		.left_color{
			position: relative;
			transition: 0.2s;
			&:before{
				content:"";
				position: absolute;
				z-index: 3;
				width: 100%;
				height: 100%;
				top:0;
				left: 0;
				background-image: linear-gradient(left,rgba(255,255,255,1),rgba(0,0,0,0));
			}
			&:after{
				content:"";
				position: absolute;
				z-index: 6;
				width: 100%;
				height: 100%;
				top:0;
				left: 0;
				background-image: linear-gradient(bottom,rgba(0,0,0,1),rgba(0,0,0,0));
			}
			.pick_dot{
				position: absolute;
				width: 10px;
				height: 10px;
				border-radius: 5px;
				background-color: #fff;
				box-sizing: border-box;
				border: 1px solid #999;
				z-index: 9;
				// transform: translate(-50%,-50%);
			}
		}
	}
</style>
