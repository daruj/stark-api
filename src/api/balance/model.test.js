import { Balance } from '.'
import { User } from '../user'

let user, balance

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  balance = await Balance.create({ user, amount: 'test', type: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = balance.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(balance.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(balance.amount)
    expect(view.type).toBe(balance.type)
    expect(view.description).toBe(balance.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = balance.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(balance.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(balance.amount)
    expect(view.type).toBe(balance.type)
    expect(view.description).toBe(balance.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
