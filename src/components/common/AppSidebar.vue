<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, VueElement, onMounted, watchEffect, h } from 'vue'
import { SIDE_MENU_ADMIN } from '@/helpers'
import { useAuthStore } from '@/stores'
import * as Icon from '@/components/icons'
import { SettingOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([])
const items: ItemType[] = reactive([])
const sidebar = ref()
const { t } = useI18n()

const getIcon: any = {
    1: Icon.IconProduct,
    2: Icon.IconGeneral,
    3: Icon.IconCategory,
    4: Icon.IconOrder,
    5: Icon.IconUser,
    6: Icon.IconRanking,
    7: Icon.IconAccount,
}

const handleRoute = async () => {
    for (const key in sidebar.value) {
        const item = sidebar.value[key]
        items.push(getItem(item.label, String(item.order), () => h(getIcon[+item.order])))
        if (route.name === item.name) selectedKeys.value.push(String(item.order))
    }
}

const getItem = (
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group'
): ItemType => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType
}

const handleClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(sidebar.value).find((item: any) => String(item.order) === e.key)
    if (side) router.push(side.route)
    if (side.route === route.fullPath) {
        selectedKeys.value.splice(0, 1, String(side?.order))
    }
}

const getSidebar = async () => {
    sidebar.value = SIDE_MENU_ADMIN
}

const logout = async () => {
    const data = await authStore.logout()
    if (data) router.push({ name: 'login', replace: true })
}

onMounted(async () => {
    await router.isReady()
    await getSidebar()
    await handleRoute()
})

watchEffect(() => {
    if (sidebar.value) {
        for (const key in sidebar.value) {
            const item = sidebar.value[key]
            const getFirstNameRoute = String(route.name).replace(/(create|update|-|list|\/)/g, '')
            if (getFirstNameRoute === item.name || route.name === item.name) {
                selectedKeys.value = [String(item.order)]
            }
        }
    }
})
</script>

<template>
    <div class="sidebar-container">
        <a-menu
            id="sidebar"
            mode="inline"
            :items="items"
            :selectedKeys="selectedKeys"
            @click="handleClick"
        />
        <div class="setting-item">
            <a-dropdown placement="topLeft">
                <div class="text">
                    <SettingOutlined />
                    <span>{{ t('sidebar.setting') }}</span>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <router-link to="/change-password">
                                {{ t('sidebar.change_password') }}
                            </router-link>
                        </a-menu-item>
                        <a-menu-item>
                            <div class="text-logout" @click="logout">{{ t('sidebar.logout') }}</div>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--vt-c-white);
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);

    .ant-menu {
        border-inline-end: 0;
    }

    .setting-item {
        height: 40px;
        padding-left: 24px;

        .text {
            .anticon {
                padding-right: 10px;
            }
        }
    }
}

.text-logout {
    cursor: pointer;
}
</style>
