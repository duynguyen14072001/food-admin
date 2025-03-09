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
        title: t('ranking.list.column.review_count'),
        key: 'review_count',
        dataIndex: 'review_count',
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'descend',
    },
    {
        title: t('ranking.list.column.avg_rating'),
        key: 'avg_rating',
        dataIndex: 'avg_rating',
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'descend',
    },
    {
        title: t('ranking.list.column.order_count'),
        key: 'order_count',
        dataIndex: 'order_count',
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'descend',
    },
]
