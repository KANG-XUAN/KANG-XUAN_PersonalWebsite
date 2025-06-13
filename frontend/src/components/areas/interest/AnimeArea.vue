<template>
	<div class="tab-pane" data-tab="anime">
		<!-- 手風琴容器 -->
		<div class="accordion mb-5" id="animeAccordion">
			<!-- 動畫影片 -->
			<div class="accordion-item">
				<h2 class="accordion-header" id="headingDoujin">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
						data-bs-target="#collapseDoujin" aria-expanded="false" aria-controls="collapseDoujin">
						<h3>動畫影片</h3>
					</button>
				</h2>
				<div id="collapseDoujin" class="accordion-collapse collapse" aria-labelledby="headingDoujin"
					data-bs-parent="#animeAccordion">
					<div class="accordion-body">
						<!-- 你可以在這邊補充動畫影片內容 -->
					</div>
				</div>
			</div>

			<!-- 同人影片 -->
			<div class="accordion-item">
				<h2 class="accordion-header" id="headingAnime">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
						data-bs-target="#collapseAnime" aria-expanded="false" aria-controls="collapseAnime">
						<h3>同人影片</h3>
					</button>
				</h2>
				<div id="collapseAnime" class="accordion-collapse collapse" aria-labelledby="headingAnime"
					data-bs-parent="#animeAccordion">
					<div class="accordion-body">
						<div class="row">
							<!-- 踏歌 -->
							<div class="col-12 col-md-6 mb-3">
								<div class="card">
									<div class="card-header p-2">
										<iframe
											src="https://player.bilibili.com/player.html?isOutside=true&aid=43909982&bvid=BV1xb41117KN&cid=76921700&p=1&autoplay=0"
											scrolling="no" border="0" frameborder="no" framespacing="0"
											allowfullscreen="true" class="w-100" style="height: 315px;"></iframe>
									</div>
									<div class="card-body">
										<h4 class="card-title mb-0">
											《踏歌》－跨越海洋與歲月的友誼讚歌
										</h4>
										<small class="card-title mb-0">作者：花花很兇</small>
									</div>
								</div>
							</div>
							<!-- 雁歸 -->
							<div class="col-12 col-md-6 mb-3">
								<div class="card">
									<div class="card-header p-2">
										<iframe
											src="https://player.bilibili.com/player.html?isOutside=true&aid=59347529&bvid=BV1Lt411G74w&cid=103444233&p=1&autoplay=0"
											scrolling="no" border="0" frameborder="no" framespacing="0"
											allowfullscreen="true" class="w-100" style="height: 315px;"></iframe>
									</div>
									<div class="card-body">
										<h4 class="card-title mb-0">
											《雁歸》－穿梭江湖與時光的心靈之旅
										</h4>
										<small class="card-title mb-0">作者：花花很兇</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 手風琴結束 -->
	</div>
</template>

<script setup>
// Bootstrap 的折疊功能通常需要引入 bootstrap.bundle.js，確保你的專案已經引入
// 這裡不需額外 JS，因為是原生 bootstrap 折疊元件
</script>

<style scoped>
/* 你可以自訂樣式 */
</style>