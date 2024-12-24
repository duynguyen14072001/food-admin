<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'
import TableData from '@/components/common/TableData/TableData.vue'
import ModalCategory from './components/ModalCategory.vue'

const categoriesStore = useCategoryStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const open = ref()

onMounted(async () => {
    loading.value = true
    await categoriesStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('categories.title') }}</h1>
            <a-button @click="open = true">{{ t('button.create') }}</a-button>
        </div>
        <TableData
            :data="categoriesStore.getCategories"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
        />
    </section>

    <ModalCategory :open="open" @close="open = false" />
</template>

<style lang="scss" scoped></style>
