import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Expenses } from '.'

const app = () => express(routes)

let expenses

beforeEach(async () => {
  expenses = await Expenses.create({})
})

test('POST /expenses 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, description: 'test', amount: 'test', user_id: 'test', created_at: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.user_id).toEqual('test')
  expect(body.created_at).toEqual('test')
})

test('POST /expenses 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /expenses 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /expenses 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /expenses/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${expenses.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(expenses.id)
})

test('GET /expenses/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('GET /expenses/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /expenses/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${expenses.id}`)
    .send({ access_token: masterKey, description: 'test', amount: 'test', user_id: 'test', created_at: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(expenses.id)
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.user_id).toEqual('test')
  expect(body.created_at).toEqual('test')
})

test('PUT /expenses/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('PUT /expenses/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, description: 'test', amount: 'test', user_id: 'test', created_at: 'test' })
  expect(status).toBe(404)
})

test('DELETE /expenses/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${expenses.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /expenses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('DELETE /expenses/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
