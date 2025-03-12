export const ROLE_ADMIN = 1
export const ROLE_EDIT = 2

export const FORM_ADMIN = {
    mail_address: '',
    role: ROLE_EDIT,
}

export const ROLE: Record<number, string> = {
    1: 'Admin',
    2: 'Editor',
}
