import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Ingredient = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
  // creatorId: { type: String, ref: 'Account', required: true }
})

const Recipe = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    steps: [{ type: String }],
    ingredients: [Ingredient],
    creatorName: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Recipe
