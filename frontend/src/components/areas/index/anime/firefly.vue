<template>
  <!-- 黑夜遮罩層（整合滑鼠與螢火蟲破口） -->
  <div class="dark-overlay" :style="maskStyle"></div>

  <!-- 螢火蟲容器(限定範圍) -->
  <div class="fireflies-container" ref="firefliesContainerRef">
    <div v-for="(firefly, index) in fireflies" :key="index" class="firefly"
      :style="{ top: firefly.y + 'px', left: firefly.x + 'px' }"></div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 記錄滑鼠的 X 和 Y 座標，初始值為視窗的中心點
const mouseX = ref(window.innerWidth / 2)
const mouseY = ref(window.innerHeight / 2)

// 用來存放螢火蟲的數據，包含位置、速度和目標位置等
const fireflies = ref([])

// 用來引用螢火蟲容器的 DOM 元素，這樣可以取得容器的尺寸
const firefliesContainerRef = ref(null)

// 用來存放動態更新的遮罩層樣式
const maskStyle = ref({})

// 設定螢火蟲的數量(歲數)
const birth = new Date('2001-03-20');
const now = new Date();
const age = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), 2, 20));

const fireflyCount = age;
// const fireflyCount = 12

// 創建初始的螢火蟲
function createFireflies() {
  // 取得螢火蟲容器的尺寸（寬和高），用來限制螢火蟲的隨機位置
  const rect = firefliesContainerRef.value.getBoundingClientRect()

  // 生成指定數量的螢火蟲，每個螢火蟲有 x、y 座標，以及目標位置 (targetX, targetY)
  fireflies.value = Array.from({ length: fireflyCount }).map(() => ({
    // 隨機生成螢火蟲的初始位置
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,

    // 初始速度為 0
    vx: 0,
    vy: 0,

    // 隨機生成螢火蟲的目標位置
    targetX: Math.random() * rect.width,
    targetY: Math.random() * rect.height,
  }))
}

// 更新遮罩層的樣式
function updateMaskStyle() {
  // 根據所有螢火蟲的當前位置，生成一個個圓形遮罩
  const fireflyMasks = fireflies.value.map(
    (f) =>
      `radial-gradient(circle 60px at ${f.x}px ${f.y}px, transparent 0%, black 100%)`
  )

  // 根據滑鼠位置生成一個大的圓形遮罩
  const mouseMask = `radial-gradient(circle 120px at ${mouseX.value}px ${mouseY.value}px, transparent 60%, black 100%)`

  // 合併滑鼠遮罩和螢火蟲遮罩
  const combinedMask = [mouseMask, ...fireflyMasks].join(',')

  // 設置遮罩層的樣式，使用 WebKit 和標準的 mask 屬性來達到兼容效果
  maskStyle.value = {
    WebkitMaskImage: combinedMask,  // WebKit 引擎下的遮罩圖像（例如在 Safari 或舊版 Chrome 中需要）
    maskImage: combinedMask,        // 標準的遮罩圖像，適用於大多數現代瀏覽器（Chrome、Firefox 等）

    WebkitMaskComposite: 'destination-out',  // WebKit 引擎下的遮罩合成方式，'destination-out' 會讓遮罩區域變透明
    maskComposite: 'exclude',              // 標準的遮罩合成方式，'exclude' 也是讓遮罩區域變透明

    WebkitMaskRepeat: 'no-repeat',    // WebKit 引擎下的遮罩圖像是否重複，這裡設置為不重複
    maskRepeat: 'no-repeat',          // 標準的遮罩圖像是否重複，這裡設置為不重複

    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 半透明的背景顏色，可以在遮罩的背景下顯示一些顏色效果（這不影響遮罩區域，但會影響遮罩的背景）

    position: 'absolute',           // 絕對定位，使得遮罩層可以精確定位
    top: 0,                         // 遮罩層的上邊緣從父元素的頂部開始
    left: 0,                        // 遮罩層的左邊緣從父元素的左邊開始
    width: '100%',                  // 遮罩層寬度佔據父元素的 100%
    height: '100%',                 // 遮罩層高度佔據父元素的 100%

    pointerEvents: 'none',          // 禁用遮罩層的互動，這意味著用戶無法與遮罩層進行任何互動（比如點擊）

    zIndex: 1,                      // 設置遮罩層在堆疊順序中的層級，確保它在最上層
  }

}

// 螢火蟲移動動畫
function animateFireflies() {
  // 取得螢火蟲容器的尺寸，這樣我們可以在容器範圍內移動螢火蟲
  const rect = firefliesContainerRef.value.getBoundingClientRect()

  // 更新每一隻螢火蟲的位置
  fireflies.value.forEach((f) => {
    // 計算螢火蟲和目標位置之間的距離
    const dx = f.targetX - f.x
    const dy = f.targetY - f.y
    const distance = Math.hypot(dx, dy) // 使用畢氏定理計算距離

    // 計算目標位置的角度
    const angle = Math.atan2(dy, dx)

    // 設定螢火蟲移動的速度
    const speed = 0.3
    const turn = 0.02

    // 計算螢火蟲的期望速度，根據角度和速度計算 X 和 Y 軸的速度
    const desiredVx = Math.cos(angle) * speed
    const desiredVy = Math.sin(angle) * speed

    // 根據期望速度來調整當前速度
    f.vx += (desiredVx - f.vx) * turn
    f.vy += (desiredVy - f.vy) * turn

    // 更新螢火蟲的位置
    f.x += f.vx
    f.y += f.vy

    // 如果螢火蟲已經接近目標位置，重新設定一個新的隨機目標位置
    if (distance < 30) {
      f.targetX = Math.random() * rect.width
      f.targetY = Math.random() * rect.height
    }
  })

  // 更新遮罩層的樣式（每幀都會更新）
  updateMaskStyle()

  // 呼叫 requestAnimationFrame，繼續下一幀的動畫
  requestAnimationFrame(animateFireflies)
}

// 處理滑鼠移動事件
function handleMouseMove(e) {
  // 更新滑鼠的 X 和 Y 座標
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

// 當元件掛載完成後執行的操作
onMounted(() => {
  // 監聽滑鼠移動事件
  window.addEventListener('mousemove', handleMouseMove)

  // 創建螢火蟲並開始動畫
  createFireflies()
  animateFireflies()
})

// 當元件卸載之前清理操作
onBeforeUnmount(() => {
  // 移除滑鼠移動事件監聽器
  window.removeEventListener('mousemove', handleMouseMove)
})

</script>

<style scoped>
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  cursor: none !important; /* 隐藏默认鼠标指针 */
  z-index: 1;

  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}

.fireflies-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.firefly {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #fff9c4;
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0 0 10px 3px rgba(255, 255, 200, 0.5);
  animation: flicker 2s infinite ease-in-out;
}

@keyframes flicker {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}
</style>