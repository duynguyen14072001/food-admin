import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/user'
import { INITIAL_QUERY } from '@/helpers'
import type { Product, ProductResult, ParamsList } from '@/interface'

export const useUserStore = defineStore('user', () => {
    const users = ref({} as ProductResult)
    const userDetail = ref({} as Product)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (users.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const { result, status_code } = await API.detail(id)
            userDetail.value = result
            return { ...userDetail.value, status_code }
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: Record<string, any>) => {
        try {
            const result = await API.create(payload)
            await list({ ...INITIAL_QUERY })
            return result
        } catch (error: any) {
            return error
        }
    }

    const update = async (payload: Record<string, any>, id: number) => {
        try {
            const result = await API.update(payload, id)
            await list(query.value)
            return result
        } catch (error: any) {
            return error
        }
    }

    const remove = async (id: number) => {
        try {
            const result = await API.remove(id)
            await list({ ...INITIAL_QUERY })
            return result
        } catch (error: any) {
            return error
        }
    }

    const getUsers = computed(() => users.value)
    const getUserDetail = computed(() => userDetail.value)

    return {
        getUsers,
        getUserDetail,
        list,
        detail,
        update,
        create,
        remove,
    }
})
