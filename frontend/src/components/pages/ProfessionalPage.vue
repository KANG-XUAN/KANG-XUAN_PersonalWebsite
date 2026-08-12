<template>
    <div class="page p-0">
        <div class="flex h-100">

            <RouletteArea
                :currentIndex="currentIndex"
                :hoverIndex="hoverIndex"
                @update:currentIndex="currentIndex = $event"
                @update:hoverIndex="hoverIndex = $event"
                @select="handleSelect"
            />

            <TestArea
                :currentIndex="currentIndex"
                :hoverIndex="hoverIndex"
                :animationKey="animationKey"
            />

        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'


import RouletteArea from '../areas/professional/CarouselArea.vue'
import TestArea from '../areas/professional/testArea.vue'


/*
 * =========================================================
 * Professional 區域自己的狀態
 * =========================================================
 */


/*
 * 正式選取的技能
 */
const currentIndex = ref(0)


/*
 * 目前 Hover 的技能
 *
 * null = 沒有 Hover
 */
const hoverIndex = ref(null)


/*
 * 正式選取動畫的觸發次數
 *
 * 每正式選取一次，就 +1
 *
 * Hover 不會改變這個數字
 */
const animationKey = ref(0)


/*
 * =========================================================
 * 正式選取
 * =========================================================
 *
 * 只有：
 *
 * 1. 點擊 Icon
 * 2. 滾輪切換
 *
 * 才會觸發這裡。
 */
function handleSelect(index) {
    currentIndex.value = index

    /*
     * 觸發詳細內容重新播放動畫
     */
    animationKey.value++
}
</script>


<style scoped>
.page {
    height: 100%;
}
</style>
