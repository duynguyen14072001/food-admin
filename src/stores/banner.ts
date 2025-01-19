import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/banner'
import type { ParamsList, BannerResult } from '@/interface'
import { INITIAL_QUERY } from '@/helpers'

export const useBannerStore = defineStore('banner', () => {
    const banners = ref({} as BannerResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (banners.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: Record<string, any>) => {
        try {
            const result = await API.create(payload)
            await list({ ...INITIAL_QUERY, orders: [{ key: 'number', dir: 'asc' }], all: 1 })
            return result
        } catch (error: any) {
            return error
        }
    }

    const getBanners = computed(() => banners.value)

    return {
        getBanners,
        list,
        create,
    }
})
