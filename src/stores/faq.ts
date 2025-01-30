import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/faq'
import type { ParamsList, FaqResult } from '@/interface'
import { INITIAL_QUERY } from '@/helpers'

export const useFaqStore = defineStore('faq', () => {
    const faqs = ref({} as FaqResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (faqs.value = data.result)
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

    const getFaqs = computed(() => faqs.value)

    return {
        getFaqs,
        list,
        create,
    }
})
