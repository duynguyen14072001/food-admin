import type { Result } from './commonInterface'

export interface Order {
    id: number
    status: string
    user_name: string
    shipping_address: string
    order_date: number
    created_at: string
}

export interface OrderResult extends Result {
    data?: Order[]
}
