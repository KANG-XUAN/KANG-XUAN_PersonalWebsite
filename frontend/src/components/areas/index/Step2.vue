<template>
	<section id="step2" class="step-section">

		<div class="back-img"></div>

		<!-- 第一段 -->
		<div class="content-block block-1">
			<span class="number">01</span>

			<!-- 等你確認這種瀏覽方式是你要的，我們再來做更漂亮的 parallax / 淡入 / 位移動畫，現在先別急著加。 -->
			<div class="text">
				<h1>關於我
					<h6>(正在測試該區，無意義內容)</h6>
				</h1>
				

				<p>
					行於文字之間，尋於故事之中。<br>
					喜歡將所見、所聞、所思，化作一行行文字。
				</p>

				<p>
					也喜歡寫些東西，<br>
					偶爾寫歌，偶爾寫故事，<br>
					偶爾只是記下某一刻的心情。
				</p>
			</div>
		</div>


		<!-- 第二段 -->
		<div class="content-block block-2">
			<span class="number">02</span>

			<div class="text">
				<h1>我在尋找</h1>

				<p>
					尋一處安靜之地，<br>
					讓文字慢慢生長。
				</p>

				<p>
					尋一首恰好的歌，<br>
					替說不出口的話，唱完剩下的部分。
				</p>
			</div>
		</div>


		<!-- 第三段 -->
		<div class="content-block block-3">
			<span class="number">03</span>

			<div class="text">
				<h1>一些作品</h1>

				<p>
					文字、音樂、故事。<br>
					那些還沒完成的，<br>
					以及已經走過的。
				</p>

				<div class="hint">
					繼續向下
					<span>↓</span>
				</div>
			</div>
		</div>

	</section>
</template>

<script setup>
</script>

<style scoped>
.step-section {
	position: relative;

	/* ⚠️ 這裡故意讓 Step2 比一個畫面高 */
	min-height: 100vh;
	height: 200vh;

	width: 100%;

	color: white;

	overflow: hidden;

	/* 強制隱藏 Step2 自己的 scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
}


/* =========================
   背景
========================= */

.back-img {
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background-image:
		linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.35),
			rgba(0, 0, 0, 0.65)
		),
		url('@/assets/images/background.webp'),
		url('@/assets/images/background.jpg');

	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

	z-index: -1;
}


/* =========================
   共用內容
========================= */

.content-block {
	position: relative;

	width: 70%;
	height: 50vh;

	margin: 0 auto;

	display: flex;
	align-items: center;
}


/* 編號 */

.number {
	font-size: 5vw;
	font-family: '王翰宗中行書';

	opacity: 0.25;

	margin-right: 60px;
}


/* 文字 */

.text {
	max-width: 800px;
}

.text h1 {
	font-family: '王翰宗中行書';

	font-size: clamp(36px, 4vw, 70px);

	font-weight: normal;

	margin: 0 0 30px 0;
}

.text p {
	font-family: '王翰宗中行書';

	font-size: clamp(18px, 1.5vw, 28px);

	line-height: 2;

	margin: 0 0 25px 0;

	opacity: 0.85;
}


/* =========================
   三個區塊的位置
========================= */

.block-1 {
	padding-top: 10vh;
}

.block-2 {
	margin-top: 15vh;
	margin-left: 20%;
}

.block-3 {
	margin-top: 15vh;
	margin-left: 45%;
}


/* =========================
   最下面提示
========================= */

.hint {
	margin-top: 50px;

	font-size: 16px;

	opacity: 0.5;

	display: flex;
	flex-direction: column;

	gap: 10px;
}

.hint span {
	font-size: 24px;
}


/* =========================
   RWD
========================= */

@media (max-width: 768px) {

	.content-block {
		width: 80%;
		height: auto;

		display: block;

		margin-left: auto;
		margin-right: auto;

		margin-top: 20vh;
	}

	.block-2,
	.block-3 {
		margin-left: auto;
		margin-right: auto;
	}

	.number {
		font-size: 15vw;

		margin-bottom: 20px;
	}

	.text h1 {
		font-size: 10vw;
	}

	.text p {
		font-size: 18px;
	}
}
</style>