<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS, trim } from '@/helpers'
import type { FormStateCategory } from '@/interface'
import { reactive, ref, type UnwrapRef } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useCategoryStore } from '@/stores/category'
import { FORM_CATEGORY, ruleCategory } from '../shared'

const { t } = useI18n()
const props = defineProps(['open', 'loading', 'id'])
const emit = defineEmits(['close'])
const formRef = ref()

const formState: UnwrapRef<FormStateCategory> = reactive({
    ...FORM_CATEGORY,
})
const categoriesStore = useCategoryStore()

const handleSubmit = async () => {
    await formRef.value
        .validate()
        .then(async () => {
            const { status_code } = await categoriesStore.create(formState)
            if (status_code !== STATUS_CODE_SUCCESS) {
                return notify(t('create_failed'), '', 'error')
            }
            emit('close')
            notify(t('create_success'), '', 'success')
            formRef.value.resetFields()
        })
        .catch((error: any) => {
            console.log('error', error)
        })
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)
</script>

<template>
    <modal-vue
        :open="props.open"
        :wrapClassName="'modal-delete-chapter'"
        :centered="true"
        :width="433"
        :hasFooter="false"
        :closable="true"
        @cancel="$emit('close')"
    >
        <template #body>
            <a-form
                ref="formRef"
                :model="formState"
                :rules="ruleCategory"
                :colon="false"
                @finish="handleSubmit"
                @finishFailed="onFinishFailed"
            >
                <a-form-item name="name" :label="t('categories.modal.name')">
                    <a-input v-model:value="formState.name" @blur="trim('name', formState)" />
                </a-form-item>
                <div class="button-direction">
                    <a-button html-type="submit" key="submit" type="primary">
                        {{ t('button.submit') }}
                    </a-button>
                    <a-button key="back" @click="$emit('close')">
                        {{ t('button.cancel') }}
                    </a-button>
                </div>
            </a-form>
        </template>
    </modal-vue>
</template>
