import mongoose, { Schema } from 'mongoose'

const expensesSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

expensesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      description: this.description,
      amount: this.amount,
      user_id: this.user_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Expenses', expensesSchema)

export const schema = model.schema
export default model
