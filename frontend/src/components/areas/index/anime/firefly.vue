<template>
  <!-- 黑夜遮罩層（整合滑鼠與螢火蟲破口） -->
  <div class="dark-overlay" :style="maskStyle"></div>

  <!-- 螢火蟲容器 -->
  <div class="fireflies-container" ref="firefliesContainerRef">
    <div
      v-for="(firefly, index) in fireflies"
      :key="index"
      class="firefly"
      :style="{ top: firefly.y + 'px', left: firefly.x + 'px' }"
    ></div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const mouseX = ref(window.innerWidth / 2)
const mouseY = ref(window.innerHeight / 2)
const fireflies = ref([])
const firefliesContainerRef = ref(null)
const maskStyle = ref({})
const fireflyCount = 20

function createFireflies() {
  const rect = firefliesContainerRef.value.getBoundingClientRect()
  fireflies.value = Array.from({ length: fireflyCount }).map(() => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    vx: 0,
    vy: 0,
    targetX: Math.random() * rect.width,
    targetY: Math.random() * rect.height,
  }))
}

function updateMaskStyle() {
  const fireflyMasks = fireflies.value.map(
    (f) =>
      `radial-gradient(circle 60px at ${f.x}px ${f.y}px, transparent 0%, black 100%)`
  )

  const mouseMask = `radial-gradient(circle 120px at ${mouseX.value}px ${mouseY.value}px, transparent 0%, black 100%)`
  const combinedMask = [mouseMask, ...fireflyMasks].join(',')

  maskStyle.value = {
    WebkitMaskImage: combinedMask,
    maskImage: combinedMask,
    WebkitMaskComposite: 'destination-out',
    maskComposite: 'exclude',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  }
}

function animateFireflies() {
  const rect = firefliesContainerRef.value.getBoundingClientRect()
  fireflies.value.forEach((f) => {
    const dx = f.targetX - f.x
    const dy = f.targetY - f.y
    const distance = Math.hypot(dx, dy)

    const angle = Math.atan2(dy, dx)
    const speed = 0.3
    const turn = 0.02
    const desiredVx = Math.cos(angle) * speed
    const desiredVy = Math.sin(angle) * speed

    f.vx += (desiredVx - f.vx) * turn
    f.vy += (desiredVy - f.vy) * turn
    f.x += f.vx
    f.y += f.vy

    if (distance < 30) {
      f.targetX = Math.random() * rect.width
      f.targetY = Math.random() * rect.height
    }
  })

  updateMaskStyle()
  requestAnimationFrame(animateFireflies)
}

function handleMouseMove(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  createFireflies()
  animateFireflies()
})

onBeforeUnmount(() => {
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