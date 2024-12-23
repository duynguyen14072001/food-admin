<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers';
import { useCategoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue3-i18n';
import { columns } from './shared';

const categoriesStore = useCategoryStore()
const {t} =useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)

onMounted(async()=>{
    loading.value = true
    await categoriesStore.list(query.value)
    loading.value =false
})
</script>

<template>
    <section>
        <h1>{{ t('categories.title') }}</h1>
        <TableData 
        :data="categoriesStore.getCategories" 
        :columns="columns" 
        :loading="loading"
        :hasCreate="false"
        :showSelection="false"
        />
    </section>
</template>
