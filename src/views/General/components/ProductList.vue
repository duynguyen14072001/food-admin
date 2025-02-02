<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import type { Product } from '@/interface'
import { useProductStore } from '@/stores'
import { useDebounceFn } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { FLAG_SHOW } from '../shared'

const { t } = useI18n()
const productStore = useProductStore()
const loading = ref()
const query = ref(INITIAL_QUERY)
const selectedItems = ref<Product[]>([])

const props = defineProps(['productIds'])
const emits = defineEmits(['submit'])

const handleSearch = useDebounceFn((e: any) => {
    query.value = {
        ...query.value,
        search: e.target.value,
    }
}, 1000)

const onChange = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

const handleClick = (data: Product) => {
    if (!selectedItems.value.includes(data)) {
        return selectedItems.value.push(data)
    }
    const indexItem = selectedItems.value.findIndex((item: Product) => item.id === data.id)
    if (indexItem > -1) {
        selectedItems.value.splice(indexItem, 1)
    }
}

watchEffect(async () => {
    loading.value = true
    query.value = {
        ...query.value,
        filters: [
            {
                key: 'not_ids',
                data: props.productIds,
            },
            {
                key: 'show_flag',
                data: FLAG_SHOW,
            },
        ],
    }
    await productStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <div class="header">
            <a-input-search
                @change="handleSearch"
                :placeholder="t('recommend.search.placeholder')"
            />
        </div>
        <div class="main">
            <product-item
                v-for="(item, index) in productStore.getProduct.data"
                :item="item"
                :key="index"
                :class="selectedItems.includes(item) && 'active'"
                @click="handleClick(item)"
            />
        </div>
        <div class="footer">
            <a-pagination
                :total="productStore.getProduct.total"
                :page-size="+productStore.getProduct.perPage"
                :current="Number(productStore.getProduct.page)"
                show-less-items
                @change="onChange"
                class="tbl-pagination"
            />
            <a-button :disabled="!selectedItems.length" @click="emits('submit', selectedItems)">
                {{ t('button.add') }}
            </a-button>
        </div>
    </a-spin>
</template>

<style lang="scss" scoped>
.header {
    margin-bottom: 20px;
    .ant-input-search {
        position: relative;
        width: 500px;
        border-bottom: 1px solid var(--vt-c-main);
        &:deep(input) {
            border-radius: 0;
            border: none;

            &:focus {
                box-shadow: none;
            }
        }

        &:deep(.ant-input-group-addon) {
            border-radius: 0;
            button {
                border: none;
                border-radius: 0;
                box-shadow: none;
                &:hover {
                    border-radius: 0;
                    background-color: var(--vt-c-white);
                    svg {
                        fill: var(--vt-c-main);
                    }
                }

                &:hover {
                    background-color: var(--vt-c-white);
                    box-shadow: none;
                }

                svg {
                    &:hover {
                        fill: var(--vt-c-main);
                    }
                }
            }
        }
    }
}

.main {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
}

.footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.active {
    border: 1px solid var(--vt-c-main);
    box-shadow: var(--vt-box-shadow-active);
}
</style>
