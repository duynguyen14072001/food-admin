<script lang="ts" setup>
import type { FormAdminState } from '@/interface'
import { reactive, ref, watch, type UnwrapRef } from 'vue'
import { FORM_ADMIN, ROLE, ROLE_EDIT, rules } from '../shared'
import { useI18n } from 'vue3-i18n'
import { getObjOptions, notify, STATUS_CODE_SUCCESS, trim } from '@/helpers'
import { useAdminStore } from '@/stores'
import { DeleteOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const adminStore = useAdminStore()
const props = defineProps(['open', 'id'])
const emit = defineEmits(['close'])
const loading = ref(false)
const formState: UnwrapRef<FormAdminState> = reactive({
    ...FORM_ADMIN,
})
const openDelete = ref()
const formRef = ref()

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const getData = async (id: number) => {
    await adminStore.detail(id)
    if (!adminStore.getAdmin) {
        reset()
        return
    }
    formState.mail_address = adminStore.getAdmin.mail_address
    formState.role = adminStore.getAdmin.role
}

const handleSubmit = async () => {
    loading.value = true
    await formRef.value
        .validate()
        .then(async () => {
            const { status_code, message } = !props.id
                ? await adminStore.create(formState)
                : await adminStore.updateRole({ role: formState.role }, props.id)
            if (status_code !== STATUS_CODE_SUCCESS) {
                if (message === 'Email exits') {
                    return notify(t('email_exists'), '', 'error')
                }
                return notify(t(`${!props.id ? 'create' : 'update'}_failed`), '', 'error')
            }
            emit('close')
            notify(t(`${!props.id ? 'create' : 'update'}_success`), '', 'success')
            formRef.value.resetFields()
        })
        .catch((error: any) => {
            console.log('error', error)
        })
    loading.value = false
}

const onDelete = async () => {
    const { status_code } = await adminStore.remove(props.id)
    openDelete.value = false
    emit('close')
    status_code === STATUS_CODE_SUCCESS
        ? notify(t('delete_success'), '', 'success')
        : notify(t('delete_failed'), '', 'error')
}

const reset = () => {
    formState.mail_address = ''
    formState.role = ROLE_EDIT
}

watch(
    () => props.open,
    async () => {
        if (props.open) {
            !props.id && reset()
            props.id && (await getData(props.id))
        }
    }
)
</script>

<template>
    <modal-vue
        :open="props.open"
        :wrapClassName="'modal-account'"
        :centered="true"
        :width="433"
        :hasFooter="false"
        :closable="true"
        @cancel="$emit('close')"
    >
        <template #body>
            <a-spin tip="Loading..." :spinning="loading">
                <a-form
                    ref="formRef"
                    :model="formState"
                    :rules="rules"
                    :colon="false"
                    @finish="handleSubmit"
                    @finishFailed="onFinishFailed"
                >
                    <a-form-item name="name" :label="t('account.modal.mail_address')">
                        <a-input
                            :disabled="props.id"
                            v-model:value="formState.mail_address"
                            @blur="trim('mail_address', formState)"
                        />
                    </a-form-item>
                    <a-form-item name="role" :label="t('account.modal.role')">
                        <a-select
                            v-model:value="formState.role"
                            :options="getObjOptions(ROLE, false)"
                        />
                    </a-form-item>
                    <div class="btn-group">
                        <div class="button-direction">
                            <a-button html-type="submit" key="submit" type="primary">
                                {{ t('button.submit') }}
                            </a-button>
                            <a-button key="back" @click="$emit('close')">
                                {{ t('button.cancel') }}
                            </a-button>
                        </div>
                        <a-button class="sbm" v-if="props.id" @click="openDelete = true">
                            <DeleteOutlined />
                        </a-button>
                    </div>
                </a-form>
            </a-spin>
        </template>
    </modal-vue>

    <modal-delete :open="openDelete" @close="openDelete = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped></style>
