import { MAX_STRING } from '@/helpers'
import i18n from '@/lang'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    image_url: [
        {
            required: true,
            message: t('validation.required', [t('banners.create.image_url')]),
        },
    ],
}

export const rulesFaq: Record<string, Rule[]> = {
    question: [
        {
            required: true,
            message: t('validation.required', [t('faq.form.input_label.question')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [t('faq.form.input_label.question'), MAX_STRING]),
        },
    ],
    answer: [
        {
            required: true,
            message: t('validation.required', [t('faq.form.input_label.answer')]),
        },
    ],
}
