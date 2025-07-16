<template>
  <nav class="dot-nav">
    <a href="#step1" :class="{ active: activeId === 'step1' }"></a>
    <a href="#step2" :class="{ active: activeId === 'step2' }"></a>
    <a href="#step3" :class="{ active: activeId === 'step3' }"></a>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeId = ref(null)

onMounted(() => {
  const sections = document.querySelectorAll('.step-section')

  const observer = new IntersectionObserver(
    entries => {
      let maxRatio = 0
      let visibleSectionId = null

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          visibleSectionId = entry.target.id
        }
      })

      if (visibleSectionId) {
        activeId.value = visibleSectionId
      }
    },
    {
      threshold: Array.from({ length: 100 }, (_, i) => i / 100) // 更細緻的比率追蹤
    }
  )

  sections.forEach(section => observer.observe(section))

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
.dot-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 1000;
}

/* 一般 dot：小圓點 */
.dot-nav a {
  width: 12px;
  height: 12px;
  margin-left: auto;
  background-color: #444;
  /* 夜色灰 */
  border-radius: 50%;
  display: block;
  transition: all 0.3s ease;
}

/* hover */
.dot-nav a:hover {
  background-color: #666;
}

/* 當前 dot：橢圓形向左延展，右側平，燭火光暈 */
.dot-nav a.active {
  width: 28px;
  height: 12px;
  background-color: #ffb347;
  /* 燭火橘黃 */
  border-radius: 12px 0 0 12px;
  /* 左圓右平 */
  margin-right: 0;

  /* 燭光光暈 */
  box-shadow:
    -4px 0 12px rgba(255, 179, 71, 0.6),
    -2px 0 6px rgba(255, 140, 0, 0.5);
}
</style>
