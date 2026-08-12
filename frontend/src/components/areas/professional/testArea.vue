<template>
	<div class="test">

		<!--
            =====================================================
            標題區域
            =====================================================
        -->
		<div class="title title-container">

			<!--
                正式切換時的特殊動畫

                例如：

                HTML => Vue

                點擊 Vue 後：

                HTML => Vue
                  → Vue 向左移動
                  → HTML => 被推出
                  → 最後只留下 Vue
            -->
			<div v-if="isTitleMoving" class="title-track title-track-moving" :style="{
				'--push-distance': `${titlePushDistance}px`
			}">
				<!-- 舊標題 -->
				<div class="title-base">
					{{ transitionFromTitle }}

					<span class="title-arrow">
						=>
					</span>
				</div>

				<!-- 新標題 -->
				<div class="title-next">
					{{ transitionToTitle }}
				</div>
			</div>


			<!--
                Hover 預覽

                例如：

                HTML => Vue

                但如果 Hover 的就是目前 active：

                HTML

                不會出現：

                HTML => HTML
            -->
			<div v-else-if="showPreviewTitle" class="title-preview">
				<div class="title-base">
					{{ selectedData.title }}

					<span class="title-arrow">
						=>
					</span>
				</div>

				<div class="title-next">
					{{ previewData.title }}
				</div>
			</div>


			<!--
                一般正式選取狀態
            -->
			<div v-else class="title-single">
				{{ selectedData.title }}
			</div>

		</div>


		<hr>


		<!--
            =====================================================
            簡介
            =====================================================
        -->
		<div class="describe">
			{{ previewData.describe }}
		</div>


		<!--
            =====================================================
            詳細內容
            =====================================================

            這個元素永遠存在。

            Hover：
                隱藏

            Hover 結束：
                恢復

            因為 DOM 沒有被移除，
            所以不會因為 Hover 結束而重新播放動畫。

            只有 animationKey 改變，
            Vue 才會重新建立這個元素，
            進而重新播放擦除動畫。
        -->
		<div :key="props.animationKey" class="details" :class="{
			'details-hidden':
				props.hoverIndex !== null &&
				props.hoverIndex !== props.currentIndex &&
				!hasSelectedAfterHover
		}">
			{{ selectedData.details }}
		</div>

	</div>
</template>


<script setup>
import {
	computed,
	ref,
	watch,
	nextTick
} from 'vue'


// JSON 資料
import data from './data.json'


/*
 * =========================================================
 * 接收父元件狀態
 * =========================================================
 *
 * currentIndex
 * → 正式選取
 *
 * hoverIndex
 * → Hover 預覽
 *
 * animationKey
 * → 正式選取時增加
 * → 用來重新觸發詳細內容動畫
 */
const props = defineProps({
	currentIndex: {
		type: Number,
		default: 0
	},

	hoverIndex: {
		type: Number,
		default: null
	},

	animationKey: {
		type: Number,
		default: 0
	}
})


/*
 * =========================================================
 * 正式選取資料
 * =========================================================
 */
const selectedData = computed(() => {
	return data.skills[props.currentIndex]
})


/*
 * =========================================================
 * Hover 預覽資料
 * =========================================================
 *
 * Hover 時：
 * → 使用 hoverIndex
 *
 * 沒 Hover：
 * → 使用 currentIndex
 */
const previewData = computed(() => {

	const index =
		props.hoverIndex !== null
			? props.hoverIndex
			: props.currentIndex

	return data.skills[index]
})


/*
 * =========================================================
 * 是否為「其他項目的 Hover」
 * =========================================================
 *
 * HTML Hover HTML：
 * → false
 *
 * HTML Hover Vue：
 * → true
 */
const showPreviewTitle = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)
})


/*
 * =========================================================
 * 標題動畫狀態
 * =========================================================
 */


/*
 * 是否正在播放正式選取動畫
 */
const isTitleMoving = ref(false)
const hasSelectedAfterHover = ref(false)


watch(
	() => props.hoverIndex,
	(newValue) => {

		/*
		 * Hover 自己目前的 active
		 *
		 * 完全不做任何事情。
		 *
		 * HTML Hover HTML
		 * → 就跟沒有 Hover 一樣。
		 */
		if (
			newValue !== null &&
			newValue === props.currentIndex
		) {
			return
		}


		/*
		 * Hover 其他項目
		 *
		 * → 隱藏詳細內容
		 */
		if (newValue !== null) {
			hasSelectedAfterHover.value = false
		}
	}
)


// 正式選取
watch(
	() => props.animationKey,
	() => {

		// 正式選取後立即顯示詳細內容
		hasSelectedAfterHover.value = true
	}
)


/*
 * 動畫開始時的舊標題
 *
 * 例如：
 * HTML
 */
const transitionFromTitle = ref('')


/*
 * 動畫結束後的新標題
 *
 * 例如：
 * Vue
 */
const transitionToTitle = ref('')


/*
 * =========================================================
 * 標題推移距離
 * =========================================================
 *
 * 我們不直接寫死 translateX，
 * 而是實際計算：

 * 舊標題 + 箭頭的寬度
 *
 * 例如：

 * HTML =>

 * 這段有多寬，
 * Vue 就向左移多少。
 */
const titlePushDistance = ref(0)


/*
 * =========================================================
 * DOM Reference
 * =========================================================
 *
 * 用來測量：
 *
 * 舊標題 + 箭頭
 *
 * 的實際寬度。
 */
const titleBaseRef = ref(null)


/*
 * =========================================================
 * 正式選取變更
 * =========================================================
 *
 * 注意：
 *
 * watch 有 oldIndex / newIndex，
 * 所以即使 currentIndex 已經改變，
 * 我們仍然知道「上一個標題」是什麼。
 *
 * 這就是這版比原本穩定的關鍵。
 */
watch(
	() => props.currentIndex,
	async (newIndex, oldIndex) => {

		/*
		 * 初始狀態不播放
		 */
		if (
			oldIndex === undefined ||
			newIndex === oldIndex
		) {
			return
		}


		/*
		 * =====================================================
		 * 記住動畫前後的標題
		 * =====================================================
		 */
		transitionFromTitle.value =
			data.skills[oldIndex]?.title ?? ''


		transitionToTitle.value =
			data.skills[newIndex]?.title ?? ''


		/*
		 * =====================================================
		 * 開始動畫
		 * =====================================================
		 */
		isTitleMoving.value = true


		/*
		 * 等待 DOM 建立
		 */
		await nextTick()


		/*
		 * 找到：

		 * 舊標題 + 箭頭

		 * 的實際寬度。
		 *
		 * title-baseRef 目前先不用，
		 * 實際上我們用 DOM query 取得動畫中的元素。
		 */
		const baseElement =
			document.querySelector(
				'.title-track-moving .title-base'
			)


		if (baseElement) {

			titlePushDistance.value =
				baseElement.getBoundingClientRect().width
		}


		/*
		 * =====================================================
		 * 動畫結束
		 * =====================================================
		 *
		 * 450ms 後，
		 * 回到一般正式標題。
		 */
		setTimeout(() => {

			isTitleMoving.value = false

		}, 450)
	}
)
</script>


<style scoped>
/*
 * =========================================================
 * 外層
 * =========================================================
 */

.test {
	position: absolute;

	left: 150px;
	top: 135px;

	z-index: 10;

	color: white;
	font-size: 32px;
}


/*
 * =========================================================
 * 標題
 * =========================================================
 */

.title {
	font-size: 32px;
}


/*
 * =========================================================
 * 標題容器
 * =========================================================
 *
 * 重要：
 *
 * overflow: hidden
 *
 * 讓被推出去的 HTML =>
 * 不會跑到畫面外繼續出現。
 */

.title-container {
	position: relative;

	width: fit-content;
	max-width: 100%;

	height: 48px;

	overflow: hidden;
}


/*
 * =========================================================
 * 一般標題
 * =========================================================
 */

.title-single {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}


/*
 * =========================================================
 * Hover 標題
 * =========================================================
 *
 * HTML => Vue
 */

.title-preview {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}


/*
 * =========================================================
 * 正式切換動畫 Track
 * =========================================================
 *
 * 內容：

 * HTML => Vue

 * 整條一起往左移。
 */

.title-track {
	display: flex;

	align-items: center;

	width: max-content;

	height: 100%;

	white-space: nowrap;
}


/*
 * =========================================================
 * 舊標題 + 箭頭
 * =========================================================
 */

.title-base {
	display: flex;

	align-items: center;

	white-space: nowrap;
}


/*
 * =========================================================
 * 箭頭
 * =========================================================
 */

.title-arrow {
	margin: 0 8px;

	opacity: 0.6;

	font-size: 0.85em;

	font-weight: bold;
}


/*
 * =========================================================
 * 新標題
 * =========================================================
 */

.title-next {
	white-space: nowrap;
}


/*
 * =========================================================
 * 正式選取動畫
 * =========================================================
 *
 * 假設：

 * HTML => Vue

 * HTML => 寬度 = 150px
 *
 * 動畫：

 * 0%
 * HTML => Vue
 *
 * 50%
 *   HTML => Vue
 *
 * 100%
 *        Vue
 *
 * 最終剛好讓 Vue 取代原本 HTML 的位置。
 */

.title-track-moving {
	animation:
		titlePush 0.45s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}


@keyframes titlePush {

	from {
		transform: translateX(0);
	}

	to {
		transform:
			translateX(calc(-1 * var(--push-distance)));
	}
}


/*
 * =========================================================
 * 簡介
 * =========================================================
 */

.describe {
	font-size: 24px;
}


/*
 * =========================================================
 * 詳細內容
 * =========================================================
 */

.details {
	position: relative;

	margin-top: 30px;

	font-size: 20px;

	line-height: 1.8;

	max-width: 800px;


	/*
     * =====================================================
     * 文字擦除
     * =====================================================
     */

	clip-path:
		inset(0 100% 0 0);

	animation:
		detailsWipe 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}


/*
 * =========================================================
 * Hover 時隱藏詳細內容
 * =========================================================
 *
 * 不使用 v-if。
 *
 * 只隱藏。
 *
 * 所以：
 *
 * Hover
 * → 隱藏
 *
 * 離開 Hover
 * → 顯示
 *
 * 不會重新播放擦除動畫。
 */

.details-hidden {
	visibility: hidden;

	opacity: 0;
}


/*
 * =========================================================
 * 詳細內容擦出
 * =========================================================
 */

@keyframes detailsWipe {

	from {
		clip-path:
			inset(0 100% 0 0);
	}

	to {
		clip-path:
			inset(0 0 0 0);
	}
}


/*
 * =========================================================
 * 擦除光線
 * =========================================================
 *
 * 這就是「擦過文字的光線」。
 */

.details::after {

	content: "";

	position: absolute;

	top: -6px;
	bottom: -6px;

	left: 0;

	width: 2px;


	/*
     * 光線本體
     */

	background:
		rgba(255,
			255,
			255,
			1);


	/*
     * 多層光暈
     */

	box-shadow:

		0 0 4px rgba(255,
			255,
			255,
			1),

		0 0 9px rgba(255,
			255,
			255,
			0.95),

		0 0 18px rgba(255,
			255,
			255,
			0.75),

		0 0 32px rgba(255,
			255,
			255,
			0.45);


	opacity: 1;


	transform:
		translateX(0) scaleX(1);


	transform-origin:
		center;


	/*
     * 與文字擦除同步
     */

	animation:
		wipeLight 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;


	pointer-events: none;

	z-index: 2;
}


/*
 * =========================================================
 * 光線移動 + 縮小 + 淡出
 * =========================================================
 */

@keyframes wipeLight {

	/*
     * 開始
     */

	0% {

		left: 0;

		opacity: 1;

		transform:
			translateX(0) scaleX(1);
	}


	/*
     * 大部分時間保持完整光線
     */

	80% {

		opacity: 1;

		transform:
			translateX(0) scaleX(1);
	}


	/*
     * 開始縮小 + 淡出
     */

	92% {

		opacity: 0.55;

		transform:
			translateX(0) scaleX(0.7);
	}


	/*
     * 完成
     */

	100% {

		left: 100%;

		opacity: 0;

		transform:
			translateX(0) scaleX(0.35);
	}
}
</style>
