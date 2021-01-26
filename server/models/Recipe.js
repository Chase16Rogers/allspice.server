import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Ingredient = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
})

const Recipe = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    steps: [{ type: String }],
    ingredients: [Ingredient],
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Recipe.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Recipe
