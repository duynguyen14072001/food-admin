import request from '@/api/config'

export const upload = async (payload: Record<string, any>, type: string) => {
    const url = `/uploads/multiple?type=${type}`
    return await request(url, {
        method: 'POST',
        data: payload,
    })
}
