<script lang="ts" setup>
import { filterOption, getOptions, PAYLOAD_ALL } from '@/helpers'
import type { FormStateProduct } from '@/interface'
import { useCategoryStore } from '@/stores/category'
import { onMounted, reactive, ref, type UnwrapRef } from 'vue'
import { useI18n } from 'vue3-i18n'
import { FORM_PRODUCT, rules } from '../shared'
import * as Imgs from '@/assets/imgs'

const { t } = useI18n()
const openDelete = ref()
const categoryStore = useCategoryStore()
const formState: UnwrapRef<FormStateProduct> = reactive({
    ...FORM_PRODUCT,
})

const onDelete = () => {}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = () => {}

onMounted(async () => await categoryStore.list(PAYLOAD_ALL))
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
            <image-single type="product" :img-value="formState.image_url" class="w-100" />
        </a-form-item>
        <a-form-item name="price" :label="t('products.form.label.price')">
            <a-input v-model:value="formState.price" />
        </a-form-item>
        <a-form-item name="description" :label="t('products.form.label.description')">
            <a-input v-model:value="formState.description" />
        </a-form-item>

        <div class="btn-group">
            <a-button class="sbm" @click="openDelete = true">
                <img :src="Imgs.IconTrash" alt="" />
            </a-button>
            <a-button html-type="submit" key="submit" type="primary">{{
                t('button.create')
            }}</a-button>
        </div>
    </a-form>
    <modal-delete :open="openDelete" @close="openDelete = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.form-product {
    padding: 0 12px;
}
</style>
