<script lang="ts" setup>
import TableData from '@/components/common/TableData/TableData.vue'
import { INITIAL_QUERY } from '@/helpers'
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'

const productsStore = useProductStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)

onMounted(async () => {
    loading.value = true
    await productsStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <h1>{{ t('products.title') }}</h1>
        <TableData
            :data="productsStore.getProduct"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
        />
    </section>
</template>
