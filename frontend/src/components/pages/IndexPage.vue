<template>
	<div class="full-height d-flex-center">
		<div class="back-img"></div>
		<div class="content content-welcome d-flex flex-column">
			<!-- 網站名稱 -->
			<div class="title mb-3">
				<h1>康亘翔</h1>
			</div>

			<!-- 歡迎標語 -->
			<div class="welcome welcome-anime mb-4">
				<h2 :class="{ show: welcomeVisible }" class="welcomeTitle">{{ welcome.title }}</h2>
				<div :class="{ show: welcomeVisible }" class="welcomeSoild"></div>
				<span :class="{ show: welcomeVisible }" class="welcomeMessage">{{ welcome.message }}</span>
			</div>

			<!-- 引用名言區 -->
			<div class="quotations quotations-anime mt-auto">
				<div :class="{ show: quoteVisible }" class="quote" v-html="quote.quote"></div>
				<div :class="{ show: quoteVisible }" class="author">{{ quote.author }}</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name: "IndexPage",
	data() {
		return {
			welcomeVisible: false,
			quoteVisible: false,
			welcome: {
				title: "",
				message: ""
			},
			quote: {
				quote: "",
				author: ""
			},
			welcomes: [
				{ title: "歡迎", message: "很高興你來到我的網站！這裡有關於我、我的興趣、以及我想分享的一些小故事。" },
				{ title: "關於我", message: "想更了解我嗎？這裡有我的生活經歷、工作背景以及我對世界的看法。" },
				{ title: "我的專案", message: "在這裡你可以看到我目前正在進行的專案，無論是創意還是技術領域，都有我的最新動態。" },
				{ title: "作品集", message: "這是我的作品展示區，這裡匯集了我過去的創作和經歷，展示我的專業能力。" },
				{ title: "經歷與成就", message: "了解我的成長歷程，從學習到工作中的經歷，這些成就構成了今天的我。" },
				{ title: "聯繫我", message: "如果你對我的網站或專案有任何問題，隨時聯繫我，我很樂意與你交流。" },
			],
			quotes: [
				{ quote: "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。", author: "？？？" },
				{ quote: "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。", author: "周興嗣《千字文．節選》" },
				{ quote: "老驥伏櫪，志在千里。<br>烈士暮年，壯心不已。", author: "曹操《龜雖壽》" },
				{ quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？", author: "白居易《問劉十九》" },
				{ quote: "昨夜雨疏風驟，濃睡不消殘酒<br>試問捲簾人，卻道海棠依舊<br>知否？知否？應是綠肥紅瘦", author: "李清照《如夢令．昨夜雨疏風驟》" },
				{ quote: "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁", author: "曹丕《燕歌行（一）．節選》" },
			]
		};
	},
	methods: {
		getRandom(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		},
		updateWelcome() {
			this.welcomeVisible = false;
			setTimeout(() => {
				this.welcome = this.getRandom(this.welcomes);
				this.welcomeVisible = true;
			}, 50);
		},
		updateQuote() {
			this.quoteVisible = false;
			setTimeout(() => {
				this.quote = this.getRandom(this.quotes);
				this.quoteVisible = true;
			}, 500);
		}
	},
	mounted() {
		this.updateWelcome();
		this.updateQuote();
	}
};
</script>

<style scoped>
.full-height {
	height: 630px;
	margin: 100px 0;
}

.d-flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.back-img {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/background.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: -1;
}

.content {
	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 10px;
	width: 500px;
	min-height: 600px;
	text-align: center;
}

.title h1 {
	font-family: '標楷體';
	font-size: 60px;
	color: #333;
}

.welcome h2 {
	font-family: '標楷體';
	font-size: 27px;
	color: #333;
}

.welcomeSoild {
	margin: 10px auto;
	height: 2px;
	width: 70%;
	background-color: #333;
}

.welcomeMessage {
	font-family: '標楷體';
	font-size: 20px;
	color: #333;
	text-align: justify;
	margin: 0 auto;
	width: 80%;
}

.quotations {
	font-family: '標楷體';
	margin: 0 auto;
	width: 300px;
}

.quote {
	font-size: 14px;
	border-left: 2.4px solid #777;
	padding-left: 8px;
	font-style: italic;
	line-height: 1.6;
}

.author {
	font-size: 12px;
	text-align: right;
	color: #555;
	margin-top: 5px;
}

.author::before {
	content: "——";
	margin-right: 4px;
}

.welcomeTitle,
.welcomeMessage,
.welcomeSoild,
.quote,
.author {
	opacity: 0;
	transition: opacity 1s ease;
}

.show {
	opacity: 1;
}
</style>