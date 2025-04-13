<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FormBasic from './components/FormBasic.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { STATUS_CODE_SUCCESS } from '@/helpers'
import { useI18n } from 'vue3-i18n'
const { params } = useRoute()
const router = useRouter()
const productStore = useProductStore()
const data = ref()
const { t } = useI18n()

onMounted(async () => {
    const product = await productStore.detail(+params.id)
    const { status_code } = product
    if (status_code === STATUS_CODE_SUCCESS) {
        return (data.value = product)
    }
    router.push({ name: 'page-not-found' })
})
</script>

<template>
    <section class="content-layout">
        <div class="title">{{ t('products.update.title') }}</div>
        <FormBasic v-if="data" :data="data" />
    </section>
</template>
