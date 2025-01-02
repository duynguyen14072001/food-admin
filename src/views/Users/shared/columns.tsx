import type { ColumnTable } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('users.list.column.name'),
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: t('users.list.column.mail_address'),
        key: 'mail_address',
        dataIndex: 'mail_address',
    },
    {
        title: t('users.list.column.phone_number'),
        key: 'phone_number',
        dataIndex: 'phone_number',
    },
]
