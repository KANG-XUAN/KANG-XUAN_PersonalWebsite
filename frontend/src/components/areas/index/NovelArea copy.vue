<template>
	<section id="step4" class="step-section">
		<!-- 右側區塊 -->
		<div class="areaTitle">
			<h1>你，喜歡歌嗎？</h1>
			<h5>　　有時候—一首歌就說了一段故事、一語感悟</h5>
		</div>

		<!-- 左側區塊 -->
		<div class="areaContent">
			<div class="article" @click="toggleArticle">
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
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import leaves from './anime/leaves.vue'

const articleVisible = ref(false)
const article = ref({ title: '', message: '' })
const isSwitching = ref(false); // 是否正在切換文章

const articles = [
	// 我会修空调啊《我的治愈游戏》
	{ text: "人不會發光，不過我們每個人手裡都有一個從先人那裡繼承到的火炬，這可以照亮黑夜的火炬叫做人生。我們把自己的經驗和記憶放入其中，充當燃料，人生就會升騰起火焰，我們便能高舉著它在黑夜中前行。", from: "我會修空調《我的治癒遊戲》" },
	{ text: "奇蹟，一直存在，生命本身就是奇蹟。在無數黑夜和死寂當中，每個人都是自己的奇蹟。", from: "我會修空調《我的治癒遊戲》" },
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
	articleVisible.value = false
	setTimeout(() => {
		article.value = getRandomDifferent(articles, null)
		articleVisible.value = true
	}, 50)
}

// 切換文章
function toggleArticle() {
	if (isSwitching.value) return; // 如果正在切換，則不允許再次觸發

	isSwitching.value = true; // 標誌設為 true，開始切換
	articleVisible.value = false;

	// 延遲時間需要和過渡時間匹配，設為1200ms或更長
	setTimeout(() => {
		// 使用改進的 `getRandomDifferent` 方法
		article.value = getRandomDifferent(articles, article.value);
		articleVisible.value = true;

		// 動畫完成後，重置 isSwitching
		setTimeout(() => {
			isSwitching.value = false; // 允許下一次切換
		}, 1200); // 設置與動畫過渡時間一致
	}, 1200); // 延遲時間與動畫時間匹配
}

onMounted(() => {
	updateArticle();
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
		radial-gradient(ellipse 500px 300px at 70% center,
			rgba(9, 230, 9, 0) 0%,
			rgba(0, 0, 0, 0.1) 35%,
			rgba(0, 0, 0, 0.3) 70%,
			rgba(0, 0, 0, 0.6) 100%),
		/* 中心_向內圓形漸層 */
		/* radial-gradient(circle, rgba(255, 255, 255, 0) 40%, rgb(0, 0, 0) 100%), */
		/* 背景圖片 */
		url('@/assets/images/Step4_background.webp'), url('@/assets/images/Step4_background.jpg');
	background-size: cover;
	background-position: bottom;

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

/* 右側區塊 */
.areaTitle {
	position: relative;
	transform: translate(-1250px, 40px);
	z-index: 100;

	* {
		margin: 0;
	}
}

/* 左側區塊 */
.areaContent {
	position: relative;
	width: 400px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* 垂直和水平居中 */

	font-size: 16px;
	transform: translate(-200px, 90px);
	z-index: 100;

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
	animation: none; /* 不執行動畫 */
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

/* .articleSolid {
	margin: 10px auto;
	height: 2px;
	width: 70%;
	background-color: white;
	opacity: 0;
	transition: opacity 1s ease;
} */

.articleText {
	font-size: 20px;
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

</style>
