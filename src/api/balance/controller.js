import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Balance } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Balance.create({ ...body, location: JSON.parse(body.location), user })
    .then((balance) => balance.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Balance.find({ ...query, user: user._id }, select, cursor)
    .populate('user')
    .then((balances) => balances.map((balance) => balance.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Balance.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((balance) => balance ? balance.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Balance.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((balance) => balance ? _.merge(balance, body).save() : null)
    .then((balance) => balance ? balance.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Balance.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((balance) => balance ? balance.remove() : null)
    .then(success(res, 204))
    .catch(next)
