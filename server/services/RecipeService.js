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

  async addIngredient(body) {
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.recipeId, creatorId: body.creatorId }, { $push: { ingredients: body } }, { new: true, runValidators: true })
    return updated
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
  }

  async update(body) {
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true, runValidators: true })
    if (!updated) {
      throw new BadRequest('Invalid Id or Access')
    }
    return updated
  }

  async editIngredient(query, body) {
    const recipe = await dbContext.Recipes.findOne({ _id: query.recipeId, creatorId: query.creatorId }).populate('creator', 'name picture email')
    if (!recipe) {
      throw new BadRequest('Invalid Recipe Id or Access')
    }
    const ingredient = recipe.ingredients.id(query.ingredientId)
    if (!ingredient) {
      throw new BadRequest('Invalid Ingredient Id')
    }
    ingredient.name = body.name || ingredient.name
    ingredient.quantity = body.quantity || ingredient.quantity
    await recipe.save()
    return recipe
  }

  async delete(query) {
    const deleted = await dbContext.Recipes.findOneAndRemove(query)
    if (!deleted) {
      throw new BadRequest('Invalid Id or Access')
    }
  }
}

export const recipeService = new RecipesService()
