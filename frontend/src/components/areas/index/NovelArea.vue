<template>
	<section id="step4" class="step-section">
		<!-- 右側區塊 -->
		<div class="areaTitle">
			<span class="word1">文</span>
			<span class="word2">字</span>
			<span class="word3">簡單地</span>
			<span class="word4">勾勒出足以觸及內心的優美字句</span>
		</div>

		<!-- 左側區塊 -->
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
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const articleVisible = ref(false)
const article = ref({ title: '', message: '' })
const isSwitching = ref(false); // 是否正在切換文章
const isFirstLoad = ref(true)
const articleKey = ref(0)

const articles = [
	// 我会修空调啊《我的治愈游戏》
	{ text: "好人變成壞人，會壞得更加徹底。因為他們知道，糖已經不甜了。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "可能這就是愛情吧，鍾情於你，忠誠於你，衷心於你，終止於你。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "人性是開在深淵裡的花，每個人都渴望陽光，但誰又知道你根莖下面藏著什麽?", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "記憶是一種很難形容的東西，像是永遠都不會融化的雪，又像是轉瞬即逝的光，渴望抓住的抓不住，希望忘掉的忘不了。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "表面越冷的人，內心其實可能會越火熱，因為他們生命的熱度被厚厚的冰殼包裹，只有在外殼被擊碎的時候才會流露出自己真實的情感。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "我不否認她愛你，但她對你的愛不應該建立在扼殺你人格的基礎上，愛是相互的，可能會存在某些不平等，但大體上是公平的。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "愛，從遇見那一刻開始，死亡也不會終止，只有當一方選擇離開時才算結束。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "有時候，我感覺這個世界很壞，它總會抓著那些溫柔的人可勁欺負。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "當一個人走到深淵旁邊的時候，只要被輕輕一推，他就可能再也無法回頭。至於推他的，可能是生活中一個不經意的細節，可能是陌生人的一句話，也可能是他自己曾經的記憶。", from: "我會修空調《我有一座恐怖屋》" },
	{ text: "我在地獄裡伸出了手，沒有人來救，直到你出現的那天，我開始擔心自己會把你拖入深淵。", from: "我會修空調《我有一座恐怖屋》" },

	{ text: "人不會發光，不過我們每個人手裡都有一個從先人那裡繼承到的火炬，這可以照亮黑夜的火炬叫做人生。我們把自己的經驗和記憶放入其中，充當燃料，人生就會升騰起火焰，我們便能高舉著它在黑夜中前行。", from: "我會修空調《我的治癒遊戲》" },
	{ text: "奇蹟，一直存在，生命本身就是奇蹟。在無數黑夜和死寂當中，每個人都是自己的奇蹟。", from: "我會修空調《我的治癒遊戲》" },


	{ text: "一個人，如果能有可以去等待著的事物，可以去擔心著的事物，不也是一種幸福嗎？所以，大人，我現在非常幸福哦，這些幸福，都是你給予的……", from: "第七重奏《暗黑破壞神之毀滅》" },
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

// ✅ 使用 IntersectionObserver 監聽 step4 是否進入畫面
let observer = null

onMounted(() => {
	const step4 = document.querySelector('#step4')
	if (step4) {
		observer = new IntersectionObserver((entries) => {
			const entry = entries[0]
			if (entry.isIntersecting) {
				updateArticle()
			}
		}, {
			threshold: 0.01, // 進入畫面時觸發
		})
		observer.observe(step4)
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

	/* 背景層 */
	background-image:
		url('@/assets/images/Step4_background.webp'),
		url('@/assets/images/Step4_background.jpg');
	background-size: cover;
	background-position: bottom;

	font-size: 2rem;
	color: white;

	writing-mode: vertical-rl;
	text-orientation: upright;

	overflow: hidden;
}

/* 🔲 長駐遮罩：整個暗層覆蓋 */
.step-section::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;

	background-image:
		linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 30%),
		radial-gradient(ellipse 500px 300px at 70% center,
			rgba(0, 0, 0, 0.5) 0%,
			rgba(0, 0, 0, 0.7) 70%,
			rgba(0, 0, 0, 0.8) 100%);

	pointer-events: none;
}

/* 💡 閃爍亮光破口遮罩 */
.step-section::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;

	background: radial-gradient(ellipse 500px 300px at 70% center,
			rgba(255, 218, 117, 0.09) 0%,
			rgba(255, 231, 123, 0.06) 40%,
			rgba(255, 252, 240, 0.01) 70%,
			rgba(255, 255, 255, 0) 100%);

	opacity: 0;
	animation: flickerBurst 3s infinite;
	pointer-events: none;
}

@keyframes flickerBurst {
	0% {
		opacity: 0;
	}

	8% {
		opacity: 1;
	}

	10% {
		opacity: 0;
	}

	14% {
		opacity: 1;
	}

	16% {
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	31% {
		opacity: 0;
	}

	80% {
		opacity: 0;
	}

	81% {
		opacity: 1;
	}

	82% {
		opacity: 0;
	}

	100% {
		opacity: 0;
	}
}


.article {
	cursor: pointer;
	/* 設置為可點擊 */
}

/* 標題區塊 */
.areaTitle {
	position: absolute;
	/* transform: translate(-1250px, 40px); */
	left: 15%;
	width: 24vw;
	z-index: 100;
	/* border: 1px solid red; */
	writing-mode: horizontal-tb;

	* {
		margin: 0;
		font-family: '王翰宗中行書';
	}

	.word1 {
		font-size: 9vw;
	}

	.word2 {
		position: absolute;

		font-size: 12vw;
		transform: translate(-46%, 10%);
	}

	.word3 {
		position: absolute;

		font-size: 4vw;
		transform: translate(20%, 190%);
	}

	.word4 {
		position: absolute;
		white-space: nowrap;
		font-size: 2vw;
		transform: translate(-20%, 580%);
	}
}

/* 內容區塊 */
.areaContent {
	position: relative;
	/* width: 400px;
	height: 400px; */

	width: 40vw;
	height: 40vh;
	transform: translate(-20%, 60%);

	display: flex;
	justify-content: center;
	align-items: center;
	/* 垂直和水平居中 */


	/* transform: translate(-200px, 90px); */
	z-index: 100;

	/* ✅ 新增以下來還原為橫式文字排列 */
	/* writing-mode: horizontal-tb; */
	text-orientation: initial;

	/* 文章內容 */
	.articleText {
		font-size: clamp(8px, 1.6vw, 48px);
		text-align: justify;
		line-height: 2;
		margin: 0 auto;
		padding-left: 6px;
		width: 100%;
		opacity: 0;
		transition: opacity 1s ease;
		position: relative;

		&::before {
			content: '　　';
			/* position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 2px;
			background-color: white;
			opacity: 0.6; */
		}
	}

	/* 文章來源 */
	.articleFrom {
		position: relative;
		display: block;
		text-align: right;
		font-size: 16px;
		opacity: 0;
		transition: opacity 1s ease;
		/* ❌ 不要 padding 或 margin 干擾對齊 */

		&::before {
			content: '';
			display: inline-block;
			vertical-align: middle;
			width: 1px;
			height: 18px;
			background-color: white;
			opacity: 0.6;
			margin-right: 6px;
			/* 線和文字的距離 */
		}
	}

}

.svg-mouse {
	display: block;
	margin: auto 16px auto 0;
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

/* .articleSolid {
	margin: 10px auto;
	height: 2px;
	width: 70%;
	background-color: white;
	opacity: 0;
	transition: opacity 1s ease;
} */



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
