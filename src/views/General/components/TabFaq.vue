<script lang="ts" setup>
import { notifyStatus, PAYLOAD_ALL, STATUS_CODE_SUCCESS } from '@/helpers'
import type { Faq, FormFaqState } from '@/interface'
import { useFaqStore } from '@/stores'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const faqStore = useFaqStore()
const formState = reactive<{ faqs: FormFaqState[] }>({
    faqs: [],
})
const formRef = ref()
const loading = ref(false)
const loadingData = ref(false)
const id = ref()
const open = ref()

const onFinish = async () => {
    loading.value = true
    await formRef.value
        .validate()
        .then(async () => {
            formState.faqs.forEach((item, index) => {
                item.number = index + 1
            })
            const { status_code } = await faqStore.create(formState)
            const message =
                status_code === STATUS_CODE_SUCCESS ? t(`update_success`, ['']) : t('error')
            notifyStatus(status_code, message)
        })
        .catch((error: any) => {
            console.error('error', error)
        })
    loading.value = false
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const openDelete = (index: number) => {
    id.value = index
    open.value = true
}

const onDelete = () => {
    formState.faqs.splice(id.value, 1)
    open.value = false
}

onMounted(async () => {
    loadingData.value = true
    await faqStore.list({ PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] })
    faqStore.getFaqs.data?.length &&
        (formState.faqs = faqStore.getFaqs.data?.map((item: Faq) => item))
    loadingData.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loadingData">
        <a-form
            :model="formState"
            ref="formRef"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 13 }"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-button html-type="submit" key="submit" type="primary" :loading="loading">
                {{ t('button.save') }}
            </a-button>
            <draggable-vue tag="transition-group" :animation="200" :list="formState.faqs">
                <div class="item" v-for="(item, index) in formState.faqs" :key="index">
                    <div class="form">
                        <a-form-item :label="t('faq.form.input_label.question')">
                            <a-input v-model:value="item.question"></a-input>
                        </a-form-item>
                        <a-form-item :label="t('faq.form.input_label.answer')">
                            <a-input v-model:value="item.answer"></a-input>
                        </a-form-item>
                    </div>

                    <DeleteOutlined
                        style="color: #26b7bc; font-size: 20px"
                        @click="openDelete(index)"
                    />
                </div>
            </draggable-vue>
        </a-form>
    </a-spin>
    <modal-delete :open="open" @close="open = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.item {
    border: 1px dashed var(--vt-c-gray-8);
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px 10px;
    display: flex;

    .form {
        width: 90%;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        &:deep(.ant-form-item) {
            margin-bottom: 0;
        }
    }
}
</style>
