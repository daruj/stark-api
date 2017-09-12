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
  },
  location: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    address: {
      type: String
    }
  }
}, {
  timestamps: true
})

balanceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      amount: this.amount,
      type: this.type,
      description: this.description,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

balanceSchema.pre('validate', (req, res, next) => {
  console.log('this gets printed first', res)
  // req.body.location = JSON.parse(req.body.location)
  next()
})

const model = mongoose.model('Balance', balanceSchema)

export const schema = model.schema
export default model
