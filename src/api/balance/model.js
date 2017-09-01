import mongoose, { Schema } from 'mongoose'

const types = ['income', 'expense']

const balanceSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: types,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

balanceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      amount: this.amount,
      type: this.type,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Balance', balanceSchema)

export const schema = model.schema
export default model
