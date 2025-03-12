<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import TabBanner from './components/TabBanner.vue'
import TabFaq from './components/TabFaq.vue'
import TabRecommend from './components/TabRecommend.vue'

const activeKey = ref('1')
const { t } = useI18n()
</script>

<template>
    <section>
        <div class="title">{{ t('general.title') }}</div>
        <div class="container">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" :tab="t('general.tab.banner')">
                    <TabBanner />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="t('general.tab.faq')">
                    <TabFaq />
                </a-tab-pane>
                <a-tab-pane key="3" :tab="t('general.tab.product_recommend')">
                    <TabRecommend />
                </a-tab-pane>
            </a-tabs>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.container {
    padding: 10px;
}
</style>
