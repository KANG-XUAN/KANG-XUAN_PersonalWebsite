<template>
    <nav class="dot-nav">

        <a href="#step1" :class="{
            active: activeId === 'step1',
            'free-dot': freeSections.has('step1')
        }"></a>

        <a href="#step2" :class="{
            active: activeId === 'step2',
            'free-dot': freeSections.has('step2')
        }" :style="{
            '--progress': freeProgress
        }"></a>

        <a href="#step3" :class="{
            active: activeId === 'step3',
            'free-dot': freeSections.has('step3')
        }"></a>

        <a href="#step4" :class="{
            active: activeId === 'step4',
            'free-dot': freeSections.has('step4')
        }"></a>

    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeId = ref(null)

// 哪些區塊屬於自由滾動
// const freeSections = new Set([
//     'step2'
// ])
const freeSections = ref(new Set())

const freeProgress = ref(0)

function updateFreeProgress() {
    // 目前不是自由滾動區塊
    if (!freeSections.value.has(activeId.value)) {
        freeProgress.value = 0
        return
    }

    const section = document.getElementById(activeId.value)

    if (!section) return

    const rect = section.getBoundingClientRect()

    const scrollableHeight = section.scrollHeight - window.innerHeight

    if (scrollableHeight <= 0) {
        freeProgress.value = 0
        return
    }

    const progress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
    )

    freeProgress.value = progress
}

function updateActiveSection() {
    if (!scrollContainer) return

    const sections = document.querySelectorAll('.step')

    // 目前畫面正中央對應到 fullpage-wrapper 的哪個位置
    const center =
        scrollContainer.scrollTop +
        window.innerHeight / 2

    let currentSection = null

    sections.forEach(section => {
        const top = section.offsetTop
        const bottom = top + section.offsetHeight

        if (center >= top && center < bottom) {
            currentSection = section
        }
    })

    if (currentSection) {
        activeId.value = currentSection.id
    }

    updateFreeProgress()
}

let scrollContainer = null

onMounted(() => {
    scrollContainer = document.querySelector('.fullpage-wrapper')

    // 自動抓取所有自由滾動區塊
    const freeSectionElements =
        document.querySelectorAll('.step.free-scroll')

    freeSections.value = new Set(
        [...freeSectionElements].map(section => section.id)
    )

    // 初始化目前區塊
    updateActiveSection()

    // 滾動時重新判斷目前區塊
    scrollContainer?.addEventListener(
        'scroll',
        updateActiveSection
    )
})

onUnmounted(() => {
    if (scrollContainer) {
        scrollContainer.removeEventListener(
            'scroll',
            updateActiveSection
        )
    }
})
</script>

<style scoped>
.dot-nav {
    /* =========================
       導覽尺寸設定
    ========================= */

    /* 一般圓點 / 移動圓球 */
    --dot-size: 12px;
    /* 未選中的自由區塊高度 */
    --free-dot-height: calc(var(--dot-size) * 2);
    /* 自由區塊膠囊高度 */
    --track-height: calc(var(--dot-size) * 4);

    /* 圓點之間距離 */
    --dot-gap: 14px;

    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    flex-direction: column;
    gap: var(--dot-gap);

    z-index: 1000;
}

/* 一般 dot：小圓點 */
.dot-nav a {
    width: var(--dot-size);
    height: var(--dot-size);

    margin-left: auto;
    background-color: #444;
    /* 夜色灰 */
    border-radius: 50%;
    display: block;
    transition: all 0.3s ease;
}

/* 未選中自由區塊 */
.dot-nav a.free-dot {
    width: var(--dot-size);
    height: var(--free-dot-height);

    border-radius: 999px;
}

/* 自由區塊 dot : 膠囊型 */
/* 自由滾動區塊：只有目前所在區塊才變成膠囊 */
.dot-nav a.free-dot.active {
    position: relative;

    width: var(--dot-size);
    height: var(--track-height);

    background-color: #444;

    border-radius: 999px;
    overflow: hidden;

    box-shadow:
        0 0 12px rgba(255, 179, 71, 0.4);
}

/* 進度填色 */
.dot-nav a.free-dot.active::before {
    content: '';

    position: absolute;

    left: 0;
    top: 0;

    width: 100%;

    height: calc(var(--dot-size) / 2 + var(--progress) * (var(--track-height) - var(--dot-size)));

    background-color: #ffb347;

    border-radius: 0;

    transition: height 0.15s ease;

    z-index: 1;
}

/* =========================
   移動中的圓球
========================= */

.dot-nav a.free-dot.active::after {
    content: '';

    position: absolute;

    left: 50%;

    top: calc(var(--dot-size) / 2 + var(--progress) * (var(--track-height) - var(--dot-size)));

    width: var(--dot-size);
    height: var(--dot-size);

    transform: translate(-50%, -50%);

    background-color: #ffb347;

    border-radius: 50%;

    box-shadow:
        0 0 8px rgba(255, 179, 71, 0.9),
        0 0 14px rgba(255, 140, 0, 0.45);

    transition: top 0.15s ease;

    z-index: 2;
}

/* hover */
.dot-nav a:hover {
    background-color: #666;
}

/* 當前 dot：橢圓形向左延展，右側平，燭火光暈 */
.dot-nav a.active {
    width: 28px;
    height: var(--dot-size);
    background-color: #ffb347;
    /* 燭火橘黃 */
    border-radius: var(--dot-size) 0 0 var(--dot-size);
    /* 左圓右平 */
    margin-right: 0;

    /* 燭光光暈 */
    box-shadow:
        -4px 0 12px rgba(255, 179, 71, 0.6),
        -2px 0 6px rgba(255, 140, 0, 0.5);
}
</style>
