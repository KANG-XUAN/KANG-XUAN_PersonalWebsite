<template>

	<!-- 黑夜遮罩層 -->
	<canvas ref="maskCanvas" class="dark-overlay" />


	<!-- 螢火蟲容器 -->
	<div ref="firefliesContainerRef" class="fireflies-container">

		<div v-for="(firefly, index) in fireflies" :key="index" class="firefly" :style="{
			top: firefly.y + 'px',
			left: firefly.x + 'px'
		}"></div>

	</div>

</template>


<script setup>

import {
	ref,
	onMounted,
	onBeforeUnmount
} from 'vue'



/*
 * ============================================================
 * 滑鼠位置
 * ============================================================
 */

const mouseX = ref(
	window.innerWidth / 2
)

const mouseY = ref(
	window.innerHeight / 2
)



/*
 * ============================================================
 * DOM
 * ============================================================
 */

const firefliesContainerRef =
	ref(null)

const maskCanvas =
	ref(null)



/*
 * ============================================================
 * 動畫
 * ============================================================
 */

let animationId = null



/*
 * ============================================================
 * 螢火蟲尺寸倍率
 *
 * 以 1920px 寬度作為基準
 *
 * 1366px → 0.8x
 * 1920px → 1x
 * 2560px → 1.33x
 * 3840px → 2x
 *
 * 最小 0.8
 * 最大 2
 * ============================================================
 */

let scale = 1



function updateScale() {

	const baseWidth = 1920

	scale =
		Math.min(
			2,
			Math.max(
				0.8,
				window.innerWidth / baseWidth
			)
		)

}



/*
 * ============================================================
 * 螢火蟲資料
 * ============================================================
 */

const fireflies = ref([])



/*
 * ============================================================
 * 螢火蟲數量
 *
 * 根據生日計算年齡
 * ============================================================
 */

const birth =
	new Date('2001-03-20')


const now =
	new Date()


const age =
	now.getFullYear()
	-
	birth.getFullYear()
	-
	(
		now <
		new Date(
			now.getFullYear(),
			2,
			20
		)
	)


const fireflyCount = age



/*
 * ============================================================
 * 建立螢火蟲
 * ============================================================
 */

function createFireflies() {

	const container =
		firefliesContainerRef.value


	if (!container)
		return


	const rect =
		container.getBoundingClientRect()


	fireflies.value =
		Array.from({
			length: fireflyCount
		})
			.map(() => ({

				x:
					Math.random()
					*
					rect.width,


				y:
					Math.random()
					*
					rect.height,


				vx: 0,

				vy: 0,


				targetX:
					Math.random()
					*
					rect.width,


				targetY:
					Math.random()
					*
					rect.height

			}))

}



/*
 * ============================================================
 * Canvas 尺寸
 *
 * resize 時：
 * 1. 更新 Canvas
 * 2. 更新 scale
 * ============================================================
 */

function resizeCanvas() {

	const canvas =
		maskCanvas.value


	if (!canvas)
		return


	/*
	 * 更新 Canvas 尺寸
	 */

	canvas.width =
		window.innerWidth

	canvas.height =
		window.innerHeight


	/*
	 * 更新尺寸倍率
	 */

	updateScale()

}



/*
 * ============================================================
 * 更新黑霧與破口
 * ============================================================
 */

let ctx = null

function updateMask() {

	const canvas =
		maskCanvas.value

	const container =
		firefliesContainerRef.value


	if (!canvas || !container || !ctx)
		return


	ctx.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	)


	ctx.fillStyle =
		'rgba(0,0,0,0.75)'


	ctx.fillRect(
		0,
		0,
		canvas.width,
		canvas.height
	)


	ctx.globalCompositeOperation =
		'destination-out'


	/*
	 * 滑鼠手電筒
	 */

	const mouseRadius =
		120 * scale


	drawHole(
		ctx,
		mouseX.value,
		mouseY.value,
		mouseRadius
	)


	/*
	 * 螢火蟲光圈
	 */

	const rect =
		container.getBoundingClientRect()


	const fireflyRadius =
		75 * scale


	fireflies.value.forEach(f => {

		const x =
			rect.left + f.x


		const y =
			rect.top + f.y


		drawHole(
			ctx,
			x,
			y,
			fireflyRadius
		)

	})


	ctx.globalCompositeOperation =
		'source-over'

}



/*
 * ============================================================
 * 畫圓形破口
 * ============================================================
 */

function drawHole(
	ctx,
	x,
	y,
	radius
) {

	const gradient =
		ctx.createRadialGradient(
			x,
			y,
			0,
			x,
			y,
			radius
		)


	/*
	 * 中心
	 */

	gradient.addColorStop(
		0,
		'rgba(0,0,0,1)'
	)


	/*
	 * 中間
	 */

	gradient.addColorStop(
		0.45,
		'rgba(0,0,0,0.95)'
	)


	/*
	 * 外圍
	 */

	gradient.addColorStop(
		0.8,
		'rgba(0,0,0,0.35)'
	)


	/*
	 * 最外層
	 */

	gradient.addColorStop(
		1,
		'rgba(0,0,0,0)'
	)


	ctx.fillStyle =
		gradient


	ctx.beginPath()


	ctx.arc(
		x,
		y,
		radius,
		0,
		Math.PI * 2
	)


	ctx.fill()

}



/*
 * ============================================================
 * 螢火蟲動畫
 * ============================================================
 */

function animateFireflies() {

	const container =
		firefliesContainerRef.value


	if (!container)
		return


	const rect =
		container.getBoundingClientRect()


	fireflies.value.forEach(f => {

		/*
		 * ----------------------------------------------------
		 * 目標位置
		 * ----------------------------------------------------
		 */

		const dx =
			f.targetX - f.x


		const dy =
			f.targetY - f.y


		const distance =
			Math.hypot(
				dx,
				dy
			)


		/*
		 * ----------------------------------------------------
		 * 移動方向
		 * ----------------------------------------------------
		 */

		const angle =
			Math.atan2(
				dy,
				dx
			)


		/*
		 * ----------------------------------------------------
		 * 螢火蟲速度
		 *
		 * 這裡不跟 scale 綁定
		 *
		 * 避免桌機螢幕變大後
		 * 螢火蟲飛太快
		 * ----------------------------------------------------
		 */

		const speed =
			0.3


		const turn =
			0.02


		/*
		 * ----------------------------------------------------
		 * 目標速度
		 * ----------------------------------------------------
		 */

		const desiredVx =
			Math.cos(angle)
			*
			speed


		const desiredVy =
			Math.sin(angle)
			*
			speed


		/*
		 * ----------------------------------------------------
		 * 平滑轉向
		 * ----------------------------------------------------
		 */

		f.vx +=
			(
				desiredVx
				-
				f.vx
			)
			*
			turn


		f.vy +=
			(
				desiredVy
				-
				f.vy
			)
			*
			turn


		/*
		 * ----------------------------------------------------
		 * 更新位置
		 * ----------------------------------------------------
		 */

		f.x += f.vx

		f.y += f.vy


		/*
		 * ----------------------------------------------------
		 * 接近目標後
		 * 重新尋找目標
		 * ----------------------------------------------------
		 */

		if (distance < 30) {

			f.targetX =
				Math.random()
				*
				rect.width


			f.targetY =
				Math.random()
				*
				rect.height

		}

	})


	/*
	 * 更新 Canvas
	 */

	updateMask()


	/*
	 * 下一幀
	 */

	animationId =
		requestAnimationFrame(
			animateFireflies
		)

}



/*
 * ============================================================
 * 滑鼠移動
 * ============================================================
 */

function handleMouseMove(e) {

	mouseX.value =
		e.clientX


	mouseY.value =
		e.clientY


	/*
	 * 滑鼠移動時立即更新手電筒
	 */

	// updateMask()

}



/*
 * ============================================================
 * 啟動
 * ============================================================
 */

onMounted(() => {

	const canvas =
		maskCanvas.value

	if (canvas) {

		ctx =
			canvas.getContext('2d')

	}

	/*
	 * 先設定 Canvas 尺寸
	 * 同時更新 scale
	 */

	resizeCanvas()


	/*
	 * 建立螢火蟲
	 */

	createFireflies()


	/*
	 * 滑鼠
	 */

	window.addEventListener(
		'mousemove',
		handleMouseMove
	)


	/*
	 * 視窗尺寸改變
	 */

	window.addEventListener(
		'resize',
		resizeCanvas
	)


	/*
	 * 開始動畫
	 */

	animateFireflies()

})



/*
 * ============================================================
 * 清理
 * ============================================================
 */

onBeforeUnmount(() => {

	window.removeEventListener(
		'mousemove',
		handleMouseMove
	)


	window.removeEventListener(
		'resize',
		resizeCanvas
	)


	cancelAnimationFrame(
		animationId
	)

})

</script>



<style scoped>
/*
 * ============================================================
 * 黑夜遮罩
 * ============================================================
 */

.dark-overlay {

	position: absolute;

	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	pointer-events: none;

	cursor: none;

	z-index: 1;

}



/*
 * ============================================================
 * 螢火蟲容器
 * ============================================================
 */

.fireflies-container {

	position: absolute;

	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	overflow: hidden;

	pointer-events: none;

	z-index: 2;

}



/*
 * ============================================================
 * 螢火蟲
 *
 * 使用 vw 讓 CSS 尺寸
 * 隨 viewport 自動縮放
 * ============================================================
 */

.firefly {

	/*
     * 螢火蟲本體
     *
     * 最小：6px
     * 理想：0.42vw
     * 最大：16px
     */

	--firefly-size:
		clamp(6px,
			0.42vw,
			16px);


	/*
     * 第一層光暈
     */

	--glow-small:
		clamp(7px,
			0.52vw,
			20px);


	/*
     * 第二層光暈
     */

	--glow-large:
		clamp(18px,
			1.3vw,
			50px);


	position: absolute;


	width:
		var(--firefly-size);


	height:
		var(--firefly-size);


	transform:
		translate(-50%,
			-50%);


	background-color:
		#fff9c4;


	border-radius:
		50%;


	opacity:
		0.8;


	/*
     * 螢火蟲自身光暈
     */

	box-shadow:

		0 0 var(--glow-small) 3px rgba(255,
			255,
			200,
			0.5),

		0 0 var(--glow-large) 10px rgba(255,
			240,
			120,
			0.15);


	/*
     * 閃爍
     */

	animation:
		flicker 2s infinite ease-in-out;

}



/*
 * ============================================================
 * 螢火蟲閃爍
 * ============================================================
 */

@keyframes flicker {

	0%,
	100% {

		opacity:
			0.6;

	}


	50% {

		opacity:
			1;

	}

}
</style>
