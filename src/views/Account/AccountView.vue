<script lang="ts" setup>
import { getAdmin, INITIAL_QUERY } from '@/helpers'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns, columnsNoEdit, ROLE_ADMIN } from './shared'
import { useAdminStore } from '@/stores'
import ModalAccount from './components/ModalAccount.vue'

const adminStore = useAdminStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const open = ref()
const id = ref()
const admin = JSON.parse(String(getAdmin()))

const handleChangePage = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

const handleCreate = () => {
    id.value = null
    open.value = true
}

const cellClick = (e: Record<string, any>, b: Record<string, any>) => {
    if (admin.role == ROLE_ADMIN) {
        if (!['ant-select-selector', 'ant-select-selection-item'].includes(e.target.className)) {
            id.value = b.id
            open.value = true
        }
    }
}

watchEffect(async () => {
    loading.value = true
    await adminStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('account.title') }}</h1>
            <a-button v-if="admin.role === ROLE_ADMIN" @click="handleCreate">{{
                t('account.btn_create')
            }}</a-button>
        </div>
        <div class="container">
            <table-data
                :data="adminStore.getAdmins"
                :columns="admin.role === ROLE_ADMIN ? columns : columnsNoEdit"
                :loading="loading"
                :hasCreate="false"
                :showSelection="false"
                @cellClick="cellClick"
                @change-page="handleChangePage"
            />
        </div>
    </section>
    <ModalAccount :open="open" :id="id" @close="open = false" />
</template>
