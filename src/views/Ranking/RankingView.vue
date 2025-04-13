<script lang="ts" setup>
import { formatDate, INITIAL_QUERY, PAGE_FIRST } from '@/helpers'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'
import { useProductStore } from '@/stores'
import type { SortProps } from '@/interface'

const productStore = useProductStore()
const { t } = useI18n()
const sortType = ref('descending')
const query = ref({
    ...INITIAL_QUERY,
    orders: [
        {
            key: 'review_count',
            dir: 'desc',
        },
    ],
})
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

const sort = async ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    const orderDir = dir?.replace('end', '') || 'desc'

    query.value = {
        ...query.value,
        page: PAGE_FIRST,
        orders: [{ key, dir: orderDir }],
    }
}

watchEffect(async () => {
    loading.value = true
    await productStore.listRanking(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('ranking.title') }}</h1>
            <a-range-picker
                v-model:value="selectedDate"
                @change="handleChangeDate"
                :placeholder="[t('ranking.list.start_date'), t('ranking.list.end_date')]"
            />
        </div>
        <div class="container">
            <table-data
                :data="productStore.getProduct"
                :columns="columns"
                :loading="loading"
                :hasCreate="false"
                :showSelection="false"
                :sort-type="sortType"
                @sort="sort"
                @change-page="handleChangePage"
            />
        </div>
    </section>
</template>
