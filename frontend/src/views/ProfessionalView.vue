<template>
    <div id="professional">

        <div class="container-fluid">
            <div class="row">
                <HeaderCommon />
            </div>
        </div>


        <div class="container-fluid professional-content">
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
#professional {
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    background-color: #472500;
    background-image: url("https://www.transparenttextures.com/patterns/dark-wood.png");
}


/*
 * ProfessionalPage 所在的區域
 *
 * Header / Footer 多高都沒關係，
 * 這裡自動吃剩下的高度。
 */
.professional-content {
    flex: 1;
    min-height: 0;

    display: flex;
}

.professional-content .row {
    flex: 1 !important;
}
</style>