import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Account = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String }
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

// Account.pre('findOneAndDelete', function(next) {
//   try {
//     Promise.all([
//       recipeService.deleteMany({ boardId: this._conditions._id }),
//       commentsService.deleteMany({ boardId: this._conditions._id })
//     ])
//   } catch (e) {
//     next(e)
//   }
// })

export default Account
