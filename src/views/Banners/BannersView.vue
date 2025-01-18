<script lang="ts" setup>
import { reactive } from 'vue'
import { FORM_BANNER } from './shared'
import { useI18n } from 'vue3-i18n'
import type { FormBannerState } from '@/interface/bannerInterface'

const { t } = useI18n()
const formState = reactive<{ banners: FormBannerState[] }>({
    banners: [{ ...FORM_BANNER }],
})

const handleImage = (img: any, index: number) => {
    formState.banners[index] = img.value[img.value.length - 1].response.result
}

const addBanner = () => formState.banners.push({ ...FORM_BANNER })
</script>

<template>
    <div class="main">
        <a-form ref="formRef" name="dynamic_form_nest_item">
            <draggable-vue tag="transition-group" :animation="200" :list="formState.banners">
                <div class="item" v-for="(banner, index) in formState.banners" :key="index">
                    <a-form-item :name="['banners', index]">
                        <image-single
                            type="banners"
                            :img-value="banner.image_url"
                            @change-img="(e: any) => handleImage(e, index)"
                        />
                    </a-form-item>
                </div>
            </draggable-vue>
        </a-form>
        <a-button @click="addBanner" class="btn-add">
            {{ t('banners.btn_create') }}
        </a-button>
    </div>
</template>

<style lang="scss" scoped>
.main {
    padding: 10px;
    max-width: 400px;
}
</style>
