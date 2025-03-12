import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = ''
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const detail = (id: number) => {
    const url = `/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'GET',
    })
}

export const create = (payload: Record<string, any>) => {
    const url = ''
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export const updateRole = (payload: Record<string, any>, id: number) => {
    const url = `/update-role/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const remove = (id: number) => {
    const url = `/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'DELETE',
    })
}
