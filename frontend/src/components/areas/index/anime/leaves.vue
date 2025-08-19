<template>
	<div class="leaves-container">
		<div v-for="leaf in leaves" :key="leaf.id" class="leaf" :style="{
			left: (leaf.x + leaf.amplitude * Math.sin(leaf.angle)) + 'px',
			top: leaf.y + 'px',
			transform: 'rotate(' + (leaf.angle * 180 / Math.PI) + 'deg)'
		}">
			<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
				<path :d="leafPaths[leaf.svgIndex]" :fill="leaf.color" />
			</svg>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 動畫-葉落

const leaves = ref([]);

const leafPaths = [
	// 原始的
	"M5 10 Q15 0 25 15 Q20 30 10 35 Q2 25 5 10 Z",					// 深葉型
	"M5 5 Q15 10 20 20 Q10 35 0 25 Q5 15 5 5 Z", 					// 不規則型
	"M4 12 Q12 0 22 10 Q28 22 18 34 Q8 38 2 28 Q0 20 4 12 Z",     	// 長彎葉
	"M6 8 Q16 2 26 16 Q20 28 12 32 Q4 28 3 20 Q2 14 6 8 Z",         // 左偏葉
	"M3 9 Q14 -1 24 13 Q19 29 11 33 Q3 27 1 18 Q1 13 3 9 Z",        // 鋸齒邊感
	"M5 6 Q17 5 23 17 Q15 30 6 33 Q2 26 3 18 Q3 11 5 6 Z",          // 比較寬厚葉
	"M7 7 Q17 4 21 14 Q22 25 12 30 Q2 26 5 18 Q5 12 7 7 Z",         // 右偏中空葉
	"M4 6 Q16 3 20 13 Q22 26 14 32 Q5 29 3 20 Q1 13 4 6 Z",         // 反向弧度
	"M6 9 Q14 4 22 14 Q20 24 13 30 Q5 27 4 18 Q4 13 6 9 Z",         // 扭曲型
	"M4 8 Q14 2 24 12 Q22 26 12 32 Q3 26 2 16 Q2 12 4 8 Z",         // 彎曲中長葉
]

// function getRandomColor() {
// 	const base = 6
// 	const r = 0
// 	const g = Math.floor(base + Math.random() * 20)
// 	const b = Math.floor(base + Math.random() * 20)
// 	return `rgb(${r}, ${g}, ${b})`
// }

function getLeafColor(alpha = 0.8) {
	const r = Math.floor(20 + Math.random() * 40)     // 20–60，偏少紅
	const g = Math.floor(100 + Math.random() * 100)   // 100–200，主色是綠
	const b = Math.floor(20 + Math.random() * 50)     // 20–70，偏少藍
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function generateLeaves(count = 24) {
	const screenWidth = window.innerWidth
	const newLeaves = []

	for (let i = 0; i < count; i++) {
		newLeaves.push({
			id: i,
			x: Math.random() * screenWidth,
			y: Math.random() * window.innerHeight * -1,  // 最多從螢幕外上方開始飄下
			speedY: 1 + Math.random() * 2,
			amplitude: 10 + Math.random() * 20,
			angle: Math.random() * 2 * Math.PI,
			angleSpeed: 0.01 + Math.random() * 0.02,
			svgIndex: Math.floor(Math.random() * leafPaths.length),
			rotateDirection: Math.random() > 0.5 ? 1 : -1,
			color: getLeafColor(0.2),
		})
	}

	leaves.value = newLeaves
}

let animationId;
function animateLeaves() {
	const screenHeight = window.innerHeight

	leaves.value.forEach((leaf) => {
		leaf.y += leaf.speedY
		if (leaf.y > screenHeight) {
			leaf.y = 0
			leaf.x = Math.random() * window.innerWidth
		}
		leaf.angle += leaf.angleSpeed * leaf.rotateDirection
	})

	animationId = requestAnimationFrame(animateLeaves)
}


onMounted(() => {
	generateLeaves();
	animateLeaves();
});

onBeforeUnmount(() => {
	cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.leaves-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 1;
}

.leaf {
	position: absolute;
	width: 30px;
	height: 40px;
	user-select: none;
}

.leaf svg {
	width: 30px;
	height: 40px;
	animation: leafRotate 10s linear infinite;
	transform-origin: 50% 50%;
}

@keyframes leafRotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>