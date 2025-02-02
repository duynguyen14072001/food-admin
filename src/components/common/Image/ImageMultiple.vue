<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message, type UploadChangeParam } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import * as API from '@/api/upload'
import { STATUS_CODE_SUCCESS } from '@/helpers'

const props = defineProps(['type', 'listImage'])
const emits = defineEmits(['changeImg'])
const loading = ref()
const fileArray = ref([] as any)
const { t } = useI18n()

const beforeUpload = async (file: any, fileList: any) => {
    loading.value = true
    if (file.uid === fileList[fileList.length - 1].uid) {
        const isValidate = fileList.some((item: any) => {
            const allowedTypes = ['image/png', 'image/jpeg'] // Allowed MIME types
            const invalidFiles = allowedTypes.includes(item.type)
            if (!invalidFiles) {
                message.error(t('file.required_jpg_or_png'))
                loading.value = false
                return false
            }
            const isLt50M = file.size / 1024 / 1024 < 50
            if (!isLt50M) {
                message.error(t('file.image_max_size'))
                loading.value = false
                return false
            }
            return invalidFiles && isLt50M
        })

        if (isValidate) {
            const formData = new FormData()
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]
                formData.append('files', file.originFileObj || file)
            }
            const { result, status_code } = (await API.upload(formData, props.type)) as any
            status_code === STATUS_CODE_SUCCESS
                ? (fileArray.value = [...fileArray.value, ...result.map((item: any) => item)]) &&
                  emits('changeImg', fileArray.value)
                : message.error(t('failed'))
        }
    }
    return (loading.value = false)
}

watch(
    () => props.listImage,
    () => (fileArray.value = [...props.listImage])
)
</script>

<template>
    <div class="clearfix">
        <a-upload-dragger
            name="file"
            :multiple="true"
            :custom-request="() => {}"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            class="uploader"
        >
            <div class="list-image">
                <img v-for="(item, index) in fileArray" :src="item" :key="index" alt="" />
                <div class="box-add">
                    <loading-outlined v-if="loading" />
                    <plus-outlined v-else />
                    <div class="ant-upload-text">{{ t('upload_or_drag') }}</div>
                </div>
            </div>
        </a-upload-dragger>
    </div>
</template>

<style lang="scss" scoped>
.uploader {
    &:deep(.ant-upload) {
        width: fit-content;
        padding: 2px;
        display: flex;
        gap: 10px;
    }
}

.list-image {
    display: flex;
    gap: 10px;
    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }

    .box-add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
        border-radius: 2px;
        border: 1px dashed var(--vt-c-gray-v6);
    }
}
</style>
