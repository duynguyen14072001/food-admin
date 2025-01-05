import type { ColumnTable } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('order.list.column.status'),
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: t('order.list.column.user_name'),
        key: 'user_name',
        dataIndex: 'user_name',
    },
    {
        title: t('order.list.column.shipping_address'),
        key: 'shipping_address',
        dataIndex: 'shipping_address',
    },
]
