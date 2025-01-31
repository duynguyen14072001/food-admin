import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/recommend'
import type { ParamsList, RecommendResult } from '@/interface'
import { INITIAL_QUERY } from '@/helpers'

export const useRecommendStore = defineStore('recommend', () => {
    const recommends = ref({} as RecommendResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (recommends.value = data.result)
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

    const getRecommends = computed(() => recommends.value)

    return {
        getRecommends,
        list,
        create,
    }
})
