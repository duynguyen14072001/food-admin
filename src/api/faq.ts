import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/faqs'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const create = (payload: Record<string, any>) => {
    const url = '/faqs'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export const remove = (id: number) => {
    const url = `/faqs/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'DELETE',
    })
}
