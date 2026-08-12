<template>
	<!-- 輪盤 Carousel：左側，100% 高 -->
	<div class="carousel-container" @wheel.prevent="handleWheel">
		<div class="carousel-wrapper">
			<div class="carousel-decoration top">
				𖤂
			</div>

			<div class="carousel">
				<div v-for="(skill, i) in displayedIcons" :key="i" class="carousel-item"
					:class="{ active: i === middleIndex }" :style="getCarouselStyle(i)">
					<img :src="skill.icon" class="carousel-img" :alt="skill.title" />
				</div>
			</div>

			<div class="carousel-decoration bottom">
				𖤂
			</div>
		</div>
	</div>


	<!-- 橫列 Icon Grid：右上 -->
	<div class="icon-grid-container">
		<div v-for="(skill, i) in skills" :key="skill.id" class="icon-item"
			:class="{ active: i === props.currentIndex }" @click="selectIcon(i)" @mouseover="setHoverIndex(i)"
			@mouseleave="clearHoverIndex">
			<img :src="skill.icon" :alt="skill.title" :title="skill.title" />
		</div>
	</div>
</template>


<script setup>
import { computed, ref } from 'vue'


// JSON 資料
import data from './data.json'


// Icon
import WordIcon from '@/assets/images/icon/Word.png'
import ExcelIcon from '@/assets/images/icon/Excel.png'
import PowerPointIcon from '@/assets/images/icon/PowerPoint.png'
import IllustratorIcon from '@/assets/images/icon/Illustrator.png'
import HtmlIcon from '@/assets/images/icon/HTML.png'
import JavaIcon from '@/assets/images/icon/Java.png'
import Vue2Icon from '@/assets/images/icon/Vue2.png'
import NodeJSIcon from '@/assets/images/icon/NodeJS.png'
import CloudIcon from '@/assets/images/icon/Cloud.png'


/*
 * =========================================================
 * 接收父頁面的狀態
 * =========================================================
 *
 * currentIndex：
 * 正式選取的技能
 *
 * hoverIndex：
 * 滑鼠目前預覽的技能
 */

const props = defineProps({
	currentIndex: {
		type: Number,
		default: 0
	},

	hoverIndex: {
		type: Number,
		default: null
	}
})


/*
 * 父元件事件
 *
 * update:currentIndex
 * → 正式選取某個技能
 *
 * update:hoverIndex
 * → 滑鼠 hover 某個技能
 */
const emit = defineEmits([
	'update:currentIndex',
	'update:hoverIndex',
	'select'
])


/*
 * =========================================================
 * 技能資料
 * =========================================================
 */

const iconMap = {
	'HTML.png': HtmlIcon,
	'Vue2.png': Vue2Icon,
	'Node.png': NodeJSIcon,
	'Java.png': JavaIcon,
	'Cloud.png': CloudIcon,
	'Word.png': WordIcon,
	'Excel.png': ExcelIcon,
	'PowerPoint.png': PowerPointIcon,
	'Illustrator.png': IllustratorIcon,
}


/*
 * 將 JSON 資料轉換成畫面真正使用的 skills
 */

const skills = computed(() => {
	return data.skills.map(skill => ({
		...skill,
		icon: iconMap[skill.icon],
	}))
})


/*
 * =========================================================
 * 輪盤內部狀態
 * =========================================================
 *
 * isScrolling 不屬於「選取狀態」，
 * 所以可以留在 Carousel 自己管理。
 */

const isScrolling = ref(false)


/*
 * =========================================================
 * Hover / 正式選取
 * =========================================================
 *
 * activeIndex：
 *
 * 有 hover
 * → 顯示 hover 的位置
 *
 * 沒有 hover
 * → 顯示正式選取的位置
 */

const activeIndex = computed(() => {
	return props.hoverIndex !== null
		? props.hoverIndex
		: props.currentIndex
})


/*
 * =========================================================
 * 輪盤設定
 * =========================================================
 */

const VISIBLE_COUNT = 9
const middleIndex = Math.floor(VISIBLE_COUNT / 2)


/*
 * 取得輪盤目前要顯示的 9 個 Icon
 */

const displayedIcons = computed(() => {
	const result = []
	const total = skills.value.length
	const center = activeIndex.value

	for (
		let offset = -middleIndex;
		offset <= middleIndex;
		offset++
	) {
		const index =
			(center + offset + total) % total

		result.push(skills.value[index])
	}

	return result
})


/*
 * =========================================================
 * Hover
 * =========================================================
 */

function setHoverIndex(index) {
	emit('update:hoverIndex', index)
}


function clearHoverIndex() {
	emit('update:hoverIndex', null)
}


/*
 * =========================================================
 * 點擊 Icon
 * =========================================================
 */



function selectIcon(index) {
	// 通知父層更新正式選取
	emit('update:currentIndex', index)

	// 通知父層：這是一次「正式選取」
	emit('select', index)
}


/*
 * =========================================================
 * 左側輪盤 - 滾輪切換
 * =========================================================
 */

function handleWheel(event) {
	if (isScrolling.value) return

	isScrolling.value = true

	let newIndex

	if (event.deltaY > 0) {
		newIndex =
			(props.currentIndex + 1) % skills.value.length
	} else {
		newIndex =
			(props.currentIndex - 1 + skills.value.length)
			% skills.value.length
	}

	// 更新父層的正式選取
	emit('update:currentIndex', newIndex)

	// 通知父層：這是一次「正式選取」
	emit('select', newIndex)

	setTimeout(() => {
		isScrolling.value = false
	}, 60)
}


/*
 * =========================================================
 * 左側輪盤 - 距中透明度
 * =========================================================
 */

function getCarouselStyle(index) {
	const distance = Math.abs(index - middleIndex)

	const opacityMap = [
		1.0,   // 中間
		0.7,   // 距離 1
		0.45,  // 距離 2
		0.25,  // 距離 3
		0.1,   // 距離 4
	]

	const scaleMap = [
		1.2,   // 中間
		0.95,  // 距離 1
		0.75,  // 距離 2
		0.6,   // 距離 3
		0.5,   // 距離 4
	]

	const offsetMap = [
		0,      // 中間
		70,     // 距離 1
		130,    // 距離 2
		180,    // 距離 3
		220,    // 距離 4
	]

	const offset = offsetMap[distance] ?? 172

	// index 比 middleIndex 大 → 往下
	// index 比 middleIndex 小 → 往上
	const direction = index - middleIndex

	return {
		opacity: opacityMap[distance] ?? 0.1,

		transform: `
            translateY(${direction > 0 ? offset : -offset}px)
            scale(${scaleMap[distance] ?? 0.5})
        `,
	}
}
</script>


<style scoped>
/* ✅ 左側輪盤 */
.carousel-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 90px;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
	z-index: 0;
}


.carousel-wrapper {
	width: 100px;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}


.carousel {
	position: relative;
	width: 70px;
	height: 100%;
}


.carousel-item {
	position: absolute;

	left: 0;
	top: 45%;

	width: 70px;
	height: 70px;

	display: flex;
	align-items: center;
	justify-content: center;

	transition:
		opacity 0.3s ease,
		transform 0.3s ease;

	transform-origin: center;
}


.carousel-item.active {
	display: flex;
	justify-content: center;

	transform: scale(1.2);

	filter:
		drop-shadow(0 0 8px rgba(250, 171, 0, 0.85));
}


.carousel-item img {
	width: 50px;
	height: 50px;
	object-fit: contain;
}


.carousel-decoration {
	position: absolute;

	left: 50%;
	top: 50%;

	z-index: 20;

	font-size: 18px;
	color: #756033;

	opacity: 0.65;

	pointer-events: none;

	transform:
		translate(-50%, -50%) scaleX(2.5);

	filter: blur(0.5px);

	text-shadow:
		0 0 3px rgba(250, 171, 0, 0.8),
		0 0 8px rgba(85, 65, 21, 0.45);
}


.carousel-decoration.top {
	margin-top: -250px;
	animation: arrowFloatUp 2s ease-in-out infinite;
}


.carousel-decoration.bottom {
	margin-top: 250px;
	animation: arrowFloatDown 2s ease-in-out infinite;
}


/* 上方箭頭 */
@keyframes arrowFloatUp {

	0%,
	100% {
		transform:
			translate(-50%, -50%) scaleX(3) scaleY(1);
	}

	50% {
		transform:
			translate(-50%, calc(-50% - 6px)) scaleX(2.7) scaleY(0.85);
	}
}


/* 下方箭頭 */
@keyframes arrowFloatDown {

	0%,
	100% {
		transform:
			translate(-50%, -50%) scaleX(3) scaleY(1) rotate(180deg);
	}

	50% {
		transform:
			translate(-50%, calc(-50% + 6px)) scaleX(2.7) scaleY(0.85) rotate(180deg);
	}
}


/* ✅ 右上 ICON GRID */
.icon-grid-container {
	position: fixed;
	top: 65px;
	right: 90px;

	display: flex;
	flex-wrap: wrap;

	background: rgba(35, 22, 10, 0.72);

	padding: 6px;

	border: 1px solid rgba(250, 171, 0, 0.18);
	border-radius: 10px;

	box-shadow:
		0 4px 20px rgba(0, 0, 0, 0.35),
		inset 0 0 12px rgba(250, 171, 0, 0.04);

	backdrop-filter: blur(8px);

	z-index: 1000;

	width: auto;
}


.icon-item {
	width: 30px;
	height: 30px;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	transition:
		opacity 0.2s,
		transform 0.2s;

	border-radius: 8px;

	background: transparent;
    border: none;

	opacity: 0.4;

	&:hover {
		opacity: 1;

		transform: scale(1.12);

		background: rgba(250, 171, 0, 0.08);

		box-shadow:
			0 0 8px rgba(250, 171, 0, 0.18);
	}
}


.icon-item.active {
    opacity: 1;

	box-shadow:
		0 0 0 0.1px rgba(12, 8, 0, 0.17),
		0 0 6px rgba(250, 171, 0, 0.25);

    filter:
        drop-shadow(0 0 5px rgba(250, 171, 0, 0.8))
        drop-shadow(0 0 12px rgba(250, 171, 0, 0.3));
}


.icon-item img {
	width: 25px;
	height: 25px;
	object-fit: contain;
}
</style>
