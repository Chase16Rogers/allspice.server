import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RecipesService {
  async find(query = {}) {
    const recipes = await dbContext.Recipes.find(query)
    return recipes
  }

  /**
   * @param {Object} query
   */
  async findOne(query) {
    const recipe = await dbContext.Recipes.findOne(query)
    if (!recipe) {
      throw new BadRequest('Invalid Query')
    }
    return recipe
  }

  async create(body) {
    const newRecipe = await dbContext.Recipes.create(body)
    return newRecipe
  }

  async addIngredient(body) {
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.recipeId }, { $push: { ingredients: body } }, { new: true, runValidators: true })
    return updated
  }

  async removeIngredient(body) {
    const updated = await dbContext.Recipes
      .findOneAndUpdate({ _id: body.recipeId },
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
    const updated = await dbContext.Recipes.findOneAndUpdate({ _id: body.id }, body, { new: true, runValidators: true })
    if (!updated) {
      throw new BadRequest('Invalid Id or Access')
    }
    return updated
  }

  async editIngredient(query, body) {
    const recipe = await dbContext.Recipes.findOne({ _id: query.recipeId })
    if (!recipe) {
      throw new BadRequest('Invalid Id or Access')
    }
    const ingredient = recipe.ingredients.id(query.ingredientId)
        if (!ingredient) {
      throw new BadRequest('Invalid Ingredient Id')
    }
    ingredient.name = body.name || ingredient.name
    ingredient.quantity = body.quantity || ingredient.quantity
    recipe.save()
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
