<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import * as Imgs from '@/assets/imgs'

const { t } = useI18n()
const props = defineProps(['open', 'loading'])
</script>

<template>
    <modal-vue
        :open="props.open"
        :wrapClassName="'modal-delete-chapter'"
        :centered="true"
        :width="433"
        :hasFooter="false"
        :closable="false"
        @cancel="$emit('close')"
    >
        <template #body>
            <h4 class="title">{{ t('chapter.modal.title') }}</h4>
            <div class="content">{{ t('chapter.modal.content') }}</div>
            <a-space>
                <a-button type="link" @click="$emit('close')">
                    <img :src="Imgs.IconArrowRight2" alt="" /> {{ t('cancel') }}
                </a-button>
                <a-button class="sbm" :loading="props.loading" @click="$emit('onDelete')">
                    <img :src="Imgs.IconTrash" alt="" /> {{ t('chapter.modal.btn_delete') }}
                </a-button>
            </a-space>
        </template>
    </modal-vue>
</template>

<style scoped lang="scss"></style>
