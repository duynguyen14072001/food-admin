<script lang="ts" setup>
import { getObjOptions, notifyStatus, STATUS_CODE_SUCCESS } from '@/helpers'
import { ROLE } from '../shared'
import { h } from 'vue'
import { CaretDownFilled } from '@ant-design/icons-vue'
import { useAdminStore } from '@/stores'
import { useI18n } from 'vue3-i18n'
const props = defineProps(['record'])
const adminStore = useAdminStore()
const { t } = useI18n()

const handleChange = async (value: number) => {
    const data = await adminStore.updateRole({ role: value }, props.record.id)
    if (data.status_code === STATUS_CODE_SUCCESS) {
        notifyStatus(data.status_code, t('update_success', ['']))
    }
}
</script>

<template>
    <a-select
        :value="record.role"
        :options="getObjOptions(ROLE, false)"
        @change="handleChange"
        :suffixIcon="h(CaretDownFilled, { style: { color: 'var(--vt-c-gray-2)' } })"
    >
        <template #option="{ value, label }">
            <span class="fz-12" :aria-label="value">{{ label }}</span>
        </template>
    </a-select>
</template>

<style lang="scss" scoped></style>
