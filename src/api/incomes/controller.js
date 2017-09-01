import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Incomes } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Incomes.create({ ...body, user })
    .then((incomes) => incomes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Incomes.find(query, select, cursor)
    .populate('user')
    .then((incomes) => incomes.map((incomes) => incomes.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Incomes.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((incomes) => incomes ? incomes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Incomes.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((incomes) => incomes ? _.merge(incomes, body).save() : null)
    .then((incomes) => incomes ? incomes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Incomes.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((incomes) => incomes ? incomes.remove() : null)
    .then(success(res, 204))
    .catch(next)
