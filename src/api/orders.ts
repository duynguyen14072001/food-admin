import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/orders'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const updateStatus = (payload: Record<string, any>, id: number) => {
    const url = `/orders/status/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const updateStatusPayment = (payload: Record<string, any>, id: number) => {
    const url = `/orders/status-payment/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const detail = (id: number) => {
    const url = `/orders/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'GET',
    })
}
