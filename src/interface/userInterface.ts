import type { PaginateParams, ResponseResult } from './commonInterface'

export interface User {
    id: number
    name: string
    email: string
    created_at?: string
    updated_at?: string
}

export interface UserDetail {
    id: number
    name: string
    mail_address: string
    created_at: string
}

export interface UserSearchDto {
    search: string
}

export interface UserCreateDto {
    name: string
    mail_address: string
}

export interface ResponseUserList extends ResponseResult {
    data?: User
}
