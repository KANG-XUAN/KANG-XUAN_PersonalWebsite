<template>

	<div class="title-area">

		<!-- 標題與技能導覽 -->
		<div class="title-header">

			<!-- 標題 -->
			<div class="title title-container">

				<!-- 正式切換時的標題滑動動畫 -->
				<div v-if="isTitleMoving" class="title-track title-track-moving" :style="{
					'--push-distance': `${titlePushDistance}px`
				}">

					<div class="title-base">
						{{ transitionFromTitle }}

						<span class="title-arrow">
							=>
						</span>
					</div>

					<div class="title-next">
						{{ transitionToTitle }}
					</div>

				</div>

				<!-- 滑鼠移入時顯示技能名稱預覽 -->
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

				<!-- 一般狀態顯示目前選取的技能名稱 -->
				<div v-else class="title-single">
					{{ selectedData.title }}
				</div>

			</div>


			<!-- 技能 Icon 選擇區 -->
			<div class="icon-grid-container">

				<div v-for="(skill, i) in skills" :key="skill.id" class="icon-item" :class="{
					active: i === props.currentIndex
				}" @click="selectIcon(i)" @mouseover="setHoverIndex(i)" @mouseleave="clearHoverIndex">

					<img :src="skill.icon" :alt="skill.title" :title="skill.title" />

				</div>

			</div>

		</div>

		<!-- 標題區分隔線 -->
		<hr>

	</div>

</template>

<script setup>

import {
	computed,
	ref,
	watch,
	nextTick
} from 'vue'

/*
=========================================================
資料與 Icon
=========================================================
*/

import data from '../../../assets/json/professional.json'

import WordIcon from '@/assets/images/icon/Word.png'
import ExcelIcon from '@/assets/images/icon/Excel.png'
import PowerPointIcon from '@/assets/images/icon/PowerPoint.png'
import IllustratorIcon from '@/assets/images/icon/Illustrator.png'
import HtmlIcon from '@/assets/images/icon/HTML.png'
import JavaIcon from '@/assets/images/icon/Java.png'
import Vue2Icon from '@/assets/images/icon/Vue2.png'
import NodeJSIcon from '@/assets/images/icon/NodeJS.png'
import CloudIcon from '@/assets/images/icon/Cloud.png'

// 將 JSON 中的 Icon 檔名對應到實際圖片
const iconMap = {
	'HTML.png': HtmlIcon,
	'Vue2.png': Vue2Icon,
	'Node.png': NodeJSIcon,
	'Java.png': JavaIcon,
	'Cloud.png': CloudIcon,
	'Word.png': WordIcon,
	'Excel.png': ExcelIcon,
	'PowerPoint.png': PowerPointIcon,
	'Illustrator.png': IllustratorIcon
}

// 建立畫面實際使用的技能資料
const skills = computed(() => {
	return data.skills.map(skill => ({
		...skill,
		icon: iconMap[skill.icon]
	}))
})

/*
=========================================================
父元件狀態與事件
=========================================================
*/

const props = defineProps({

	// 目前正式選取的技能
	currentIndex: {
		type: Number,
		default: 0
	},

	// 滑鼠目前預覽的技能
	hoverIndex: {
		type: Number,
		default: null
	},

	// 用於控制外部動畫重新觸發
	animationKey: {
		type: Number,
		default: 0
	}

})

const emit = defineEmits([
	'update:currentIndex',
	'update:hoverIndex',
	'select'
])

/*
=========================================================
技能選取與 Hover
=========================================================
*/

// 更新目前 Hover 的技能
function setHoverIndex(index) {
	emit('update:hoverIndex', index)
}

// 清除目前 Hover 狀態
function clearHoverIndex() {
	emit('update:hoverIndex', null)
}

// 正式選取技能
function selectIcon(index) {
	emit('update:currentIndex', index)
	emit('select', index)
}

/*
=========================================================
目前技能與預覽資料
=========================================================
*/

// 取得目前正式選取的技能
const selectedData = computed(() => {
	return data.skills[props.currentIndex]
})

// 取得目前 Hover 預覽的技能
const previewData = computed(() => {

	const index =
		props.hoverIndex !== null
			? props.hoverIndex
			: props.currentIndex

	return data.skills[index]
})

// 判斷目前是否需要顯示 Hover 預覽
const showPreviewTitle = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)

})

/*
=========================================================
標題切換動畫
=========================================================
*/

// 控制正式標題切換動畫
const isTitleMoving = ref(false)

// 儲存動畫開始前的標題
const transitionFromTitle = ref('')

// 儲存動畫結束後的標題
const transitionToTitle = ref('')

// 計算舊標題需要被推出的距離
const titlePushDistance = ref(0)

/*
=========================================================
監聽技能切換
=========================================================
*/

watch(
	() => props.currentIndex,

	async (newIndex, oldIndex) => {

		// 第一次初始化時不執行動畫
		if (
			oldIndex === undefined ||
			newIndex === oldIndex
		) {
			return
		}

		// 記錄動畫開始時的標題
		transitionFromTitle.value =
			data.skills[oldIndex]?.title ?? ''

		// 記錄動畫結束時的標題
		transitionToTitle.value =
			data.skills[newIndex]?.title ?? ''

		// 開始標題切換動畫
		isTitleMoving.value = true

		await nextTick()

		// 取得目前標題實際寬度
		const baseElement =
			document.querySelector(
				'.title-track-moving .title-base'
			)

		if (baseElement) {

			titlePushDistance.value =
				baseElement.getBoundingClientRect().width

		}

		// 動畫結束後恢復一般狀態
		setTimeout(() => {

			isTitleMoving.value = false

		}, 450)

	}
)

</script>

<style scoped>
/******************
***** 標題區域 *****
******************/

/* 標題與技能導覽 */
.title-header {
	display: flex;

	align-items: center;
	justify-content: space-between;

	gap: clamp(12px, 2vw, 40px);

	width: 100%;
	height: clamp(48px, 7vh, 90px);
}


/* 標題 */
.title {
	font-size: clamp(24px, 4.5vh, 52px);

	width: auto;

	flex: 1 1 auto;

	min-width: 0;
}


/* 標題容器 */
.title-container {
	position: relative;

	width: 100%;
	max-width: 100%;

	height: 100%;

	overflow: hidden;
}


/* 一般標題 */
.title-single {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;

	overflow: hidden;

	text-overflow: ellipsis;
}


/* Hover 預覽標題 */
.title-preview {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;

	overflow: hidden;
}


/* 標題切換軌道 */
.title-track {
	display: flex;

	align-items: center;

	width: max-content;

	height: 100%;

	white-space: nowrap;
}


/* 標題原始內容 */
.title-base {
	display: flex;

	align-items: center;

	white-space: nowrap;
}


/* 標題切換箭頭 */
.title-arrow {
	margin: 0 clamp(6px, 0.6vw, 12px);

	opacity: 0.6;

	font-size: 0.85em;

	font-weight: bold;
}


/* 切換後的標題 */
.title-next {
	white-space: nowrap;
}


/* 標題切換動畫 */
.title-track-moving {
	animation:
		titlePush 0.45s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}


/* 標題向左推出動畫 */
@keyframes titlePush {

	from {
		transform: translateX(0);
	}

	to {
		transform:
			translateX(calc(-1 * var(--push-distance)));
	}

}


/******************
***** 技能導覽 *****
******************/

/* 技能 Icon Grid */
.icon-grid-container {
	flex: 0 0 auto;

	display: flex;

	flex-wrap: nowrap;

	align-items: center;

	gap: clamp(2px, 0.35vh, 6px);

	padding: clamp(3px, 0.5vh, 8px);

	background:
		rgba(35, 22, 10, 0.72);

	border:
		1px solid rgba(250, 171, 0, 0.18);

	border-radius:
		clamp(6px, 0.6vh, 12px);

	box-shadow:
		0 4px 20px rgba(0, 0, 0, 0.35),
		inset 0 0 12px rgba(250, 171, 0, 0.04);

	backdrop-filter: blur(8px);

	z-index: 1000;
}


/* 技能 Icon */
.icon-item {
	width: clamp(28px, 4vh, 52px);
	height: clamp(28px, 4vh, 52px);

	flex: 0 0 auto;

	display: flex;

	align-items: center;
	justify-content: center;

	cursor: pointer;

	transition:
		opacity 0.2s,
		transform 0.2s;

	border-radius:
		clamp(6px, 0.6vh, 10px);

	background: transparent;

	border: none;

	opacity: 0.4;
}


/* Icon 滑入效果 */
.icon-item:hover {
	opacity: 1;

	transform: scale(1.12);

	background:
		rgba(250, 171, 0, 0.08);

	box-shadow:
		0 0 8px rgba(250, 171, 0, 0.18);
}


/* 目前選取的 Icon */
.icon-item.active {
	opacity: 1;

	box-shadow:
		0 0 0 0.1px rgba(12, 8, 0, 0.17),
		0 0 6px rgba(250, 171, 0, 0.25);

	filter:
		drop-shadow(0 0 5px rgba(250, 171, 0, 0.8)) drop-shadow(0 0 12px rgba(250, 171, 0, 0.3));
}


/* Icon 圖片 */
.icon-item img {
	width: 78%;
	height: 78%;

	object-fit: contain;
}

/* 標題區底部分隔線 */
.title-area hr {
	margin: clamp(6px, 1vh, 12px) 0 0;
}
</style>