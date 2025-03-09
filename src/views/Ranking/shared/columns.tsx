import type { ColumnTable } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('ranking.list.column.product_name'),
        key: 'product_name',
        dataIndex: 'product_name',
    },
    {
        title: t('ranking.list.column.shipping_address'),
        key: 'shipping_address',
        dataIndex: 'shipping_address',
    },
]
