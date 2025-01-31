<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import type { Banner, FormBannerState } from '@/interface/bannerInterface'
import { useBannerStore } from '@/stores'
import { notifyStatus, PAYLOAD_ALL, STATUS_CODE_SUCCESS } from '@/helpers'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { FORM_BANNER, rules } from '../shared'

const { t } = useI18n()
const loading = ref()
const loadingData = ref()
const formRef = ref()
const bannerStore = useBannerStore()
const open = ref()
const id = ref()
const formState = reactive<{ banners: FormBannerState[] }>({
    banners: [],
})

const handleImage = (img: any, index: number) => {
    formState.banners[index].image_url = img.value[img.value.length - 1].response.result
}

const addBanner = () => formState.banners.push({ ...FORM_BANNER })

const onDelete = () => {
    formState.banners.splice(id.value, 1)
    open.value = false
}

const onFinish = async () => {
    loading.value = true
    await formRef.value
        .validate()
        .then(async () => {
            formState.banners.forEach((item, index) => {
                item.number = index + 1
            })
            const { status_code } = await bannerStore.create(formState)
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

onMounted(async () => {
    loadingData.value = true
    await bannerStore.list({ ...PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] })
    bannerStore.getBanners.data?.length &&
        (formState.banners = bannerStore.getBanners.data?.map((item: Banner) => item))
    loadingData.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loadingData">
        <div class="main">
            <a-form
                ref="formRef"
                name="dynamic_form_nest_item"
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <draggable-vue tag="transition-group" :animation="200" :list="formState.banners">
                    <div class="item" v-for="(banner, index) in formState.banners" :key="index">
                        <a-form-item
                            :name="['banners', index, 'image_url']"
                            :rules="rules.image_url"
                        >
                            <image-single
                                type="banners"
                                :img-value="banner.image_url"
                                @change-img="(e: any) => handleImage(e, index)"
                            />
                            <DeleteOutlined
                                style="color: #26b7bc; font-size: 20px"
                                @click="openDelete(index)"
                            />
                        </a-form-item>
                    </div>
                </draggable-vue>
                <a-button html-type="submit" key="submit" type="primary" :loading="loading">
                    {{ t('banners.btn_save') }}
                </a-button>
            </a-form>
            <a-button @click="addBanner" class="btn-add">
                {{ t('banners.btn_create') }}
            </a-button>
        </div>
    </a-spin>
    <modal-delete :open="open" @close="open = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.main {
    padding: 10px;
    position: relative;

    .ant-form {
        margin-top: 40px;
        max-width: 400px;

        .ant-form-item {
            &:deep(img) {
                height: 200px;
            }

            &:deep(.ant-form-item-control-input-content) {
                display: flex;
                align-items: center;
                gap: 20px;

                .anticon {
                    height: fit-content;
                    cursor: pointer;
                }
            }
        }
        .ant-btn-primary {
            top: 10px;
            right: 10px;
            position: absolute;
        }
    }
}
</style>
