import { Expenses } from '.'

let expenses

beforeEach(async () => {
  expenses = await Expenses.create({ description: 'test', amount: 'test', user_id: 'test', created_at: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = expenses.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expenses.id)
    expect(view.description).toBe(expenses.description)
    expect(view.amount).toBe(expenses.amount)
    expect(view.user_id).toBe(expenses.user_id)
    expect(view.created_at).toBe(expenses.created_at)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = expenses.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expenses.id)
    expect(view.description).toBe(expenses.description)
    expect(view.amount).toBe(expenses.amount)
    expect(view.user_id).toBe(expenses.user_id)
    expect(view.created_at).toBe(expenses.created_at)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
