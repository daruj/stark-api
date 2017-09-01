import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Incomes } from '.'

const app = () => express(routes)

let userSession, anotherSession, incomes

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  incomes = await Incomes.create({ user })
})

test('POST /incomes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, description: 'test', amount: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /incomes 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /incomes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /incomes 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /incomes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${incomes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(incomes.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /incomes/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${incomes.id}`)
  expect(status).toBe(401)
})

test('GET /incomes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /incomes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${incomes.id}`)
    .send({ access_token: userSession, description: 'test', amount: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(incomes.id)
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /incomes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${incomes.id}`)
    .send({ access_token: anotherSession, description: 'test', amount: 'test' })
  expect(status).toBe(401)
})

test('PUT /incomes/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${incomes.id}`)
  expect(status).toBe(401)
})

test('PUT /incomes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, description: 'test', amount: 'test' })
  expect(status).toBe(404)
})

test('DELETE /incomes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${incomes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /incomes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${incomes.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /incomes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${incomes.id}`)
  expect(status).toBe(401)
})

test('DELETE /incomes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
