import { Incomes } from '.'
import { User } from '../user'

let user, incomes

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  incomes = await Incomes.create({ user, description: 'test', amount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = incomes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(incomes.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(incomes.description)
    expect(view.amount).toBe(incomes.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = incomes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(incomes.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(incomes.description)
    expect(view.amount).toBe(incomes.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
