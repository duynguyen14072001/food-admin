<script lang="ts" setup>
import { formatDate, INITIAL_QUERY } from '@/helpers'
import { useOrderStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'

const orderStore = useOrderStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const selectedDate = ref()

const handleChangePage = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

const handleChangeDate = () => {
    loading.value = true
    if (selectedDate.value) {
        query.value = {
            ...query.value,
            filters: [
                {
                    key: 'date_range',
                    data: [formatDate(selectedDate.value[0]), formatDate(selectedDate.value[1])],
                },
            ],
        }
    } else {
        query.value = {
            ...query.value,
            filters: Array.isArray(query.value.filters)
                ? query.value.filters.filter((filter) => filter.key !== 'date_range')
                : [],
        }
    }
    loading.value = false
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
            <a-range-picker v-model:value="selectedDate" @change="handleChangeDate" />
        </div>
        <div class="container">
            <table-data
                :data="orderStore.getOrders"
                :columns="columns"
                :loading="loading"
                :hasCreate="false"
                :showSelection="false"
                @change-page="handleChangePage"
            />
        </div>
    </section>
</template>
