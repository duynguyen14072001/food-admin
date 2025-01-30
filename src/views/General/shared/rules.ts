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
