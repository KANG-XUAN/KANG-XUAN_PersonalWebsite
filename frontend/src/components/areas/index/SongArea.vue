<template>
	<section id="step3" class="step-section">
		<!-- 右側區塊 -->
		<div class="areaTitle">
			<h1>你，喜歡歌嗎？</h1>
			<h6>　　　　　　—有時候．一首歌就說了一段故事、一語感悟</h6>
		</div>

		<!-- 左側區塊 -->
		<span class="sectionStar">
			終南有墳　名曰不老<br>　 西北有蟬　名曰無夢
		</span>

		<div class="areaContent">

			<div class="article" :key="articleKey" @click="toggleArticle">
				<!-- <div :class="{ show: articleVisible }" class="articleSolid"></div> -->
				<p :class="{ show: articleVisible }" class="articleText" v-html="article.text"></p>
				<span :class="{ show: articleVisible }" class="articleFrom">
					<span v-html="article.from"></span>
				</span>

				<svg class="svg-mouse" :class="{ show: articleVisible }" width="16" height="24" viewBox="0 0 40 60"
					xmlns="http://www.w3.org/2000/svg">
					<!-- 滑鼠本體（直立橢圓） -->
					<ellipse cx="20" cy="30" rx="15" ry="25" stroke="white" fill="none" stroke-width="2" />

					<!-- 左右按鍵分隔線 -->
					<line x1="5" y1="21.7" x2="35" y2="21.7" stroke="white" stroke-width="2" />

					<!-- 滾輪或中鍵線 -->
					<line x1="20" y1="21.7" x2="20" y2="5" stroke="white" stroke-width="2" />
				</svg>
			</div>
		</div>


		<!-- 純動畫區塊 -->
		<!-- 燭光 -->
		<div class="candle-glow"></div>
		<!-- 葉落 -->
		<leaves />
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import leaves from './anime/leaves.vue'

const articleVisible = ref(false)
const article = ref({ title: '', message: '' })
const isSwitching = ref(false); // 是否正在切換文章
const isFirstLoad = ref(true)
const articleKey = ref(0)

const articles = [
	{ text: "情不敢至深　恐大夢一場<br>卦不敢算盡　畏天道無常", from: "荀夜羽《晴雪夜》" },
	{ text: "一十七畫盡相思　書做無緣只兩字<br>一十九筆結心意　有緣相聚莫別離", from: "歌詞《殺陣》" },
	{ text: "不見江瀾　且問青山　飄飲擺川　只燈照晚<br>不見悲歡　且撫琴帆　敗樓聽蟬　和音頌喃", from: "歌詞《小僧無名》" },
	{ text: "見老婦雪髮萬千落<br>雙手合　不見濁<br>青絲化語與那孺子說", from: "歌詞《小僧無名》" },
	{ text: "朔風淒　更漏迢遞　素手嗅白梨<br>庭水西　錦書難寄　羅線作舊衣<br>流鏨筆　字字誅心　遲語無歸期", from: "歌詞《長安不問》" },
	{ text: "不淡不深　不棄不珍　不寒不暖　不欺不問<br>不思不忘　不聚不分　不留不捨　不憐不認", from: "歌詞《皎然記》" },
	{ text: "人聲之外明月左右　河漢淺淺星辰清秀<br>二十年寫一段風流　美人尚小英雄年幼", from: "歌詞《永定四十年》" },
	{ text: "拈花時一息悸動<br>垂眸後無動於衷<br>鬢邊逝去的朝暮枯榮", from: "歌詞《清醒夢》" },
]

function getRandomDifferent(arr, current) {
	let randomArticle;

	// 如果 current 是 null 或 undefined，直接返回隨機文章
	if (!current) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// 隨機選擇文章，直到選到不同的
	do {
		randomArticle = arr[Math.floor(Math.random() * arr.length)];
	} while (randomArticle.text === current.text && randomArticle.from === current.from); // 比較內容

	return randomArticle;
}

function updateArticle() {
	if (isSwitching.value) return
	isSwitching.value = true

	articleVisible.value = false

	setTimeout(() => {
		// 換內容
		article.value = getRandomDifferent(articles, article.value)

		// 改變 key 強制 DOM 重新渲染
		articleKey.value++

		// 淡入動畫觸發
		setTimeout(() => {
			articleVisible.value = true
			isFirstLoad.value = false
			isSwitching.value = false
		}, 20)
	}, 100)
}

// 切換文章
function toggleArticle() {
	if (isFirstLoad.value || isSwitching.value) return; // 初次載入不觸發切換

	isSwitching.value = true
	articleVisible.value = false

	setTimeout(() => {
		article.value = getRandomDifferent(articles, article.value)
		articleVisible.value = true

		setTimeout(() => {
			isSwitching.value = false
		}, 1200)
	}, 1200)
}

// ✅ 使用 IntersectionObserver 監聽 step3 是否進入畫面
let observer = null

onMounted(() => {
	const step3 = document.querySelector('#step3')
	if (step3) {
		observer = new IntersectionObserver((entries) => {
			const entry = entries[0]
			if (entry.isIntersecting) {
				updateArticle()
			}
		}, {
			threshold: 0.01, // 進入畫面時觸發
		})
		observer.observe(step3)
	}
})

onUnmounted(() => {
	if (observer) observer.disconnect()
})
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
			rgba(9, 230, 9, 0) 0%,
			rgba(0, 0, 0, 0.1) 35%,
			rgba(0, 0, 0, 0.3) 70%,
			rgba(0, 0, 0, 0.6) 100%),
		/* 中心_向內圓形漸層 */
		/* radial-gradient(circle, rgba(255, 255, 255, 0) 40%, rgb(0, 0, 0) 100%), */
		/* 背景圖片 */
		url('@/assets/images/Step1_background.webp'), url('@/assets/images/Step1_background.jpg');
	background-size: cover;
	background-position: center;

	font-size: 2rem;
	color: white;

	/* 中文直書排列 */
	writing-mode: vertical-rl;
	text-orientation: upright;

	overflow: hidden;
}

.article {
	cursor: pointer;
	/* 設置為可點擊 */
}

/* 標題區塊 */
.areaTitle {
	position: relative;
	/* transform: translate(-150px, 40px); */
	transform: translate(-180%, 5%);
	z-index: 100;

	* {
		margin: 0;
	}

	h1 {
		font-size: 2.9vw;
	}

	h6 {
		font-size: 1.3vw;
	}
}

/* 內容區塊(上方) */
.sectionStar {
	position: absolute;
	/* top: 150px;
	left: 150px; */
	top: 20%;
	left: 10%;
	/* transform: translate(-130%, 40%); */

	font-family: '王翰宗中行書';
	/* font-size: 48px; */
	font-size: clamp(20px, 3.6vw, 72px);
	/* ✅ 新增以下來還原為橫式文字排列 */
	writing-mode: horizontal-tb;
	text-orientation: initial;

	/* border: red solid 1px; */
}

.svg-mouse {
	display: block;
	margin: 16px auto 0 auto;
	width: 16px;
	height: 24px;
	opacity: 0;
	transition: opacity 1.2s ease-in-out;
	animation: none;
	/* 不執行動畫 */
}

/* 只有 .show 狀態才啟用動畫 + 顯示 */
.svg-mouse.show {
	opacity: 0.05;
	animation: fadeInOut 2.5s ease-in-out infinite;
	animation-delay: 0.5s;
}

/* 定義動畫關鍵影格 */
@keyframes fadeInOut {
	0% {
		opacity: 0.05;
	}

	50% {
		opacity: 0.3;
	}

	100% {
		opacity: 0.1;
	}
}

/* 內容區塊 */
.areaContent {
	position: relative;
	width: 40%;
	height: 40%;
	display: flex;
	justify-content: center;
	align-items: center;
	/* 垂直和水平居中 */

	top: 55%;
	left: -46%;
	/* transform: translate(-800px, 270px); */
	/* z-index: 100; */

	/* ✅ 新增以下來還原為橫式文字排列 */
	writing-mode: horizontal-tb;
	text-orientation: initial;

	/* border: red solid 1px; */
}

.articleText {
	/* font-size: 20px; */
	font-size: clamp(10px, 1.3vw, 50px);
	text-align: justify;
	margin: 0 auto;
	padding-left: 6px;
	width: 100%;
	opacity: 0;
	transition: opacity 1s ease;
	position: relative;
}

.articleText::before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 2px;
	/* 垂直線的寬度 */
	background-color: white;
	opacity: 0.6;
}

.articleFrom {
	position: relative;
	display: block;
	text-align: right;
	font-size: 16px;
	opacity: 0;
	transition: opacity 1s ease;
	/* ❌ 不要 padding 或 margin 干擾對齊 */
}

.articleFrom::before {
	content: '';
	display: inline-block;
	vertical-align: middle;
	width: 18px;
	/* 線的長度 */
	height: 1px;
	background-color: white;
	opacity: 0.6;
	margin-right: 6px;
	/* 線和文字的距離 */
}

/* 文章區塊顯示/隱藏動畫 */
.articleText,
.articleFrom {
	opacity: 0;
	transition: opacity 1.2s ease-in-out;
	/* 調整為更慢的過渡 */
}

/* 顯示時淡入動畫 */
.articleText.show,
.articleFrom.show {
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
