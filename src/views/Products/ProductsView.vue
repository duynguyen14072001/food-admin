<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'
import { useRouter } from 'vue-router'

const productsStore = useProductStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const router = useRouter()

const cellClick = (e: Record<string, any>, b: Record<string, any>) => {
    router.push({ name: 'product-update', params: { id: b.id } })
}

onMounted(async () => {
    loading.value = true
    await productsStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('products.title') }}</h1>
            <a-button @click="router.push({ name: 'product-create' })">
                {{ t('button.create') }}
            </a-button>
        </div>
        <table-data
            :data="productsStore.getProduct"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
            @cellClick="cellClick"
        />
    </section>
</template>
