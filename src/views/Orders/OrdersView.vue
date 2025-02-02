<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useOrderStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'

const orderStore = useOrderStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)

const handleChangePage = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

watchEffect(async () => {
    loading.value = true
    await orderStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('order.title') }}</h1>
        </div>
        <table-data
            :data="orderStore.getOrders"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
            @change-page="handleChangePage"
        />
    </section>
</template>
