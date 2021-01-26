import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import RecipeSchema from '../models/Recipe'

class DbContext {
  Recipes = mongoose.model('Recipe', RecipeSchema)
  Account = mongoose.model('Account', AccountSchema)
}

export const dbContext = new DbContext()
