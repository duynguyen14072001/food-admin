<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import * as API from '@/api/upload'
import { STATUS_CODE_SUCCESS } from '@/helpers'

const props = defineProps(['type', 'listImage'])
const emits = defineEmits(['changeImg', 'removeImage'])
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

const onDeleteImage = (index: number) => {
    fileArray.value.splice(index, 1)
    emits('removeImage', index)
}

watch(
    () => props.listImage,
    () => (fileArray.value = [...props.listImage])
)
</script>

<template>
    <div class="clearfix" :class="!fileArray.length && 'no-data'">
        <div class="list-image">
            <div v-for="(item, index) in fileArray" class="image__item" :key="index">
                <img :src="item" alt="" />
                <CloseCircleOutlined class="icon-close" @click="onDeleteImage(index)" />
            </div>
        </div>
        <a-upload-dragger
            name="file"
            :multiple="true"
            :custom-request="() => {}"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            class="uploader"
        >
            <div class="box-add">
                <loading-outlined v-if="loading" />
                <plus-outlined v-else />
                <div class="ant-upload-text">{{ t('upload_or_drag') }}</div>
            </div>
        </a-upload-dragger>
    </div>
</template>

<style lang="scss" scoped>
.clearfix {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.no-data {
    gap: 0;
}
.uploader {
    &:deep(.ant-upload) {
        width: fit-content;
        padding: 2px;
        display: flex;
        gap: 20px;
    }
}

.list-image {
    display: flex;
    gap: 20px;

    .image__item {
        border: 1px dashed var(--vt-c-gray-v6);
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        position: relative;
        width: 150px;
        height: 150px;
        padding: 6px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .icon-close {
            position: absolute;
            top: 0;
            right: -10px;
            z-index: 100;
        }
    }
}

.box-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
}

.ant-upload-wrapper {
    width: 150px;
    height: 150px;
}
</style>
