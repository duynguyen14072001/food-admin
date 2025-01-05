<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useUserStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'

const usersStore = useUserStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)

onMounted(async () => {
    loading.value = true
    await usersStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('users.title') }}</h1>
        </div>
        <table-data
            :data="usersStore.getUsers"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
        />
    </section>
</template>
