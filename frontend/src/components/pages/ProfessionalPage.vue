<template>

    <div class="page p-0">

        <div class="professional-layout">

            <!-- 左邊輪盤 -->
            <CarouselArea :currentIndex="currentIndex" :hoverIndex="hoverIndex"
                @update:currentIndex="currentIndex = $event" @update:hoverIndex="hoverIndex = $event"
                @select="handleSelect" />


            <!-- 右側內容 -->
            <div class="content-area">

                <!-- 標題 -->
                <TitleArea :currentIndex="currentIndex" :hoverIndex="hoverIndex" :animationKey="animationKey" />


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


/* =========================
 * Areas
 * ========================= */

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
/* =========================
 * Page
 * ========================= */

.page {

    height: 100%;

}


/* =========================
 * Professional Layout
 * ========================= */

.professional-layout {

    display: flex;

    height: 100%;

}


/* =========================
 * 右側所有內容
 * ========================= */

.content-area {

    position: absolute;

    left: 150px;

    top: 75px;

    z-index: 10;

    width:
        calc(100vw - 250px);

    color: white;

    font-size: 32px;

}


/* =========================
 * 下方左右區域
 * ========================= */

.content-layout {

    position: relative;

    display: grid;

    grid-template-columns:
        minmax(0, 1fr) 220px;

    column-gap: 50px;

    margin-top: 30px;

    width: 100%;

}


/* =========================
 * 左側主要內容
 * ========================= */

.content-main {

    display: flex;

    flex-direction: column;

    min-width: 0;

}
</style>