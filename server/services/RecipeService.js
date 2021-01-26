import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RecipesService {
  async find(query = {}) {
    const recipes = await dbContext.Recipes.find(query).populate('creator', 'name picture email')
    return recipes
  }

  /**
   * @param {Object} query
   */
  async findOne(query) {
    const recipe = await dbContext.Recipes.findOne(query).populate('creator', 'name picture email')
    if (!recipe) {
      throw new BadRequest('Invalid Query')
    }
    return recipe
  }

  async create(body) {
    const newRecipe = await dbContext.Recipes.create(body)
    return await this.findOne({ _id: newRecipe.id })
  }

  async update(body) {
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true, runValidators: true })
    if (!updated) {
      throw new BadRequest('Invalid Id or Access')
    }
    return updated
  }

  async delete(query) {
    const deleted = await dbContext.Recipes.findOneAndRemove(query)
    if (!deleted) {
      throw new BadRequest('Invalid Id or Access')
    }
  }
}

export const recipeService = new RecipesService()
