import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Expenses } from '.'

const app = () => express(routes)

let userSession, anotherSession, expenses

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  expenses = await Expenses.create({ user })
})

test('POST /expenses 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, description: 'test', amount: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /expenses 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /expenses 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /expenses 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /expenses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${expenses.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(expenses.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /expenses/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('GET /expenses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /expenses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${expenses.id}`)
    .send({ access_token: userSession, description: 'test', amount: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(expenses.id)
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /expenses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${expenses.id}`)
    .send({ access_token: anotherSession, description: 'test', amount: 'test' })
  expect(status).toBe(401)
})

test('PUT /expenses/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('PUT /expenses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, description: 'test', amount: 'test' })
  expect(status).toBe(404)
})

test('DELETE /expenses/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${expenses.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /expenses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${expenses.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /expenses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${expenses.id}`)
  expect(status).toBe(401)
})

test('DELETE /expenses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
