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

// Recipe.pre('findOneAndDelete', function(next) {
//   try {
//     commentsService.deleteMany({ recipeId: this._conditions._id })
//   } catch (e) {
//     next(e)
//   }
// })

export default Recipe
