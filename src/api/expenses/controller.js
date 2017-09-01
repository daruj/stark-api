import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Expenses } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Expenses.create({ ...body, user })
    .then((expenses) => expenses.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Expenses.find(query, select, cursor)
    .populate('user')
    .then((expenses) => expenses.map((expenses) => expenses.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Expenses.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((expenses) => expenses ? expenses.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Expenses.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((expenses) => expenses ? _.merge(expenses, body).save() : null)
    .then((expenses) => expenses ? expenses.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Expenses.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((expenses) => expenses ? expenses.remove() : null)
    .then(success(res, 204))
    .catch(next)
