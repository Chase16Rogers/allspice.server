import mongoose from 'mongoose'
import RecipeSchema from '../models/Recipe'

class DbContext {
  Recipes = mongoose.model('Recipe', RecipeSchema)
}

export const dbContext = new DbContext()
