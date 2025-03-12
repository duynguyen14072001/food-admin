import type { ColumnTable } from '@/interface'
import i18n from '@/lang'
import UpdateRole from '../components/UpdateRole.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('account.list.column.mail_address'),
        key: 'mail_address',
        dataIndex: 'mail_address',
    },
    {
        title: t('account.list.column.role'),
        key: 'role',
        dataIndex: 'role',
        customRender: ({ record }: any) => <UpdateRole record={record} />,
    },
]

export const columnsNoEdit: ColumnTable[] = [
    {
        title: t('account.list.column.mail_address'),
        key: 'mail_address',
        dataIndex: 'mail_address',
    },
]
