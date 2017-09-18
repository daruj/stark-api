import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Balance, { schema } from './model'

const router = new Router()
const { amount, type, description, location } = schema.tree

/**
 * @api {post} /balance Create balance
 * @apiName CreateBalance
 * @apiGroup Balance
 * @apiPermission user
 * @apiParam {Number} amount Balance's amount.
 * @apiParam {String="income","expense"} type Balance's type.
 * @apiParam {String} description Balance's description.
 * @apiParam {Object} location location with { lat, lgn }.
 * @apiHeader {String} Authorization authorization value.
 * @apiSuccess {Object} balance Balance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Balance not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ amount, type, description, location }),
  create)

/**
 * @api {get} /balance Retrieve balances
 * @apiName RetrieveBalances
 * @apiGroup Balance
 * @apiPermission user
 * @apiHeader {String} Authorization authorization value.
 * @apiUse listParams
 * @apiSuccess {Object[]} balances List of balances.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query({
    q: {
      type: String,
      paths: ['type']
    }
  }),
  index)

/**
 * @api {get} /balance/:id Retrieve balance
 * @apiName RetrieveBalance
 * @apiGroup Balance
 * @apiPermission user
 * @apiHeader {String} Authorization authorization value.
 * @apiSuccess {Object} balance Balance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Balance not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /balance/:id Update balance
 * @apiName UpdateBalance
 * @apiGroup Balance
 * @apiPermission user
 * @apiParam {Number} amount Balance's amount.
 * @apiParam {String="income","expense"} type Balance's type.
 * @apiParam {String} description Balance's description.
 * @apiParam {Object} location location with { lat, lgn, address }.
 * @apiHeader {String} Authorization authorization value.
 * @apiSuccess {Object} balance Balance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Balance not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ amount, type, description, location }),
  update)

/**
 * @api {delete} /balance/:id Delete balance
 * @apiName DeleteBalance
 * @apiGroup Balance
 * @apiPermission user
 * @apiHeader {String} Authorization authorization value.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Balance not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
