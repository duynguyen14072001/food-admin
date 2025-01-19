<script lang="ts" setup>
import { filterOption, getOptions, notify, PAYLOAD_ALL, STATUS_CODE_SUCCESS } from '@/helpers'
import type { FormStateProduct } from '@/interface'
import { useCategoryStore } from '@/stores/category'
import { onMounted, reactive, ref, type UnwrapRef } from 'vue'
import { useI18n } from 'vue3-i18n'
import { FORM_PRODUCT, rules } from '../shared'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const openDelete = ref()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const props = defineProps(['data'])
const { params } = useRoute()
const formState: UnwrapRef<FormStateProduct> = reactive({
    ...FORM_PRODUCT,
})

const onDelete = () => {}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = async () => {
    const { status_code } = params.id
        ? await productStore.update(formState, +params.id)
        : await productStore.create(formState)
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(t(`${params.id ? 'update' : 'create'}_success`), '', 'success')
        return router.push({ name: 'products-list' })
    }
    return notify(t(`${params.id ? 'update' : 'create'}_failed`), '', 'error')
}

const handleImg = (e: any) => (formState.image_url = e.value.at(-1).response.result)

const getProduct = () => {
    if (props.data) {
        formState.id = props.data.id
        formState.name = props.data.name
        formState.image_url = props.data.image_url
        formState.price = props.data.price
        formState.description = props.data.description
        formState.category_id = props.data.category_id
    }
}

onMounted(
    async () => await Promise.all([categoryStore.list(PAYLOAD_ALL), params.id && getProduct()])
)
</script>

<template>
    <a-form
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 14 }"
        :model="formState"
        :colon="false"
        :rules="rules"
        class="form-product"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item name="name" :label="t('products.form.label.name')">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item name="category_id" :label="t('products.form.label.category')">
            <a-select
                v-model:value="formState.category_id"
                :options="getOptions(categoryStore.getCategories.data)"
                :filterOption="filterOption"
                class="w-600 select-keyword"
                mode="multiple"
            />
        </a-form-item>
        <a-form-item name="image_url" :label="t('products.form.label.image')">
            <image-single
                type="products"
                :img-value="formState.image_url"
                class="w-100"
                @change-img="handleImg"
            />
        </a-form-item>
        <a-form-item name="price" :label="t('products.form.label.price')">
            <a-input-number v-model:value="formState.price" />
        </a-form-item>
        <a-form-item name="description" :label="t('products.form.label.description')">
            <a-textarea v-model:value="formState.description" />
        </a-form-item>
        <div class="btn-group">
            <a-button v-if="params.id" class="sbm" @click="openDelete = true">
                <DeleteOutlined />
            </a-button>
            <a-button html-type="submit" key="submit" type="primary">
                {{ t(`button.${params.id ? 'update' : 'create'}`) }}
            </a-button>
        </div>
    </a-form>
    <modal-delete :open="openDelete" @close="openDelete = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.form-product {
    padding: 0 12px;
}
</style>
