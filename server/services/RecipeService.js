import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RecipesService {
  async deleteMany(query) {
    await dbContext.Recipes.deleteMany(query)
  }

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

  async addIngredient(body) {
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.recipeId, creatorId: body.creatorId }, { $push: { ingredients: body } }, { new: true, runValidators: true })
    return updated

    // const recipe = await this.findOne({ _id: body.recipeId, creatorId: body.creatorId })
    // recipe.ingredients.push(body)
    // await recipe.save()
    // return recipe
  }

  async removeIngredient(body) {
    const updated = await dbContext.Recipes
      .findOneAndUpdate({ _id: body.recipeId, creatorId: body.creatorId },
        {
          $pull: {
            ingredients: {
              _id: body.ingredientId
            }
          }
        },
        { new: true, runValidators: true })
    return updated

    // const recipe = await this.findOne({ _id: body.recipeId, creatorId: body.creatorId })
    // recipe.ingredients.push(body)
    // await recipe.save()
    // return recipe
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
