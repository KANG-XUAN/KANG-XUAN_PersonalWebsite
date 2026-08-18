<template>

    <div class="page p-0">

        <div class="professional-layout">

            <!-- 左邊輪盤 -->
            <div class="carousel-area">
                <CarouselArea :currentIndex="currentIndex" :hoverIndex="hoverIndex"
                    @update:currentIndex="currentIndex = $event" @update:hoverIndex="hoverIndex = $event"
                    @select="handleSelect" />
            </div>

            <!-- 中間主體內容 -->
            <div class="content-area">

                <!-- 標題 -->
                <TitleArea :currentIndex="currentIndex" :hoverIndex="hoverIndex" :animationKey="animationKey"
                    @update:currentIndex="currentIndex = $event" @update:hoverIndex="hoverIndex = $event"
                    @select="handleSelect" />

                <!-- 下方內容 -->
                <div class="content-layout">

                    <!-- 左側主要內容 -->
                    <div class="content-main">

                        <!-- 簡介 -->
                        <DescribeArea :currentIndex="currentIndex" :hoverIndex="hoverIndex" />

                        <!-- 詳細內容 -->
                        <DetailArea :currentIndex="currentIndex" :hoverIndex="hoverIndex"
                            :animationKey="animationKey" />

                        <!--
							圖片卡

							從 DetailArea 拆出來之後，
							由 ProfessionalPage 直接組裝。
						-->
                        <CardArea :currentIndex="currentIndex" :hoverIndex="hoverIndex" :animationKey="animationKey" />

                    </div>

                    <!-- 右側列表 -->
                    <SideListArea :currentIndex="currentIndex" :hoverIndex="hoverIndex" :animationKey="animationKey" />

                </div>

            </div>

        </div>

    </div>

</template>

<script setup>

import { ref } from 'vue'

import CarouselArea
    from '../areas/professional/CarouselArea.vue'

import TitleArea
    from '../areas/professional/TitleArea.vue'

import DescribeArea
    from '../areas/professional/DescribeArea.vue'

import DetailArea
    from '../areas/professional/DetailArea.vue'

import CardArea
    from '../areas/professional/CardArea.vue'

import SideListArea
    from '../areas/professional/SideListArea.vue'

/* =========================
 * 狀態
 * ========================= */

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
 * 正式選取動畫觸發次數
 *
 * 每正式選取一次 +1
 *
 * Hover 不會改變
 */
const animationKey = ref(0)

/* =========================
 * 正式選取
 * ========================= */

function handleSelect(index) {

    currentIndex.value = index

    /*
     * 觸發：
     *
     * DetailArea
     * CardArea
     * TitleArea
     *
     * 所需要的正式切換動畫
     */
    animationKey.value++

}

</script>

<style scoped>
/* Page */
.page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

/* 整體左右切版 */
.professional-layout {
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    box-sizing: border-box;
}

/* 左側輪盤 */
.carousel-area {
    flex: 0 0 clamp(60px, 14vh, 240px);
    height: 100%;
    min-width: 0;
    min-height: 0;
    display: flex;
    justify-content: center;
}

/* 右側主要內容 */
.content-area {
    position: relative;
    flex: 1 1 auto;
    width: auto;
    height: 100%;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: clamp(50px, 7vh, 80px) clamp(30px, 3vw, 70px) clamp(30px, 4vh, 80px) clamp(10px, 1vw, 70px);
    color: white;
    font-size: clamp(24px, 2vw, 36px);
    z-index: 10;
    overflow: hidden;
    box-sizing: border-box;
}

/* 標題區 */
.content-area> :first-child {
    flex: 0 0 auto;
    width: 100%;
    height: clamp(60px, 8vh, 120px);
    min-height: 0;
}

/* 標題以下內容區 */
.content-layout {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(180px, 15vw, 360px);
    column-gap: clamp(20px, 3vw, 60px);
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    min-height: 0;
    margin-top: clamp(20px, 2.5vh, 40px);
    overflow: hidden;
    box-sizing: border-box;
}

/* 左側圖文區 */
.content-main {
    display: grid;

    grid-template-rows:
        auto minmax(0, 1fr) 35%;

    row-gap: 3.6vh;

    width: 100%;
    height: 100%;

    min-width: 0;
    min-height: 0;

    overflow: hidden;

    box-sizing: border-box;
}

/* 簡介區 */
.content-main> :nth-child(1) {
    width: 100%;
    min-width: 0;
    min-height: 0;
}

/* 詳細內容區 */
.content-main> :nth-child(2) {
    width: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
}

/* 圖片卡區 */
.content-main> :nth-child(3) {
    align-self: end;
    width: 100%;
    min-width: 0;
    min-height: 0;
}
</style>