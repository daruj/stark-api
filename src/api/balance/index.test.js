import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Balance } from '.'

const app = () => express(routes)

let userSession, anotherSession, balance

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  balance = await Balance.create({ user })
})

test('POST /balance 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, amount: 'test', type: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.amount).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /balance 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /balance 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /balance 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /balance/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${balance.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(balance.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /balance/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${balance.id}`)
  expect(status).toBe(401)
})

test('GET /balance/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /balance/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${balance.id}`)
    .send({ access_token: userSession, amount: 'test', type: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(balance.id)
  expect(body.amount).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /balance/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${balance.id}`)
    .send({ access_token: anotherSession, amount: 'test', type: 'test', description: 'test' })
  expect(status).toBe(401)
})

test('PUT /balance/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${balance.id}`)
  expect(status).toBe(401)
})

test('PUT /balance/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, amount: 'test', type: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /balance/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${balance.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /balance/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${balance.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /balance/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${balance.id}`)
  expect(status).toBe(401)
})

test('DELETE /balance/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
