import type { ColumnTable } from '@/interface'
import i18n from '@/lang'
import ButtonStatus from '../components/ButtonStatus.vue'
import ButtonPaymentStatus from '../components/ButtonPaymentStatus.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
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
    {
        title: t('order.list.column.item_count'),
        key: 'item_count',
        dataIndex: 'item_count',
    },
    {
        title: t('order.list.column.total_price'),
        key: 'total_price',
        dataIndex: 'total_price',
        customRender: ({ record }: any) => (
            <div>
                {record.total_price}
                {t('unit_price')}
            </div>
        ),
    },
    {
        title: t('order.list.column.payment_status'),
        key: 'payment_status',
        customRender: ({ record }: any) => <ButtonPaymentStatus record={record} />,
    },
    {
        title: t('order.list.column.status'),
        key: 'status',
        customRender: ({ record }: any) => <ButtonStatus record={record} />,
    },
    {
        title: t('order.list.column.payment_method'),
        key: 'payment_method',
        customRender: ({ record }: any) => (
            <span>{t(`order.list.column.payment_method_value_${record.payment_method}`)}</span>
        ),
    },
]
