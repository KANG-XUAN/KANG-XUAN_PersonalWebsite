<template>
	<section id="step3" class="step-section">
		<!-- 右上區塊 -->
		<div class="right-top-block">
			<h1>歡迎來到我的網站</h1>
		</div>

		<!-- 左下區塊 -->
		<div class="left-bottom-block">
			<h2 :class="{ show: welcomeVisible }" class="welcomeTitle">{{ welcome.title }}</h2>
			<div :class="{ show: welcomeVisible }" class="welcomeSolid"></div>
			<span :class="{ show: welcomeVisible }" class="welcomeMessage">{{ welcome.message }}</span>
		</div>

		<!-- 純動畫區塊 -->
		<!-- 燭光 -->
		<div class="candle-glow"></div>
		<!-- 葉落 -->
		<!-- 葉落容器 -->
		<div class="leaves-container">
			<div v-for="leaf in leaves" :key="leaf.id" class="leaf" :style="{
				left: (leaf.x + leaf.amplitude * Math.sin(leaf.angle)) + 'px',
				top: leaf.y + 'px',
				transform: 'rotate(' + (leaf.angle * 180 / Math.PI) + 'deg)'
			}">
				<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
					<path :d="leafPaths[leaf.svgIndex]" :fill="leaf.color" />
				</svg>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const welcomeVisible = ref(false)
const welcome = ref({ title: '', message: '' })

const welcomes = [
	{
		title: "歡迎",
		message:
			"人不會發光，不過我們每個人手裡都有一個從先人那裡繼承到的火炬，這可以照亮黑夜的火炬叫做人生。我們把自己的經驗和記憶放入其中，充當燃料，人生就會升騰起火焰，我們便能高舉著它在黑夜中前行。",
	},
	{
		title: "歡迎",
		message:
			"奇蹟，一直存在，生命本身就是奇蹟。在無數黑夜和死寂當中，每個人都是自己的奇蹟。",
	},
]

function getRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function updateWelcome() {
	welcomeVisible.value = false
	setTimeout(() => {
		welcome.value = getRandom(welcomes)
		welcomeVisible.value = true
	}, 50)
}


// 動畫-葉落

const leaves = ref([]);

const leafPaths = [
	// 原始的
	"M5 10 Q15 0 25 15 Q20 30 10 35 Q2 25 5 10 Z",// 深葉型
	"M5 5 Q15 10 20 20 Q10 35 0 25 Q5 15 5 5 Z", // 不規則型
	"M4 12 Q12 0 22 10 Q28 22 18 34 Q8 38 2 28 Q0 20 4 12 Z",      // 長彎葉
	"M6 8 Q16 2 26 16 Q20 28 12 32 Q4 28 3 20 Q2 14 6 8 Z",         // 左偏葉
	"M3 9 Q14 -1 24 13 Q19 29 11 33 Q3 27 1 18 Q1 13 3 9 Z",        // 鋸齒邊感
	"M5 6 Q17 5 23 17 Q15 30 6 33 Q2 26 3 18 Q3 11 5 6 Z",          // 比較寬厚葉
	"M7 7 Q17 4 21 14 Q22 25 12 30 Q2 26 5 18 Q5 12 7 7 Z",         // 右偏中空葉
	"M4 6 Q16 3 20 13 Q22 26 14 32 Q5 29 3 20 Q1 13 4 6 Z",         // 反向弧度
	"M6 9 Q14 4 22 14 Q20 24 13 30 Q5 27 4 18 Q4 13 6 9 Z",         // 扭曲型
	"M4 8 Q14 2 24 12 Q22 26 12 32 Q3 26 2 16 Q2 12 4 8 Z",         // 彎曲中長葉
]

function getRandomColor() {
	const base = 6
	const r = 0
	const g = Math.floor(base + Math.random() * 20)
	const b = Math.floor(base + Math.random() * 20)
	return `rgb(${r}, ${g}, ${b})`
}

function generateLeaves(count = 24) {
	const screenWidth = window.innerWidth
	const newLeaves = []

	for (let i = 0; i < count; i++) {
		newLeaves.push({
			id: i,
			x: Math.random() * screenWidth,
			y: 0,
			speedY: 1 + Math.random() * 2,
			amplitude: 10 + Math.random() * 20,
			angle: Math.random() * 2 * Math.PI,
			angleSpeed: 0.01 + Math.random() * 0.02,
			svgIndex: Math.floor(Math.random() * leafPaths.length),
			rotateDirection: Math.random() > 0.5 ? 1 : -1,
			color: getRandomColor(),
		})
	}

	leaves.value = newLeaves
}

let animationId;
function animateLeaves() {
	const screenHeight = window.innerHeight

	leaves.value.forEach((leaf) => {
		leaf.y += leaf.speedY
		if (leaf.y > screenHeight) {
			leaf.y = 0
			leaf.x = Math.random() * window.innerWidth
		}
		leaf.angle += leaf.angleSpeed * leaf.rotateDirection
	})

	animationId = requestAnimationFrame(animateLeaves)
}


onMounted(() => {
	updateWelcome();
	generateLeaves();
	animateLeaves();
});

onBeforeUnmount(() => {
	cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.step-section {
	position: relative;
	height: 100vh;
	width: 100%;

	background-image:
		/* 頂部_向下線性漸層 */
		linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 30%),
		/* 新增 ➕ 右側三分之一圓心的陰影 */
		radial-gradient(ellipse 300px 100% at 68% center,
			rgba(9, 230, 9, 0) 20%,
			rgba(0, 0, 0, 0.7) 100%
			),
		/* 中心_向內圓形漸層 */
		/* radial-gradient(circle, rgba(255, 255, 255, 0) 40%, rgb(0, 0, 0) 100%), */
		/* 背景圖片 */
		url('@/assets/images/Step1_background.png');
	background-size: cover;
	background-position: center;

	font-size: 2rem;
	color: white;
	writing-mode: vertical-rl;
	text-orientation: upright;

	overflow: hidden;
}

/* 右上區塊 */
.right-top-block {
	position: relative;
	transform: translate(-150px, 40px);
	z-index: 100;
}

/* 左下區塊 */
.left-bottom-block {
	position: relative;
	height: 400px;
	font-size: 16px;
	transform: translate(-800px, 90px);
	z-index: 100;
}

/* 文字大小跟動畫 */
.right-top-block .welcomeTitle {
	font-size: 27px;
	margin: 0 0 10px 0;
	opacity: 0;
	transition: opacity 1s ease;
}

.right-top-block .welcomeSolid {
	margin: 10px auto;
	height: 2px;
	width: 70%;
	background-color: white;
	opacity: 0;
	transition: opacity 1s ease;
}

.right-top-block .welcomeMessage {
	font-size: 20px;
	text-align: justify;
	margin: 0 auto;
	width: 100%;
	opacity: 0;
	transition: opacity 1s ease;
}

.show {
	opacity: 1;
}




/* 燭火 */
/* 蠟燭光暈效果 - 帶風吹感與透明中心 */
.candle-glow {
	position: absolute;
	top: 50%;
	left: 66.66%; /* 右三分之一 */
	transform: translate(-50%, -50%);
	width: 200px;
	height: 600px;
	border-radius: 50% / 60%;
	pointer-events: none;

	background: radial-gradient(ellipse at center,
		rgba(0, 0, 0, 0) 0%,
		rgba(255, 180, 80, 0.2) 15%,
		rgba(255, 140, 40, 0.4) 40%,
		rgba(120, 60, 10, 0.2) 70%,
		rgba(0, 0, 0, 0) 100%
	);

	animation: candleFlicker 3s infinite ease-in-out;
	opacity: 0.6;
	filter: blur(8px);

	mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 100%);

	z-index: 0;
}

/* 閃爍＋微風吹動效果 */
@keyframes candleFlicker {
	0% {
		transform: translate(-50%, -50%) rotate(0deg) scale(1);
		opacity: 0.6;
	}
	15% {
		transform: translate(-50%, -50%) rotate(1deg) scale(1.04);
		opacity: 0.7;
	}
	30% {
		transform: translate(-50%, -50%) rotate(-1deg) scale(0.96);
		opacity: 0.5;
	}
	45% {
		transform: translate(-50%, -50%) rotate(1.5deg) scale(1.03);
		opacity: 0.75;
	}
	60% {
		transform: translate(-50%, -50%) rotate(-0.5deg) scale(0.98);
		opacity: 0.55;
	}
	75% {
		transform: translate(-50%, -50%) rotate(1deg) scale(1.01);
		opacity: 0.6;
	}
	100% {
		transform: translate(-50%, -50%) rotate(0deg) scale(1);
		opacity: 0.6;
	}
}

/* 葉落 */
.leaves-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 1;
}

.leaf {
	position: absolute;
	width: 30px;
	height: 40px;
	user-select: none;
}

.leaf svg {
	width: 30px;
	height: 40px;
	animation: leafFade ease-in-out infinite;
	animation-duration: 5s;
	transform-origin: 50% 50%;
}

@keyframes leafRotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes leafFade {

	0%,
	100% {
		opacity: 0.6;
	}

	50% {
		opacity: 1;
	}
}
</style>
