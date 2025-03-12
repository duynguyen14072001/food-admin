<script lang="ts" setup>
import { notifyStatus, PAYLOAD_ALL, STATUS_CODE_SUCCESS } from '@/helpers'
import { useRecommendStore } from '@/stores'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive, ref, watch } from 'vue'
import ProductList from './ProductList.vue'
import type { Product, Recommend } from '@/interface'
import { useI18n } from 'vue3-i18n'

const loading = ref()
const open = ref()
const { t } = useI18n()
const recommendStore = useRecommendStore()
const loadingButton = ref()
const openDelete = ref()
const index = ref()
const formState = reactive<{ recommends: any[] }>({
    recommends: [],
})
const listIds = ref()

const handleCreate = (data: Product[]) => {
    open.value = false
    const recommend = data.map((item) => ({ product: { ...item } }))
    formState.recommends = formState.recommends.concat(recommend)
}

const onSubmitDelete = () => {
    formState.recommends.splice(index.value, 1)
    openDelete.value = false
}

const onDelete = (i: number) => {
    index.value = i
    openDelete.value = true
}

const onSubmit = async () => {
    loadingButton.value = true
    try {
        const data = formState.recommends.map((item, index) => ({
            id: item.id,
            product_id: item.product.id,
            number: index + 1,
        }))
        const { status_code } = await recommendStore.create({ recommends: data })
        const message = status_code === STATUS_CODE_SUCCESS ? t(`update_success`, ['']) : t('error')
        notifyStatus(status_code, message)
    } catch (error) {
        console.error('error', error)
    } finally {
        loadingButton.value = false
    }
}

onMounted(async () => {
    loading.value = true
    await recommendStore.list({ ...PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] })
    recommendStore.getRecommends.data?.length &&
        (formState.recommends = recommendStore.getRecommends.data?.map((item: Recommend) => item))
    loading.value = false
})

watch(
    () => formState.recommends,
    () => (listIds.value = formState.recommends.map((item: Recommend) => item.product.id))
)
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <div class="container">
            <a-button
                html-type="submit"
                key="submit"
                type="primary"
                :loading="loadingButton"
                @click="onSubmit"
            >
                {{ t('button.save') }}
            </a-button>
            <div class="main">
                <draggable-vue
                    tag="transition-group"
                    :animation="200"
                    :list="formState.recommends"
                    :filter="'.box-add'"
                >
                    <product-item
                        v-for="(item, index) in formState.recommends"
                        :item="item.product"
                        :key="index"
                        :has-delete="true"
                        @on-delete="onDelete(index)"
                    />
                    <div class="box-add" @click="open = true">
                        <PlusOutlined style="font-size: 30px; color: #ffffff" />
                    </div>
                </draggable-vue>
            </div>
        </div>
    </a-spin>

    <modal-vue
        :open="open"
        :wrapClassName="'modal-list-product'"
        :centered="true"
        :width="1056"
        :closable="true"
        :hasFooter="false"
        buttonDirection="btn-group-list"
        @cancel="open = false"
    >
        <template #body>
            <ProductList :product-ids="listIds" @submit="handleCreate" />
        </template>
    </modal-vue>
    <modal-delete :open="openDelete" @close="openDelete = false" @on-delete="onSubmitDelete" />
</template>

<style lang="scss" scoped>
.main {
    display: flex;
    gap: 20px;
    transition-group {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .box-add {
        width: 180px;
        cursor: pointer;
        min-height: 254px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--vt-c-main);
    }
}

.container {
    &:deep(.ant-btn-primary) {
        margin: 0 0 20px auto;
    }
}
</style>
