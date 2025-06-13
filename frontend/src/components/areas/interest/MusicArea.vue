<template>
	<div class="container bg-white p-4 my-5">
		<h2>音樂列表</h2>

		<!-- YouTube 推薦影片 -->
		<div class="row mb-4">
			<div class="col-6">
				<iframe width="100%" height="360" src="https://www.youtube.com/embed/yqkWEW9an3I?si=moLo9AU77Qo1MmWR"
					title="YouTube video player" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
			<div class="col-6">
				<iframe width="100%" height="360" src="https://www.youtube.com/embed/hyZVsBA9Kj0?si=q6Ap3-hm7l-c7T_L"
					title="YouTube video player" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		</div>

		<table class="table table-striped table-hover mt-3">
			<thead>
				<tr>
					<th style="width: 5%">#</th>
					<th style="width: 15%">類型</th>
					<th style="width: 25%">歌名</th>
					<th style="width: 30%">歌手</th>
					<th style="width: 10%">連結</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song, index) in pagedSongs" :key="index">
					<td>
						<div class="text-truncate truncate-cell">
							{{ (currentPage - 1) * itemsPerPage + index + 1 }}
						</div>
					</td>
					<td>
						<div class="text-truncate truncate-cell">{{ song.type || '-' }}</div>
					</td>
					<td>
						<div class="text-truncate truncate-cell">{{ song.name || '-' }}</div>
					</td>
					<td>
						<div class="text-truncate truncate-cell">{{ song.singer || '-' }}</div>
					</td>
					<td>
						<div class="text-truncate truncate-cell">
							<a v-if="song.link && song.link.includes('http')" :href="song.link" target="_blank"
								rel="noopener noreferrer">點我</a>
							<span v-else>-</span>
						</div>
					</td>
				</tr>
				<!-- 補空白列 -->
				<tr v-for="i in emptyRows" :key="'empty' + i">
					<td>{{ (currentPage - 1) * itemsPerPage + pagedSongs.length + i }}</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
			</tbody>
		</table>

		<!-- 分頁資訊與按鈕 -->
		<div class="row mt-4">
			<div class="col-md-5 d-flex align-items-center">
				<p class="mb-0">
					第 <strong>{{ currentPage }}</strong> 頁，共 <strong>{{ totalPages }}</strong> 頁，總筆數
					<strong>{{ songs.length }}</strong> 筆
				</p>
			</div>
			<div class="col-md-7">
				<nav aria-label="Page navigation">
					<ul class="pagination justify-content-end mb-0">
						<li :class="['page-item', currentPage === 1 ? 'disabled' : '']">
							<a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">上一頁</a>
						</li>
						<li v-for="page in pages" :key="pageKey(page)"
							:class="['page-item', page === currentPage ? 'active' : '', page === '...' ? 'disabled' : '']">
							<a v-if="page !== '...'" class="page-link" href="#" @click.prevent="goToPage(page)">{{ page
								}}</a>
							<span v-else class="page-link">…</span>
						</li>
						<li :class="['page-item', currentPage === totalPages ? 'disabled' : '']">
							<a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">下一頁</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const songs = [
	{ type: '古風', name: '長安不問', singer: '貳萬＆吾恩', link: 'https://www.youtube.com/watch?v=hyZVsBA9Kj0' },
	{ type: '古風', name: '小僧無名', singer: '黃麒Eros', link: 'https://www.youtube.com/watch?v=yqkWEW9an3I' },
	{ type: '古風', name: '煙籠長安', singer: '少司命', link: 'https://www.youtube.com/watch?v=12ODcJ3MjvQ' },
	{ type: '古風', name: '黑月光', singer: '罗云熙＆白鹿', link: 'https://www.youtube.com/watch?v=ndJ-DkvxSZs' },
	{ type: '', name: '人間朝暮', singer: '少司命', link: 'https://www.youtube.com/watch?v=ddSkv82TZPA' },
	{ type: '古風', name: '入畫江南', singer: '黃齡', link: 'https://www.youtube.com/watch?v=cSDi70KX8e0' },
	{ type: '古風', name: '傾盡天下', singer: '河圖', link: 'https://www.youtube.com/watch?v=lfHrJOr8WoM' },
	{ type: '古風', name: '東流', singer: '緋村柯北＆灰老板', link: 'https://www.youtube.com/watch?v=RfVUUGxdi_A' },
	{ type: '古風', name: '風物志與江湖詩', singer: '池年＆鬼冢虫虫', link: 'https://www.bilibili.com/video/BV17t411p7oV/?spm_id_from=333.337.search-card.all.click' },
	{ type: '古風', name: '吹夢到西洲', singer: '黃詩扶＆妖揚', link: 'https://www.youtube.com/watch?v=xsTm-WGd3yA' },
	{ type: '古風', name: '千年', singer: '少司命', link: 'https://www.youtube.com/watch?v=BptNT5GZ4HM' },
	{ type: '古風', name: '不老夢', singer: '銀臨', link: 'https://www.youtube.com/watch?v=oV766nQt-F4' },
	{ type: '古風', name: '山鬼', singer: '清秋秋', link: 'https://www.youtube.com/watch?v=KXjNUrVP8bo' },
	{ type: '古風', name: '畫詩', singer: '玄觴＆執素兮', link: 'https://www.youtube.com/watch?v=u1qvv3BVOtY' },
	{ type: '古風', name: '一花一劍', singer: '李鑫一', link: 'https://www.youtube.com/watch?v=c2jmFFsGCYs' },
	{ type: '古風', name: '瀘沽尋夢', singer: '銀臨', link: 'https://www.youtube.com/watch?v=GObLh4NRoqw' },
	{ type: '古風', name: '咫尺相思', singer: '小曲兒＆音頻怪物＆淩之軒＆完美仙劍＆Walker＆HITA＆Aki阿傑＆小愛的媽＆富貴哥＆夢嵐＆煙花Show', link: 'https://www.youtube.com/watch?v=t60ex5MqbKI' },
	{ type: '古風', name: '北風行', singer: '少司命', link: 'https://www.youtube.com/watch?v=JepGG9Urbc8' },
	{ type: '古風', name: '緣生意轉', singer: '河圖＆西國海妖', link: 'https://www.youtube.com/watch?v=hOqwnq0n2FM' },
	{ type: '古風', name: '百戀歌', singer: '夢璟SAYA', link: 'https://www.youtube.com/watch?v=lVTXNa4UMHs' },
	{ type: '古風', name: '生死劫', singer: '五音Jw＆銀臨', link: 'https://www.youtube.com/watch?v=roJ30EutMYc' },
	{ type: '現代', name: '滿天星辰不及你', singer: 'ycccc', link: 'https://www.youtube.com/watch?v=tbVGxrt2rR0' },
	{ type: '現代', name: '消愁', singer: '毛不易', link: 'https://www.youtube.com/watch?v=c8I74C-GXLk' },
	{ type: '現代', name: '若某日我封筆', singer: '河圖', link: 'https://www.youtube.com/watch?v=fveeiGOO7KI' },
];

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(songs.length / itemsPerPage));

const pagedSongs = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return songs.slice(start, start + itemsPerPage);
});

const emptyRows = computed(() => itemsPerPage - pagedSongs.value.length);

const pages = computed(() => {
	const maxVisiblePages = 5;
	const total = totalPages.value;
	const curr = currentPage.value;
	let result = [];

	if (total <= maxVisiblePages + 2) {
		for (let i = 1; i <= total; i++) result.push(i);
	} else {
		if (curr <= maxVisiblePages - 1) {
			result = [1, 2, 3, 4, 5, '...', total];
		} else if (curr >= total - (maxVisiblePages - 2)) {
			result = [1, '...'];
			for (let i = total - 4; i <= total; i++) result.push(i);
		} else {
			result = [1, '...', curr - 1, curr, curr + 1, '...', total];
		}
	}

	return result;
});

function pageKey(page) {
	return page === '...' ? 'ellipsis' + Math.random() : 'page' + page;
}

function goToPage(page) {
	if (page < 1) page = 1;
	if (page > totalPages.value) page = totalPages.value;
	currentPage.value = page;
}
</script>

<style scoped>
.truncate-cell {
	max-width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>