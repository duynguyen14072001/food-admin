<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useProductStore } from '@/stores/product'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'

const productsStore = useProductStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const router = useRouter()

const onChange = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

watchEffect(async () => {
    loading.value = true
    await productsStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <a-spin tip="Loading..." :spinning="loading">
            <div class="title">
                <h1>{{ t('products.title') }}</h1>
                <a-button @click="router.push({ name: 'product-create' })">
                    {{ t('button.create') }}
                </a-button>
            </div>
            <div class="container p-4">
                <product-item
                    class="item"
                    v-for="(item, index) in productsStore.getProduct.data"
                    :key="index"
                    :item="item"
                    @click="router.push({ name: 'product-update', params: { id: item.id } })"
                />
            </div>
            <a-pagination
                v-if="productsStore.getProduct.data?.length"
                :total="productsStore.getProduct.total"
                :page-size="+productsStore.getProduct.perPage"
                :current="Number(productsStore.getProduct.page)"
                show-less-items
                @change="onChange"
                class="tbl-pagination"
            />
        </a-spin>
    </section>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;

    .item {
        cursor: pointer;
    }
}

.p-4 {
    padding: 20px;
}

.ant-pagination {
    padding-bottom: 20px;
}
</style>
