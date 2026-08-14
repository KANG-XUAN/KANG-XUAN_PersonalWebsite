<template>
    <div id="professional">

        <div class="container-fluid">
            <div class="row">
                <HeaderCommon />
            </div>
        </div>


        <div class="container-fluid professional-content var-professional">
            <div class="row">
                <ProfessionalPage />
            </div>
        </div>


        <div class="container-fluid">
            <div class="row">
                <FooterCommon />
            </div>
        </div>

    </div>
</template>

<script setup>
import ProfessionalPage from '@/components/pages/ProfessionalPage.vue'
import HeaderCommon from '@/components/common/HeaderCommon.vue'
import FooterCommon from '@/components/common/FooterCommon.vue'
</script>

<style scoped>
.var-professional {
    /* 這裡可以把 professional 所有子頁面的CSS變數移到這邊一併管理 */
}

#professional {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    background-color: #472500;
    background-image: url("https://www.transparenttextures.com/patterns/dark-wood.png");
}

/* ProfessionalPage 所在的區域 */
.professional-content {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;

    display: flex;
    overflow: hidden;
}

/* Bootstrap Row */
.professional-content .row {
    flex: 1 1 auto !important;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
}
</style>