<template>
	<section id="step3" class="step-section">
		<!-- 右上區塊 -->
		<div class="areaTitle">
			<h1>你，喜歡歌嗎？</h1>
			<h5>　　有時候—一首歌就說了一段故事、一語感悟</h5>
		</div>

		<!-- 左下區塊 -->
		<div class="areaContent">
			<div :class="{ show: articleVisible }" class="welcomeSolid"></div>
			<p :class="{ show: articleVisible }" class="welcomeMessage" v-html="article.text"></p>
			<span :class="{ show: articleVisible }" class="welcomeMessage" v-html="article.author"></span>
		</div>

		<!-- 純動畫區塊 -->
		<!-- 燭光 -->
		<div class="candle-glow"></div>
		<!-- 葉落 -->
		<leaves />
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import leaves from './anime/leaves.vue'

const articleVisible = ref(false)
const article = ref({ title: '', message: '' })

const articles = [
	{ text: "情不敢至深　恐大夢一場<br>卦不敢算盡　畏天道無常", author: "荀夜羽《晴雪夜》" },
	{ text: "西北有蟬　名曰無夢<br>終南有墳　名曰不老", author: "？？？《？？？》" },
	// 來源歌詞
	{ text: "一十七畫盡相思　書做無緣只兩字<br>一十九筆結心意　有緣相聚莫別離", author: "歌詞《殺陣》" },
	{ text: "不見江瀾　且問青山　飄飲擺川　只燈照晚<br>不見悲歡　且撫琴帆　敗樓聽蟬　和音頌喃", author: "歌詞《小僧無名》" },
	{ text: "見老婦雪髮萬千落<br>雙手合　不見濁<br>青絲化語與那孺子說", author: "歌詞《小僧無名》" },
	{ text: "朔風淒　更漏迢遞　素手嗅白梨<br>庭水西　錦書難寄　羅線作舊衣<br>流鏨筆　字字誅心　遲語無歸期", author: "歌詞《長安不問》" },
	{ text: "不淡不深　不棄不珍　不寒不暖　不欺不問<br>不思不忘　不聚不分　不留不捨　不憐不認", author: "歌詞《皎然記》" },
]

function getRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function updateWelcome() {
	articleVisible.value = false
	setTimeout(() => {
		article.value = getRandom(articles)
		articleVisible.value = true
	}, 50)
}

onMounted(() => {
	updateWelcome();
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
			rgba(0, 0, 0, 0.7) 100%),
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

/* 右側區塊 */
.areaTitle {
	position: relative;
	transform: translate(-150px, 40px);
	z-index: 100;

	* {
		margin: 0;
	}
}

/* 左側區塊 */
.areaContent {
	position: relative;
	height: 400px;
	font-size: 16px;
	transform: translate(-800px, 90px);
	z-index: 100;
}

/* 文字大小跟動畫 */
.welcomeTitle {
	/* font-size: 27px; */
	margin: 0 0 0 0;
	opacity: 0;
	transition: opacity 1s ease;
}

.welcomeSolid {
	margin: 10px auto;
	height: 2px;
	width: 70%;
	background-color: white;
	opacity: 0;
	transition: opacity 1s ease;
}

.welcomeMessage {
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
	left: 66.66%;
	/* 右三分之一 */
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
			rgba(0, 0, 0, 0) 100%);

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
</style>
