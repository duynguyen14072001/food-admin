<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'
import FormBasic from './components/FormBasic.vue'

const { t } = useI18n()
</script>

<template>
    <section class="content-layout">
        <div class="title">{{ t('products.create.title') }}</div>
        <FormBasic />
    </section>
</template>
