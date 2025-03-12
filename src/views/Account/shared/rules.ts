import i18n from '@/lang'
import { MAX_STRING, validateEmail } from '@/helpers'
const { t } = i18n

export const rules = {
    mail_address: [
        {
            required: true,
            message: t('validation.required', [t('mail_address')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [t('mail_address'), MAX_STRING]),
        },
        {
            validator: async (_: any, value: any) => {
                if (value && value.length <= MAX_STRING) {
                    return validateEmail(_, value, 'mail_address')
                }
            },
        },
    ],
}
