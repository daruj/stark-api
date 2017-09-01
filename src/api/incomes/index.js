import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Incomes, { schema } from './model'

const router = new Router()
const { description, amount } = schema.tree

/**
 * @api {post} /incomes Create incomes
 * @apiName CreateIncomes
 * @apiGroup Incomes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam description Incomes's description.
 * @apiParam amount Incomes's amount.
 * @apiSuccess {Object} incomes Incomes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Incomes not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ description, amount }),
  create)

/**
 * @api {get} /incomes Retrieve incomes
 * @apiName RetrieveIncomes
 * @apiGroup Incomes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} incomes List of incomes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /incomes/:id Retrieve incomes
 * @apiName RetrieveIncomes
 * @apiGroup Incomes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} incomes Incomes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Incomes not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /incomes/:id Update incomes
 * @apiName UpdateIncomes
 * @apiGroup Incomes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam description Incomes's description.
 * @apiParam amount Incomes's amount.
 * @apiSuccess {Object} incomes Incomes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Incomes not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ description, amount }),
  update)

/**
 * @api {delete} /incomes/:id Delete incomes
 * @apiName DeleteIncomes
 * @apiGroup Incomes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Incomes not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
