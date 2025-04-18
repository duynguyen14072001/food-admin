import { MAX_STRING, validateInteger } from '@/helpers'
import i18n from '@/lang'
import type { Rule } from 'ant-design-vue/es/form'
import { MAX_CATEGORIES } from './constants'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.name')]),
        },
        {
            type: 'string',
            message: t('validation.string', {
                0: t('products.form.label.name'),
            }),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('products.form.label.name'),
                1: MAX_STRING,
            }),
        },
    ],
    category_id: [
        {
            validator: (_, value) => {
                if (value.length > MAX_CATEGORIES) {
                    return Promise.reject(
                        t('validation.max.tags', {
                            0: t('products.form.label.category'),
                            1: MAX_CATEGORIES,
                        })
                    )
                }
                return Promise.resolve()
            },
            trigger: 'change',
        },
    ],
    image_url: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.image')]),
        },
    ],
    image_urls: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.images')]),
        },
    ],
    slug: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.slug')]),
        },
        {
            type: 'string',
            message: t('validation.string', {
                0: t('products.form.label.slug'),
            }),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('products.form.label.slug'),
                1: MAX_STRING,
            }),
        },
    ],
    price: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.price')]),
        },
    ],
    show_flag: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.show_flag')]),
        },
    ],
    description: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.description')]),
        },
    ],
}
