<script lang="ts" setup>
import { getObjOptions, notifyStatus, STATUS_CODE_SUCCESS } from '@/helpers'
import { useOrderStore } from '@/stores'
import { CaretDownFilled } from '@ant-design/icons-vue'
import { h, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { STATUS_PAYMENT } from '../shared'

const props = defineProps(['record'])
const { record } = props
const orderStore = useOrderStore()
const loading = ref(false)
const { t } = useI18n()

const handleChange = async (value: any) => {
    loading.value = true
    const data = await orderStore.updateStatusPayment({ payment_status: +value }, record.id)
    if (data.status_code === STATUS_CODE_SUCCESS) {
        notifyStatus(data.status_code, t('update_success', ['']))
    }
    loading.value = true
}
</script>

<template>
    <a-select
        v-model:value="record.payment_status"
        :options="getObjOptions(STATUS_PAYMENT, false)"
        :suffixIcon="h(CaretDownFilled, { style: { color: 'var(--vt-c-gray-2)' } })"
        @change="handleChange"
    >
        <template #option="{ value, label }">
            <span class="fz-12" :aria-label="value">{{ label }}</span>
        </template>
    </a-select>
</template>

<style lang="scss" scoped>
.ant-select {
    box-shadow: var(--vt-box-shadow);
    border-radius: 6px;
    padding: 0 2px;

    &:deep(.ant-select-selector) {
        border: none;
        border-radius: 6px;

        .ant-select-selection-item {
            color: var(--vt-c-gray-v9);
        }
    }
}
</style>
