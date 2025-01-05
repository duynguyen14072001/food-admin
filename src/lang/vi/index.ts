import auth from './auth'
import base from './base'
import sidebar from './sidebar'
import validation from './validation'
import products from './products'
import categories from './categories'
import users from './users'
import order from './order'

export const vi = {
    ...base,
    auth,
    validation,
    sidebar,
    products,
    categories,
    users,
    order,
}
