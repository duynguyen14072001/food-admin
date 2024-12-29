<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FormBasic from './components/FormBasic.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { STATUS_CODE_SUCCESS } from '@/helpers'
const { params } = useRoute()
const router = useRouter()
const productStore = useProductStore()
const data = ref()

onMounted(async () => {
    const product = await productStore.detail(+params.id)
    const { status_code } = product
    if (status_code === STATUS_CODE_SUCCESS) {
        return (data.value = product)
    }
    router.push({ name: 'page-not-found' })
})
</script>

<template>
    <section class="content-layout">
        <div class="title">Update</div>
        <FormBasic v-if="data" :data="data" />
    </section>
</template>
