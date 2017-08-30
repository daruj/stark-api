import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
// import { isFloat } from '../../helpers/number'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Expenses, { schema } from './model'

const router = new Router()
const { description, amount, user_id } = schema.tree

/**
 * @api {post} /expenses Create expenses
 * @apiName CreateExpenses
 * @apiGroup Expenses
 * @apiPermission user
 * @apiParam {String} access_token master access token.
 * @apiParam description Expenses's description.
 * @apiParam amount Expenses's amount.
 * @apiParam user_id Expenses's user_id.
 * @apiSuccess {Object} expenses Expenses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expenses not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true }),
  body({ description, amount, user_id }),
  create)

/**
 * @api {get} /expenses Retrieve expenses
 * @apiName RetrieveExpenses
 * @apiGroup Expenses
 * @apiPermission user
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} expenses List of expenses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /expenses/:id Retrieve expenses
 * @apiName RetrieveExpenses
 * @apiGroup Expenses
 * @apiPermission user
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} expenses Expenses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expenses not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /expenses/:id Update expenses
 * @apiName UpdateExpenses
 * @apiGroup Expenses
 * @apiPermission user
 * @apiParam {String} access_token master access token.
 * @apiParam description Expenses's description.
 * @apiParam amount Expenses's amount.
 * @apiParam user_id Expenses's user_id.
 * @apiSuccess {Object} expenses Expenses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expenses not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ description, amount, user_id }),
  update)

/**
 * @api {delete} /expenses/:id Delete expenses
 * @apiName DeleteExpenses
 * @apiGroup Expenses
 * @apiPermission user
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Expenses not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
