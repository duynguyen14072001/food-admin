export const MAX_CATEGORIES = 4
export const FLAG_SHOW = 1

export const FORM_PRODUCT = {
    name: '',
    category_id: [],
    description: '',
    image_url: '',
    image_urls: [],
    show_flag: 0,
    slug: '',
    price: null,
}

export const OPTIONS_SHOW_FLAG: Record<number, string> = {
    0: 'Ẩn',
    1: 'Hiện',
}
