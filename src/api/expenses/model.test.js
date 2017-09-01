import { Expenses } from '.'
import { User } from '../user'

let user, expenses

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  expenses = await Expenses.create({ user, description: 'test', amount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = expenses.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expenses.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(expenses.description)
    expect(view.amount).toBe(expenses.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = expenses.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expenses.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(expenses.description)
    expect(view.amount).toBe(expenses.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
