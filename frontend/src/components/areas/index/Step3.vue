<template>
	<section id="step1" class="step-section">
		<!-- 右上區塊 -->
		<div class="right-top-block">
			<h1>歡迎來到我的網站</h1>
		</div>

		<!-- 左下區塊 -->
		<div class="left-bottom-block">
			<!-- 引用名言區 -->
			<div class="quotations quotations-anime mt-auto">
				<div :class="{ show: quoteVisible }" class="quote" v-html="quote.quote"></div>
				<div :class="{ show: quoteVisible }" class="author">{{ quote.author }}</div>
			</div>
		</div>

		<firefly />

	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import firefly from './anime/firefly.vue'

const welcomeVisible = ref(false)
const quoteVisible = ref(false)

const welcome = ref({ title: '', message: '' })
const quote = ref({ quote: '', author: '' })

const welcomes = [
	// 我会修空调啊《我的治愈游戏》
	{ title: "歡迎", message: "人不會發光，不過我們每個人手裡都有一個從先人那裡繼承到的火炬，這可以照亮黑夜的火炬叫做人生。我們把自己的經驗和記憶放入其中，充當燃料，人生就會升騰起火焰，我們便能高舉著它在黑夜中前行。" },
	{ title: "歡迎", message: "奇蹟，一直存在，生命本身就是奇蹟。在無數黑夜和死寂當中，每個人都是自己的奇蹟。" },
]

const quotes = [
	{ quote: "沉默是金　難知若陰<br>戲言掩情　人面藏心", author: "隨筆" },
	{ quote: "罔談彼短　靡恃己長　信使可覆　器欲難量<br>禍因惡積　福緣善慶　尺璧非寶　寸陰是競", author: "周興嗣《千字文．節選》" },
	{ quote: "情不敢至深　恐大夢一場<br>卦不敢算盡　畏天道無常", author: "荀夜羽《晴雪夜》" },
	{ quote: "西北有蟬　名曰無夢<br>終南有墳　名曰不老", author: "？？？《？？？》" },
	// 來源歌詞
	{ quote: "一十七畫盡相思　書做無緣只兩字<br>一十九筆結心意　有緣相聚莫別離", author: "歌詞《殺陣》" },
	{ quote: "不見江瀾　且問青山　飄飲擺川　只燈照晚<br>不見悲歡　且撫琴帆　敗樓聽蟬　和音頌喃", author: "歌詞《小僧無名》" },
	{ quote: "見老婦雪髮萬千落<br>雙手合　不見濁<br>青絲化語與那孺子說", author: "歌詞《小僧無名》" },
	{ quote: "朔風淒　更漏迢遞　素手嗅白梨<br>庭水西　錦書難寄　羅線作舊衣<br>流鏨筆　字字誅心　遲語無歸期", author: "歌詞《長安不問》" },
	{ quote: "不淡不深　不棄不珍　不寒不暖　不欺不問<br>不思不忘　不聚不分　不留不捨　不憐不認", author: "歌詞《皎然記》" },
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

function updateQuote() {
	quoteVisible.value = false
	setTimeout(() => {
		quote.value = getRandom(quotes)
		quoteVisible.value = true
	}, 500)
}

onMounted(() => {
	updateWelcome()
	updateQuote()
})

</script>

<style scoped>
.step-section {
	position: relative;
	height: 100vh;
	width: 100%;

	background-image:
		/* 頂部_向下線性漸層 */
		/* linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 30%), */
		/* 中心_向內圓形漸層 */
		/* radial-gradient(circle, rgba(255, 255, 255, 0) 40%, rgb(0, 0, 0) 100%), */
		/* 背景圖片 */
		url('@/assets/images/Step3_background.png');
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


</style>
